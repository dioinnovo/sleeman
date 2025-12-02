import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { sqlTools } from "./sql-tools";

/**
 * Sleeman Breweries Database Schema Context
 * Comprehensive guide for the SQL agent to understand the brewery database structure
 */
const DATABASE_SCHEMA_CONTEXT = `
You are a SQL expert for Sleeman Breweries, a Canadian craft brewery. You have access to a PostgreSQL database with the following tables:

PRODUCTION TABLES:
1. beer_styles - Beer style definitions (id, name, category, target_abv, target_ibu, fermentation_days, description)
2. production_lines - Production line info (id, name, facility, capacity_hl, line_type, status)
3. production_batches - Production batch records (id, batch_number, style_id, line_id, start_date, end_date, target_volume_hl, actual_volume_hl, status, efficiency_pct, notes)
4. quality_tests - Quality test results (id, batch_id, test_type, test_date, expected_value, actual_value, passed, notes)
5. quality_issues - Quality issue tracking with COST DATA (id, batch_id, issue_type, severity, detected_date, resolved_date, resolution, cost_impact, labor_hours_lost, material_waste_cost)
   *** quality_issues.cost_impact contains monetized cost per quality incident ***

INVENTORY TABLES:
6. suppliers - Supplier information (id, name, material_type, lead_time_days, reliability_score, contact_info)
7. raw_materials - Raw material inventory (id, name, material_type, unit, current_stock, reorder_level, unit_cost, supplier_id)
8. material_usage - Material consumption records (id, batch_id, material_id, quantity_used, usage_date)

EQUIPMENT TABLES:
9. equipment - Equipment registry with FINANCIAL DATA (id, name, line_id, equipment_type, capacity, installation_date, last_maintenance, status, purchase_cost, purchase_date, useful_life_years, salvage_value, annual_depreciation, accumulated_depreciation, net_book_value, maintenance_budget_annual)
   *** equipment has full asset financials: purchase_cost, depreciation, net_book_value ***
10. equipment_downtime - Downtime events (id, equipment_id, start_time, end_time, reason, cost_impact, maintenance_type)

DISTRIBUTION TABLES:
11. distributors - Distributor information (id, name, region, distributor_type, commission_rate, contact_info)
12. shipments - Shipment records with REVENUE DATA (id, batch_id, distributor_id, order_date, ship_date, delivery_date, volume_hectoliters, unit_price, total_revenue, status, tracking_number, notes)
    *** IMPORTANT: shipments.total_revenue contains actual revenue per shipment! ***
    *** To get revenue by beer style: JOIN shipments → production_batches → beer_styles ***
13. products - Product SKUs (id, style_id, package_type, package_size, price_per_unit)
14. monthly_revenue - Revenue by product/month (id, product_id, year, month, units_sold, revenue, cost_of_goods)

COMPLIANCE TABLES:
15. compliance_audits - Audit records (id, audit_date, audit_type, auditor, score, findings, corrective_actions)

FINANCIAL/COO TABLES (3 years of data: 2022-2024):
16. operating_expenses - Facility operating costs with BUDGET vs ACTUALS (id, facility, expense_category, expense_type, month, year, budgeted_amount, actual_amount, variance, notes)
    *** Categories: Utilities, Rent, Insurance, Maintenance, Logistics, Administrative ***
    *** variance is auto-calculated as (actual_amount - budgeted_amount) ***
    *** Facilities: 'Guelph Brewery', 'Vernon Brewery' ***
17. labor_costs - Labor costs by facility/department (id, facility, department, month, year, headcount, regular_wages, overtime_wages, benefits_cost, training_cost, total_labor_cost, hours_worked)
    *** Departments: Production, Quality Control, Maintenance, Warehouse, Administration ***
    *** total_labor_cost = regular_wages + overtime_wages + benefits_cost + training_cost ***
18. distributor_costs - Channel costs per distributor (id, distributor_id, month, year, logistics_cost, warehousing_cost, marketing_support, bad_debt_provision, total_channel_cost)
    *** Links to distributors table via distributor_id ***
    *** Use to calculate distributor profitability: shipments.total_revenue - distributor_costs.total_channel_cost ***

KEY RELATIONSHIPS:
- production_batches.beer_style_id → beer_styles.id
- production_batches.production_line_id → production_lines.id
- quality_tests.batch_id → production_batches.id
- quality_issues.batch_id → production_batches.id
- raw_materials.supplier_id → suppliers.id
- material_usage.batch_id → production_batches.id
- material_usage.material_id → raw_materials.id
- equipment.line_id → production_lines.id
- equipment_downtime.equipment_id → equipment.id
- shipments.batch_id → production_batches.id (JOIN through batches to get beer style)
- shipments.distributor_id → distributors.id
- products.style_id → beer_styles.id
- monthly_revenue.product_id → products.id
- distributor_costs.distributor_id → distributors.id (for distributor profitability analysis)
- operating_expenses and labor_costs use facility VARCHAR matching production_lines.facility

REVENUE QUERY PATTERNS:
*** For revenue by beer style, use this join pattern: ***
  shipments s
  JOIN production_batches pb ON s.batch_id = pb.id
  JOIN beer_styles bs ON pb.beer_style_id = bs.id

Example: Total revenue for 'Sleeman Original Draught':
  SELECT SUM(s.total_revenue) as total_revenue
  FROM shipments s
  JOIN production_batches pb ON s.batch_id = pb.id
  JOIN beer_styles bs ON pb.beer_style_id = bs.id
  WHERE bs.name = 'Sleeman Original Draught'

BEER STYLES IN DATABASE:
- Sleeman Clear 2.0 (Light Lager)
- Sleeman Original Draught (Lager)
- Sleeman Honey Brown (Amber Ale)
- Sleeman Cream Ale (Cream Ale)
- Sleeman Silver Creek (Lager)
- Okanagan Spring Pale Ale (Pale Ale)
- Wild Rose WRaspberry (Fruit Beer)
- Sapporo Premium (Lager)

FACILITIES:
- Guelph Brewery (Ontario): 3 production lines - use 'Guelph Brewery' for financial tables
- Vernon Brewery (BC): 2 production lines - use 'Vernon Brewery' for financial tables

COO FINANCIAL QUERY PATTERNS:

1. Labor costs by department:
   SELECT department, SUM(total_labor_cost) as total_labor
   FROM labor_costs
   WHERE year = 2024
   GROUP BY department
   ORDER BY total_labor DESC

2. Operating expenses budget variance:
   SELECT expense_category,
          SUM(budgeted_amount) as budgeted,
          SUM(actual_amount) as actual,
          SUM(variance) as variance,
          ROUND(SUM(variance) / NULLIF(SUM(budgeted_amount), 0) * 100, 1) as variance_pct
   FROM operating_expenses
   WHERE year = 2024
   GROUP BY expense_category
   ORDER BY variance DESC

3. Quality issue cost impact:
   SELECT issue_type, COUNT(*) as incidents, SUM(cost_impact) as total_cost
   FROM quality_issues
   WHERE cost_impact IS NOT NULL
   GROUP BY issue_type
   ORDER BY total_cost DESC

4. Equipment depreciation:
   SELECT equipment_type, COUNT(*) as count,
          SUM(purchase_cost) as total_value,
          SUM(annual_depreciation) as annual_depreciation,
          SUM(net_book_value) as book_value
   FROM equipment
   GROUP BY equipment_type
   ORDER BY total_value DESC

5. Distributor profitability (advanced):
   SELECT d.name as distributor,
          SUM(s.total_revenue) as revenue,
          SUM(dc.total_channel_cost) as costs,
          SUM(s.total_revenue) - SUM(dc.total_channel_cost) as profit
   FROM distributors d
   JOIN shipments s ON d.id = s.distributor_id
   JOIN distributor_costs dc ON d.id = dc.distributor_id
   GROUP BY d.id, d.name
   ORDER BY profit DESC

IMPORTANT WORKFLOW - FOLLOW THESE STEPS IN ORDER:
1. ALWAYS start by calling sql_db_list_tables to see available tables
2. THEN call sql_db_schema for the relevant tables you'll query
3. Generate a SQL query based on the schema information
4. ALWAYS call sql_db_query_checker to validate your query before executing
5. Execute the query with sql_db_query
6. If query fails, analyze the error, fix it, and try again (max 2 retries)
7. Return ONLY the query results in JSON format - do NOT provide business analysis or insights

QUERY BEST PRACTICES:
- Use proper JOIN conditions when combining tables
- Always use LIMIT to prevent large result sets (default 100 will be added if missing)
- For date calculations: Use (date1 - date2) for days between dates
- For percentages: Multiply by 100.0 for proper decimal calculation
- Group by actual column names, not aliases
- Use descriptive column aliases for clarity
- Use CAST or :: for type conversions
- For date filtering: Use DATE() function or proper timestamp comparison
- For recent data: Use NOW() - INTERVAL 'X months' for relative date queries

COLUMN NAMING CONVENTIONS:
- Use snake_case for all identifiers
- Common columns: *_id (primary keys), *_at (timestamps), *_date (dates)
- Status columns: 'completed', 'in_progress', 'failed', 'active', 'inactive'

REMEMBER: You are the SQL specialist. Your job is to:
1. Understand the question
2. Find the right tables using sql_db_list_tables
3. Get schema details using sql_db_schema
4. Generate accurate SQL using best practices
5. Validate with sql_db_query_checker
6. Execute with sql_db_query
7. Return clean data in JSON format

Another AI will analyze the results and provide business insights. You ONLY generate and execute SQL.
`;

