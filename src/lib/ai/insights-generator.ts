import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getCachedSchema, getCachedTableNames } from "./langchain-config";

/**
 * Response mode types for insights generation
 * - quick: Concise 3-5 sentence summary
 * - pro: Comprehensive 200+ word analysis with sections
 */
export type ResponseMode = "quick" | "pro";

/**
 * Initialize Azure OpenAI chat model for insights generation
 * Higher temperature (0.3) for more creative business analysis
 */
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const azureVersion = process.env.AZURE_OPENAI_VERSION;

const insightsLLM = new ChatOpenAI({
  model: azureDeployment || "gpt-4o-mini",
  temperature: 0.3, // Higher temperature for creative analysis
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
 * System prompt for the insights generator
 * Defines the AI's role as a business analyst for Sleeman Breweries
 */
const INSIGHTS_SYSTEM_PROMPT = `You are a business analyst for Sleeman Breweries, a Canadian craft brewery known for brands like Sleeman Original Draught, Honey Brown, and Cream Ale.
Your role is to analyze SQL query results and provide clear, actionable business insights with specific numbers and recommendations.
Use markdown formatting for emphasis (**bold** for key metrics, bullet points for lists).
Focus on practical business impact and next steps that brewery executives can act on immediately.
Consider brewery-specific metrics: production efficiency, batch quality, fermentation times, inventory levels, distributor performance, and compliance.`;

/**
 * Generate business insights from SQL query results
 * Uses a second LLM to analyze data and provide business context
 *
 * @param question Original user question
 * @param sqlQuery SQL query that was executed
 * @param queryResults Results from the database (columns and rows)
 * @param responseMode "quick" for concise or "pro" for comprehensive analysis
 * @returns Markdown-formatted business insights
 */
export async function generateInsights(
  question: string,
  sqlQuery: string,
  queryResults: { columns: string[]; rows: any[][] },
  responseMode: ResponseMode = "quick"
): Promise<string> {
  const { columns, rows } = queryResults;

  // Handle empty results
  if (rows.length === 0) {
    return `No data found matching your query. This could mean:
- No records match the specified criteria
- The time period selected has no activity
- The filters are too restrictive

**Suggestion:** Try adjusting your question with:
- A broader date range
- Different filter criteria
- Checking if the data exists in the database`;
  }

  // Build context for the LLM based on response mode
  let dataContext: string;

  if (responseMode === "quick") {
    // Quick mode: concise, one paragraph response
    dataContext = `
User Question: ${question}

SQL Query Executed:
${sqlQuery}

Results (${rows.length} rows):
Columns: ${columns.join(', ')}
Data:
${rows.slice(0, 10).map((row, idx) =>
  `Row ${idx + 1}: ${columns.map((col, i) => `${col}=${row[i]}`).join(', ')}`
).join('\n')}
${rows.length > 10 ? `\n... (${rows.length - 10} more rows)` : ''}

Instructions:
Provide a BRIEF, concise answer in ONE PARAGRAPH MAXIMUM (3-5 sentences). Focus on:
- The single most important finding from the data
- One key number or metric (use **bold** markdown)
- One actionable insight or recommendation

Use markdown formatting (bold for key numbers like **$125,450** or **23.5%**).
Be direct, business-focused, and speak like an executive summarizing data.`;
  } else {
    // Pro mode: comprehensive analysis
    dataContext = `
User Question: ${question}

SQL Query Executed:
${sqlQuery}

Results (${rows.length} rows):
Columns: ${columns.join(', ')}
Data:
${rows.slice(0, 50).map((row, idx) =>
  `Row ${idx + 1}: ${columns.map((col, i) => `${col}=${row[i]}`).join(', ')}`
).join('\n')}
${rows.length > 50 ? `\n... (${rows.length - 50} more rows)` : ''}

Instructions:
You MUST provide a COMPREHENSIVE BUSINESS ANALYSIS with the following MANDATORY structure and requirements.

MANDATORY STRUCTURE (You must include ALL four sections):

**📊 Key Findings**
- Identify 3-5 major patterns or trends in the data
- Include specific numbers, percentages, and comparisons (use **bold** for metrics)
- Highlight both positive and negative findings
- Compare segments, categories, or time periods

**💰 Financial Impact**
- Quantify the business impact in dollars, revenue, or cost terms
- Calculate margins, profitability, or efficiency metrics where applicable
- Compare performance across segments/categories if relevant
- Show year-over-year or month-over-month trends if applicable

**⚠️ Risk Areas & Opportunities**
- Identify 2-3 problem areas that need immediate attention
- Quantify the risk or opportunity cost with specific numbers
- Highlight underperforming segments or missed opportunities
- Show the gap between actual and potential performance

**🎯 Actionable Recommendations**
- Provide 3-5 SPECIFIC, actionable next steps
- Each recommendation must be concrete (not vague like "improve performance")
- Include expected impact or success metrics for each recommendation
- Prioritize recommendations by potential business impact

MINIMUM REQUIREMENTS:
- Total response length: 200+ words (this is NON-NEGOTIABLE)
- Include at least 5 specific numbers or metrics with context
- Provide at least 3 concrete, actionable recommendations
- Use bullet points and markdown formatting (**bold**, headers)
- Include percentages, dollar amounts, or comparative metrics

EXAMPLE OF EXPECTED DEPTH:
For a question like "Which routes have the highest failure rates?"

**📊 Key Findings**
The analysis reveals that **3 routes account for 45% of all failures** despite representing only 18% of total volume. The Austin-Phoenix route shows the highest failure rate at **22.3%** (89 failed out of 399 total shipments), followed by Denver-Miami at **18.7%** (52/278) and Seattle-Atlanta at **16.4%** (41/250). In contrast, our best-performing routes like Chicago-New York maintain failure rates below **3.2%**.

**💰 Financial Impact**
These high-failure routes are costing the business approximately **$47,500 per quarter** in:
- Customer refunds and compensation: **$28,000**
- Re-shipping costs: **$14,200**
- Customer service overhead: **$5,300**

If failure rates were reduced to the company average of 8%, we would save **$23,750 quarterly** or **$95,000 annually**.

**⚠️ Risk Areas & Opportunities**
The Austin-Phoenix route's 22% failure rate is **7x higher** than our best routes, indicating systemic issues with either the carrier (CarrierCo handles 85% of this route) or routing logistics. Additionally, **38% of failures** occur during the final-mile delivery phase, suggesting carrier partner performance issues rather than packaging problems.

**🎯 Actionable Recommendations**
1. **Immediately renegotiate or switch carriers for Austin-Phoenix route** - CarrierCo's performance is unacceptable. Test alternative carriers for 30-day trial (expected 50% failure reduction = **$6K monthly savings**)
2. **Implement enhanced packaging requirements for high-failure routes** - Add fragile handling labels and double-boxing for Denver-Miami and Seattle-Atlanta (estimated cost: **$2/shipment**, potential savings: **$8K/quarter**)
3. **Adjust pricing on high-risk routes** - Add 15% risk premium to Austin-Phoenix pricing to offset failure costs while maintaining margins (expected **$12K additional quarterly revenue**)
4. **Create carrier performance scorecard** - Track failure rates by carrier and route weekly, with automatic carrier switches when failure rates exceed 10% for 2 consecutive weeks

This is the MINIMUM expected depth for Pro mode. Provide similar comprehensive analysis for the current question.`;
  }

  try {
    console.log(`🧠 Generating ${responseMode.toUpperCase()} insights...`);

    const response = await insightsLLM.invoke([
      new SystemMessage(INSIGHTS_SYSTEM_PROMPT),
      new HumanMessage(dataContext),
    ]);

    const content = response.content as string;
    return content.trim() || `Found ${rows.length} result${rows.length !== 1 ? 's' : ''}. See the table below for details.`;
  } catch (error: any) {
    console.error('❌ Error generating insights:', error);
    // Fallback to basic response if insights generation fails
    return `## Analysis Results

Found **${rows.length}** result${rows.length !== 1 ? 's' : ''} for your query.

The complete data is shown in the table below. ${
  responseMode === 'pro'
    ? 'You can download the results as Excel for further analysis.'
    : 'Switch to Pro mode for detailed business insights.'
}`;
  }
}

/**
 * Generate insights for error cases
 * Provides helpful guidance when SQL queries fail
 *
 * @param question Original user question
 * @param sqlQuery SQL query that failed (if available)
 * @param error Error message from the agent
 * @returns User-friendly error explanation with suggestions
 */
export async function generateErrorInsights(
  question: string,
  sqlQuery: string | null,
  error: string
): Promise<string> {
  // Provide context-aware error messages
  if (error.includes('syntax error') || error.includes('SQL Error')) {
    return `## ⚠️ Query Error

I generated a SQL query, but there was a syntax error:

\`\`\`
${error.substring(0, 200)}
\`\`\`

**This could be due to:**
- Incorrect table or column names
- Invalid SQL syntax
- Missing JOIN conditions

**What to try:**
- Rephrase your question to be more specific
- Ask about different data (e.g., "show me customers" instead of "analyze customer behavior")
- Specify a date range or filter (e.g., "last 30 days", "for FedEx carrier")`;
  }

  if (error.includes('does not exist') || error.includes('relation')) {
    return `## ⚠️ Table or Column Not Found

The query referenced a table or column that doesn't exist in the Sleeman Breweries database.

**Available data areas:**
- **Production** - Batch records, production lines, efficiency metrics
- **Quality** - Test results, quality issues, batch failure rates
- **Beer Styles** - 8 Sleeman styles with fermentation details
- **Inventory** - Raw materials, suppliers, reorder levels
- **Equipment** - Equipment registry, downtime events
- **Distribution** - Distributors, shipments, products
- **Revenue** - Monthly revenue by product
- **Compliance** - Audit records and scores

**Try asking about:** "Show me production volume by beer style" or "What's our batch failure rate?"`;
  }

  if (error.includes('permission denied') || error.includes('read-only')) {
    return `## ⚠️ Permission Denied

This database is read-only. Only SELECT queries are allowed for data analysis.

**What you can do:**
- Query and analyze any Sleeman Breweries data
- Generate reports and insights
- Export data to Excel

**What's not allowed:**
- Modifying data (INSERT, UPDATE, DELETE)
- Creating or altering tables
- Administrative operations`;
  }

  if (error.includes('DATABASE_URL')) {
    return `## ⚠️ Database Connection Error

The SQL analytics database is not configured. Please contact your administrator.

**What's needed:**
- PostgreSQL database connection (DATABASE_URL)
- Sleeman Breweries analytics data restored

In the meantime, I can still help with:
- Brewery production questions
- Quality metrics analysis
- General Sleeman Breweries information`;
  }

  // Generic error message
  return `## ⚠️ Something Went Wrong

I encountered an error while processing your question:

\`\`\`
${error.substring(0, 200)}
\`\`\`

**Please try:**
- Rephrasing your question
- Being more specific about what data you need
- Asking about a different topic
- Using simpler criteria or filters

**Examples of questions I can answer:**
- "Show me production volume by beer style"
- "What's our fermentation efficiency by line?"
- "Which batches have quality issues?"
- "Top distributors by revenue"`;
}

/**
 * Follow-up question generation system prompt
 * Schema-aware version that uses actual database structure
 *
 * Best practices implemented:
 * - Schema injection (AWS, EzInsights)
 * - Entity validation (LangChain Blog)
 * - Quick replies based on capabilities (LinkedIn SQL Bot)
 */
const FOLLOWUP_SYSTEM_PROMPT = `You are a business analyst assistant for Sleeman Breweries.
Your task is to generate relevant follow-up questions that CAN BE ANSWERED by the database.

CRITICAL RULES:
1. ONLY suggest questions that reference EXACT table names, column names, and values from the provided schema
2. NEVER hallucinate entity names - use only the exact beer style names, distributor names, facility names provided
3. Questions must be answerable with a single SQL query against the provided schema
4. If results were empty, suggest questions about related data that DOES exist

Generate questions that:
1. Build on the data just analyzed - drill deeper into the results
2. Explore RELATED tables using foreign keys shown in schema
3. Reference SPECIFIC column names and values from the schema
4. Are actionable - lead to business decisions

Return exactly 3 questions that would naturally follow from the analysis.
Questions should be complete sentences ending with a question mark.
Each question MUST reference actual tables/columns from the schema.`;

/**
 * Generate contextual follow-up questions based on the conversation
 * Uses a separate LLM call to analyze the question + results and suggest next steps
 *
 * SCHEMA-AWARE VERSION (Best practices from AWS, LangChain, LinkedIn, EzInsights):
 * - Injects actual database schema into prompt
 * - Provides sample values for categorical columns
 * - Ensures questions reference valid tables/columns
 * - Avoids hallucinated entity names
 *
 * @param question Original user question
 * @param sqlQuery SQL query that was executed (optional)
 * @param queryResults Query results (optional - for context)
 * @param insights Generated business insights (optional - for context)
 * @returns Array of 3 follow-up question suggestions
 */
export async function generateFollowUpQuestions(
  question: string,
  sqlQuery?: string | null,
  queryResults?: { columns: string[]; rows: any[][] } | null,
  insights?: string | null
): Promise<string[]> {
  try {
    console.log(`💡 Generating schema-aware follow-up questions...`);

    // CRITICAL: Fetch actual database schema for context
    let schemaContext = '';
    try {
      const tableNames = await getCachedTableNames();
      const relevantTables = tableNames.filter(t =>
        !['conversations', 'messages'].includes(t)
      );
      schemaContext = await getCachedSchema(relevantTables);
    } catch (schemaError) {
      console.warn('⚠️ Could not fetch schema for follow-up generation');
      schemaContext = getHardcodedSchemaReference();
    }

    // Build context for follow-up generation
    let context = `User's Question: "${question}"`;

    if (sqlQuery) {
      context += `\n\nSQL Query Used:\n${sqlQuery}`;
    }

    // Add result context with special handling for empty results
    const hasResults = queryResults && queryResults.rows && queryResults.rows.length > 0;

    if (hasResults) {
      const { columns, rows } = queryResults!;
      context += `\n\nResults Summary:`;
      context += `\n- ${rows.length} rows returned`;
      context += `\n- Columns: ${columns.join(', ')}`;

      // Add sample data for context (first 3 rows)
      context += `\n- Sample data:`;
      rows.slice(0, 3).forEach((row, idx) => {
        context += `\n  Row ${idx + 1}: ${columns.map((col, i) => `${col}=${row[i]}`).join(', ')}`;
      });
    } else {
      context += `\n\n⚠️ QUERY RETURNED NO RESULTS - This is important context!`;
      context += `\nThe user's question did not match any data in the database.`;
      context += `\nSuggest questions about RELATED data that DOES exist, using the schema below.`;
    }

    if (insights && insights.length > 50) {
      const insightsSummary = insights.substring(0, 500);
      context += `\n\nBusiness Insights Generated:\n${insightsSummary}${insights.length > 500 ? '...' : ''}`;
    }

    // Build the full prompt with schema injection
    const userPrompt = `${context}

=== DATABASE SCHEMA (Use ONLY these exact names) ===
${schemaContext}

=== VALID BEER STYLES (Use ONLY these exact names) ===
- Sleeman Clear 2.0 (Light Lager)
- Sleeman Original Draught (Lager)
- Sleeman Honey Brown (Amber Ale)
- Sleeman Cream Ale (Cream Ale)
- Sleeman Silver Creek (Lager)
- Okanagan Spring Pale Ale (Pale Ale)
- Wild Rose WRaspberry (Fruit Beer)
- Sapporo Premium (Lager)

=== FACILITIES ===
- Guelph Facility (Ontario) - 3 production lines
- Vernon Facility (BC) - 2 production lines

=== YOUR TASK ===
Generate exactly 3 follow-up questions that:
1. Reference ACTUAL table names and column names from the schema above
2. Use EXACT entity names (beer styles, facilities) - NO variations or guessing
3. ${hasResults ? 'Build on the results shown above' : 'Explore RELATED data that exists (since this query returned nothing)'}
4. Can be answered with a simple SQL query

${!hasResults ? `
IMPORTANT: Since the query returned no results, suggest questions about:
- Different beer styles that DO exist (from the list above)
- Different time periods or metrics
- Related tables (e.g., if quality failed, ask about production or inventory)
` : ''}

Return ONLY the 3 questions, one per line, with no numbering or bullet points.`;

    const response = await insightsLLM.invoke([
      new SystemMessage(FOLLOWUP_SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    const content = response.content as string;

    // Parse the response into individual questions
    const questions = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 10 && line.endsWith('?'))
      .slice(0, 3);

    // If we got valid questions, return them
    if (questions.length >= 2) {
      console.log(`   ✅ Generated ${questions.length} schema-aware follow-up questions`);
      return questions;
    }

    // Fallback: Generate domain-specific questions based on the query topic
    console.log(`   ⚠️ Using fallback questions (parsed ${questions.length} questions)`);
    return getContextualFallbackQuestions(question);

  } catch (error: any) {
    console.error('❌ Error generating follow-up questions:', error);
    return getContextualFallbackQuestions(question);
  }
}

/**
 * Hardcoded schema reference as fallback when database is unavailable
 * Contains the actual Sleeman Breweries database structure
 */
function getHardcodedSchemaReference(): string {
  return `
Tables and key columns:
- beer_styles: id, name, category, description, abv_min, abv_max, ibu_min, ibu_max, fermentation_days
- production_lines: id, name, facility_location, capacity_hl, status
- production_batches: id, batch_number, beer_style_id, production_line_id, brew_date, volume_hl, efficiency_percent, status
- quality_tests: id, batch_id, test_type (ABV, IBU, pH, clarity, taste, carbonation), result, passed, test_date
- quality_issues: id, batch_id, issue_type, severity, description, resolution_status
- suppliers: id, name, category, contact_email, rating
- raw_materials: id, name, supplier_id, quantity_kg, reorder_level_kg, unit_cost
- material_usage: id, batch_id, material_id, quantity_used_kg
- equipment: id, name, type, production_line_id, status, last_maintenance_date
- equipment_downtime: id, equipment_id, start_time, end_time, reason, cost_impact
- distributors: id, name, region, contact_email, active
- shipments: id, distributor_id, product_id, quantity, ship_date, delivery_status
- products: id, name, beer_style_id, package_type, package_size, price
- monthly_revenue: id, product_id, month, revenue, units_sold, cost_of_goods
- compliance_audits: id, audit_type, audit_date, score, findings, auditor

Key relationships:
- production_batches → beer_styles (beer_style_id)
- production_batches → production_lines (production_line_id)
- quality_tests → production_batches (batch_id)
- shipments → distributors (distributor_id)
- shipments → products (product_id)
- products → beer_styles (beer_style_id)
- monthly_revenue → products (product_id)
`;
}

/**
 * Get contextual fallback questions based on detected topic
 * Used when AI generation fails or returns invalid results
 *
 * IMPORTANT: These use EXACT entity names from the Sleeman database
 * to prevent hallucination errors
 */
function getContextualFallbackQuestions(question: string): string[] {
  const lowerQuestion = question.toLowerCase();

  // Detect topic and return relevant follow-ups using EXACT database entities
  if (lowerQuestion.includes('production') || lowerQuestion.includes('batch') || lowerQuestion.includes('volume')) {
    return [
      "What is the average efficiency_percent by production_line for Sleeman Original Draught batches?",
      "How many production_batches were completed at the Guelph Facility vs Vernon Facility this year?",
      "Which beer_style has the highest total volume_hl in production_batches?"
    ];
  }

  if (lowerQuestion.includes('quality') || lowerQuestion.includes('failure') || lowerQuestion.includes('test')) {
    return [
      "What is the pass rate for quality_tests by test_type (ABV, IBU, pH)?",
      "How many quality_issues with severity 'critical' exist by beer_style?",
      "What is the average quality_tests result for Sleeman Honey Brown batches?"
    ];
  }

  if (lowerQuestion.includes('inventory') || lowerQuestion.includes('material') || lowerQuestion.includes('supplier')) {
    return [
      "Which raw_materials have quantity_kg below reorder_level_kg?",
      "What is the total material_usage by supplier for hops and malt?",
      "Which suppliers have the highest rating in the suppliers table?"
    ];
  }

  if (lowerQuestion.includes('distributor') || lowerQuestion.includes('shipment') || lowerQuestion.includes('delivery')) {
    return [
      "What is the total shipment quantity by distributor region?",
      "Which products have the most shipments with delivery_status 'delivered'?",
      "How many active distributors are in each region?"
    ];
  }

  if (lowerQuestion.includes('revenue') || lowerQuestion.includes('sales') || lowerQuestion.includes('profit')) {
    return [
      "What is the total monthly_revenue by product for the last 6 months?",
      "Which products have the highest revenue minus cost_of_goods margin?",
      "How do units_sold compare between Sleeman Original Draught and Sleeman Cream Ale?"
    ];
  }

  if (lowerQuestion.includes('equipment') || lowerQuestion.includes('downtime') || lowerQuestion.includes('maintenance')) {
    return [
      "What is the total cost_impact from equipment_downtime by production_line?",
      "Which equipment items have the oldest last_maintenance_date?",
      "What are the most common equipment_downtime reasons?"
    ];
  }

  // Default brewery-focused questions using exact schema references
  return [
    "What is the production volume_hl by beer_style name for completed batches?",
    "How do quality_tests pass rates compare between Guelph and Vernon facilities?",
    "Which distributors have the highest shipment quantities by region?"
  ];
}