/**
 * Initialize Azure OpenAI chat model for SQL generation
 * Uses GPT-4 with low temperature for precise SQL
 */
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const azureVersion = process.env.AZURE_OPENAI_VERSION;

if (!azureApiKey || !azureEndpoint) {
  console.warn("⚠️  Azure OpenAI credentials not found. SQL Agent will not function.");
}

const llm = new ChatOpenAI({
  model: azureDeployment || "gpt-4o-mini",
  temperature: 0.1, // Low temperature for precise SQL generation
  configuration: {
    baseURL: `${azureEndpoint}/openai/deployments/${azureDeployment}`,
    defaultHeaders: {
      "api-key": azureApiKey,
    },
    defaultQuery: {
      "api-version": azureVersion || "2024-12-01-preview",
    },
  },
});

/**
 * Create the SQL agent with ReAct pattern
 * The agent will reason about which tools to use and in what order
 */
export const sqlAgent = createReactAgent({
  llm,
  tools: sqlTools,
  messageModifier: new SystemMessage(DATABASE_SCHEMA_CONTEXT),
});

/**
 * Run the SQL agent with a user question
 * @param question User's natural language question about Sleeman Breweries data
 * @returns Object containing SQL query, results, error (if any), and execution trace
 */
export async function runSqlAgent(question: string): Promise<{
  sqlQuery: string | null;
  queryResults: { columns: string[]; rows: any[][] } | null;
  error: string | null;
  agentTrace: any[];
}> {
  const agentTrace: any[] = [];
  let sqlQuery: string | null = null;
  let queryResults: { columns: string[]; rows: any[][] } | null = null;
  let error: string | null = null;

  try {
    console.log('\n🤖 Starting SQL Agent for question:', question);

    const stream = await sqlAgent.stream(
      {
        messages: [new HumanMessage(question)],
      },
      {
        streamMode: "values", // Get full state after each step
        configurable: { thread_id: `sql_agent_${Date.now()}` },
      }
    );

    // Collect all messages and tool calls from the agent
    for await (const chunk of stream) {
      agentTrace.push(chunk);

      // Extract from the messages array in the chunk
      if (chunk.messages && Array.isArray(chunk.messages)) {
        const lastMessage = chunk.messages[chunk.messages.length - 1];

        // Check if this is an AI message with tool calls
        if (lastMessage._getType && lastMessage._getType() === 'ai' && 'tool_calls' in lastMessage) {
          const aiMsg = lastMessage as AIMessage;
          if (aiMsg.tool_calls && aiMsg.tool_calls.length > 0) {
            for (const toolCall of aiMsg.tool_calls) {
              // Extract SQL query when sql_db_query is called
              if (toolCall.name === 'sql_db_query') {
                sqlQuery = (toolCall.args as any).query || null;
                console.log('📝 SQL Query extracted:', sqlQuery);
              }
            }
          }
        }

        // Check for tool response with query results
        if (lastMessage._getType && lastMessage._getType() === 'tool') {
          const content = lastMessage.content as string;

          // Parse results if query was executed successfully
          if (content.includes('Query executed successfully')) {
            console.log('✅ Query executed successfully, parsing results...');
            try {
              // Extract JSON results from the content
              const jsonMatch = content.match(/Results:\n([\s\S]+)/);
              if (jsonMatch) {
                const results = JSON.parse(jsonMatch[1]);

                if (Array.isArray(results) && results.length > 0) {
                  const columns = Object.keys(results[0]);
                  const rows = results.map((row: any) =>
                    columns.map(col => row[col])
                  );
                  queryResults = { columns, rows };
                  console.log(`✅ Parsed ${rows.length} rows with ${columns.length} columns`);
                } else if (Array.isArray(results) && results.length === 0) {
                  // Empty results array
                  queryResults = { columns: [], rows: [] };
                  console.log('⚠️  Query returned no results');
                }
              }
            } catch (parseError) {
              console.error('❌ Error parsing query results:', parseError);
              error = "Failed to parse query results. The query may have returned invalid data.";
            }
          }

          // Check for SQL errors
          if (content.startsWith('SQL Error:')) {
            error = content;
            console.log('❌ SQL Error detected:', error.substring(0, 100));
          }
        }
      }
    }

    console.log('\n📊 Agent execution complete:');
    console.log('- SQL Query:', sqlQuery ? 'Found' : 'Not found');
    console.log('- Results:', queryResults ? `${queryResults.rows.length} rows` : 'Not found');
    console.log('- Error:', error || 'None');

    // If we didn't get results but have a query, it might have failed
    if (sqlQuery && !queryResults && !error) {
      error = "Query was generated but execution did not return results. Check database connection and query validity.";
    }

  } catch (agentError: any) {
    error = `Agent error: ${agentError.message}`;
    console.error('❌ SQL Agent error:', agentError);
  }

  return {
    sqlQuery,
    queryResults,
    error,
    agentTrace,
  };
}

/**
 * Initialize the SQL agent and database connection
 * Call this on server startup to verify connectivity
 */
export async function initializeSqlAgent() {
  try {
    const { getLangChainDataSource, initializeSchemaCache } = await import('./langchain-config');
    await getLangChainDataSource();
    console.log('✅ SQL Agent database connected');

    // Initialize schema cache to speed up all queries
    const cacheInitialized = await initializeSchemaCache();
    if (cacheInitialized) {
      console.log('✅ SQL Agent schema cache ready');
    } else {
      console.warn('⚠️  SQL Agent running without schema cache (slower performance)');
    }

    console.log('✅ SQL Agent fully initialized');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to initialize SQL Agent:', error.message);
    console.error('💡 Make sure DATABASE_URL is set in .env.local');
    return false;
  }
}
