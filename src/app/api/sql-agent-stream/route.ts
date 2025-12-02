/**
 * Streaming SQL Agent API
 *
 * Real-time streaming endpoint using Vercel AI SDK v5
 * Provides visual "thinking steps" feedback during query processing
 *
 * Stream Events:
 * - thinking: Progress updates ("Analyzing query...", "Executing SQL...")
 * - tool-call/tool-result: SQL generation and execution
 * - text-delta: Streamed business insights
 * - data: Final structured data (SQL, results, charts)
 */

import { NextRequest } from 'next/server';
import { streamText, LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { classifyQueryComplexity } from '@/lib/ai/query-classifier';
import { executeQuery, getCachedSchema } from '@/lib/ai/langchain-config';
import { sanitizeSqlQuery } from '@/lib/ai/sql-tools';
import { generateChartData, isChartable } from '@/lib/ai/chart-generator';
import { generateFollowUpQuestions, type ResponseMode } from '@/lib/ai/insights-generator';
import { translateToOracleSQL } from '@/lib/ai/oracle-translator';

// Initialize Azure OpenAI provider using OpenAI-compatible wrapper
// This correctly handles Azure Cognitive Services endpoints
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';
const azureApiVersion = process.env.AZURE_OPENAI_VERSION || '2024-12-01-preview';

// Azure expects: {endpoint}/openai/deployments/{deployment}/chat/completions
// OpenAI-compatible provider appends /chat/completions to baseURL
// So we include the deployment in baseURL and use a dummy model name
const azureProvider = createOpenAICompatible({
  name: 'azure-openai',
  baseURL: `${azureEndpoint}/openai/deployments/${azureDeployment}`,
  headers: {
    'api-key': process.env.AZURE_OPENAI_KEY || '',
  },
  queryParams: {
    'api-version': azureApiVersion,
  },
});

// Model name doesn't matter - Azure uses the deployment from the URL path
// The chatModel() just needs a name to satisfy the API
const model: LanguageModel = azureProvider.chatModel('gpt-4o-mini');

/**
 * SQL generation system prompt
 */
async function getSqlSystemPrompt(): Promise<string> {
  const schemaContext = await getCachedSchema();

  return `You are a SQL expert for Sleeman Breweries, a Canadian craft brewery.

DATABASE SCHEMA:
${schemaContext}

Generate a single, optimized PostgreSQL query to answer the user's question.
Return ONLY the SQL query, nothing else. No explanations, no markdown.
Requirements:
1. Valid PostgreSQL SQL
2. Use only tables/columns from the schema
3. Include LIMIT 100
4. Order results logically`;
}

/**
 * Insights generation system prompt
 */
const INSIGHTS_SYSTEM_PROMPT = `You are a business analyst for Sleeman Breweries.
Analyze SQL query results and provide clear, actionable insights.
Use markdown: **bold** for key metrics, bullet points for lists.
Focus on practical business impact for brewery executives.`;

/**
 * POST /api/sql-agent-stream
 * Stream SQL query execution with thinking steps
 */
export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  try {
    const body = await request.json();
    const { question, responseMode = 'quick' } = body;

    if (!question || typeof question !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a readable stream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: any) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          // Phase 1: Query Classification
          send('thinking', {
            step: 'classify',
            message: 'Analyzing query complexity...',
            icon: 'analyze'
          });

          const classification = classifyQueryComplexity(question);

          send('thinking', {
            step: 'classify-done',
            message: `Query type: ${classification.complexity} (${classification.reason})`,
            icon: 'analyze',
            done: true
          });

          // Phase 2: Schema Lookup
          send('thinking', {
            step: 'schema',
            message: 'Loading database schema...',
            icon: 'database'
          });

          const systemPrompt = await getSqlSystemPrompt();

          send('thinking', {
            step: 'schema-done',
            message: 'Schema loaded from cache',
            icon: 'database',
            done: true
          });

          // Phase 3: SQL Generation
          send('thinking', {
            step: 'sql-gen',
            message: 'Generating SQL query...',
            icon: 'code'
          });

          // Generate SQL using AI SDK
          console.log('[SQL-STREAM] Calling Azure OpenAI for SQL generation...');
          console.log('[SQL-STREAM] Endpoint:', azureEndpoint);
          console.log('[SQL-STREAM] Deployment:', azureDeployment);

          const sqlResponse = await streamText({
            model,
            system: systemPrompt,
            prompt: question,
            temperature: 0.1,
          });

          let sqlQuery = '';
          for await (const chunk of sqlResponse.textStream) {
            console.log('[SQL-STREAM] Chunk:', chunk);
            sqlQuery += chunk;
          }
          console.log('[SQL-STREAM] Final SQL:', sqlQuery);

          // Clean up SQL
          sqlQuery = sqlQuery
            .replace(/```sql\n?/g, '')
            .replace(/```\n?/g, '')
            .replace(/^SQL:\s*/i, '')
            .trim();

          send('tool-call', {
            toolCallId: 'sql-gen-1',
            toolName: 'generateSQL',
            args: { question }
          });

          send('tool-result', {
            toolCallId: 'sql-gen-1',
            toolName: 'generateSQL',
            result: { sql: sqlQuery.substring(0, 200) + (sqlQuery.length > 200 ? '...' : '') }
          });

          send('thinking', {
            step: 'sql-gen-done',
            message: 'SQL query generated',
            icon: 'code',
            done: true
          });

          // Phase 3.5: Oracle SQL Translation (Demo)
          send('thinking', {
            step: 'oracle-translate',
            message: 'Translating to Oracle SQL...',
            icon: 'code'
          });

          let oracleSqlQuery = '';
          try {
            oracleSqlQuery = await translateToOracleSQL(sqlQuery);
            console.log('[SQL-STREAM] Oracle SQL:', oracleSqlQuery);
          } catch (oracleError) {
            console.error('[SQL-STREAM] Oracle translation failed:', oracleError);
            oracleSqlQuery = '-- Translation failed';
          }

          send('thinking', {
            step: 'oracle-translate-done',
            message: 'Oracle SQL generated',
            icon: 'code',
            done: true
          });

          // Phase 4: Query Validation & Execution
          send('thinking', {
            step: 'execute',
            message: 'Validating and executing query...',
            icon: 'database'
          });

          let queryResults: { columns: string[]; rows: any[][] } | null = null;
          let error: string | null = null;

          try {
            // Sanitize SQL
            sqlQuery = sanitizeSqlQuery(sqlQuery);

            // Execute query
            const results = await executeQuery(sqlQuery);

            if (!results || results.length === 0) {
              queryResults = { columns: [], rows: [] };
            } else {
              const columns = Object.keys(results[0]);
              const rows = results.map((row: any) => columns.map(col => row[col]));
              queryResults = { columns, rows };
            }

            send('thinking', {
              step: 'execute-done',
              message: `Query returned ${queryResults.rows.length} rows`,
              icon: 'database',
              done: true
            });

          } catch (execError: any) {
            error = execError.message || 'Unknown error';
            send('error', {
              step: 'execute',
              message: `Query failed: ${error!.substring(0, 100)}`,
              icon: 'database'
            });
          }

          // Phase 5: Chart Generation
          let chartData = null;
          if (queryResults && queryResults.rows.length > 0) {
            send('thinking', {
              step: 'chart',
              message: 'Analyzing data for visualization...',
              icon: 'insights'
            });

            if (isChartable(queryResults.columns, queryResults.rows)) {
              chartData = generateChartData(queryResults.columns, queryResults.rows);
              send('thinking', {
                step: 'chart-done',
                message: `Generated ${chartData?.type || 'no'} chart`,
                icon: 'insights',
                done: true
              });
            } else {
              send('thinking', {
                step: 'chart-done',
                message: 'Data not suitable for visualization',
                icon: 'insights',
                done: true
              });
            }
          }

          // Phase 6: Insights Generation (Streaming)
          if (queryResults && queryResults.rows.length > 0 && !error) {
            send('thinking', {
              step: 'insights',
              message: 'Generating business insights...',
              icon: 'insights'
            });

            // Build context for insights
            const dataContext = buildInsightsContext(
              question,
              sqlQuery,
              queryResults,
              responseMode as ResponseMode
            );

            // Stream insights
            const insightsStream = streamText({
              model,
              system: INSIGHTS_SYSTEM_PROMPT,
              prompt: dataContext,
              temperature: 0.3,
            });

            let insights = '';
            for await (const chunk of insightsStream.textStream) {
              insights += chunk;
              send('text-delta', { textDelta: chunk });
            }

            send('thinking', {
              step: 'insights-done',
              message: 'Insights generated',
              icon: 'insights',
              done: true
            });

            // Generate follow-up questions
            send('thinking', {
              step: 'followup',
              message: 'Generating follow-up questions...',
              icon: 'insights'
            });

            const followUpQuestions = await generateFollowUpQuestions(
              question,
              sqlQuery,
              queryResults,
              insights
            );

            send('thinking', {
              step: 'followup-done',
              message: `Generated ${followUpQuestions.length} suggestions`,
              icon: 'insights',
              done: true
            });

            // Send final data
            send('data', {
              success: true,
              sqlQuery,
              oracleSqlQuery,
              queryResults,
              chartData,
              followUpQuestions,
              metadata: {
                complexity: classification.complexity,
                usedFastPath: classification.useFastPath,
                confidence: classification.confidence
              }
            });

          } else if (error) {
            // Send error data
            send('data', {
              success: false,
              sqlQuery,
              oracleSqlQuery,
              queryResults: null,
              chartData: null,
              followUpQuestions: [],
              error,
              metadata: {
                complexity: classification.complexity,
                usedFastPath: classification.useFastPath,
                confidence: classification.confidence
              }
            });
          } else {
            // No results
            send('text-delta', {
              textDelta: `No data found matching your query. This could mean:\n- No records match the specified criteria\n- The time period selected has no activity\n- The filters are too restrictive`
            });

            send('data', {
              success: true,
              sqlQuery,
              oracleSqlQuery,
              queryResults: { columns: [], rows: [] },
              chartData: null,
              followUpQuestions: [
                'What is our production volume by beer style this quarter?',
                'Show me the top distributors by revenue',
                'What are the quality test results for recent batches?'
              ],
              metadata: {
                complexity: classification.complexity,
                usedFastPath: classification.useFastPath,
                confidence: classification.confidence
              }
            });
          }

          // Signal completion
          send('finish', { finishReason: 'stop' });

        } catch (streamError: any) {
          console.error('Stream processing error:', streamError);
          send('error', {
            message: streamError.message || 'Stream processing failed'
          });
          send('finish', { finishReason: 'error' });
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Agent-Type': 'sql-analytics-stream'
      }
    });

  } catch (error: any) {
    console.error('SQL Agent Stream Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Build context for insights generation based on response mode
 */
function buildInsightsContext(
  question: string,
  sqlQuery: string,
  queryResults: { columns: string[]; rows: any[][] },
  responseMode: ResponseMode
): string {
  const { columns, rows } = queryResults;

  if (responseMode === 'quick') {
    return `
User Question: ${question}

SQL Query:
${sqlQuery}

Results (${rows.length} rows):
Columns: ${columns.join(', ')}
Data:
${rows.slice(0, 10).map((row, idx) =>
  `Row ${idx + 1}: ${columns.map((col, i) => `${col}=${row[i]}`).join(', ')}`
).join('\n')}
${rows.length > 10 ? `\n... (${rows.length - 10} more rows)` : ''}

Instructions:
Provide a BRIEF answer in ONE PARAGRAPH (3-5 sentences). Focus on:
- The most important finding
- One key metric (use **bold**)
- One actionable insight`;
  }

  // Pro mode - comprehensive analysis
  return `
User Question: ${question}

SQL Query:
${sqlQuery}

Results (${rows.length} rows):
Columns: ${columns.join(', ')}
Data:
${rows.slice(0, 50).map((row, idx) =>
  `Row ${idx + 1}: ${columns.map((col, i) => `${col}=${row[i]}`).join(', ')}`
).join('\n')}
${rows.length > 50 ? `\n... (${rows.length - 50} more rows)` : ''}

Provide comprehensive analysis with these sections:

**📊 Key Findings** - 3-5 patterns with specific numbers
**💰 Financial Impact** - Quantify business impact
**⚠️ Risk Areas & Opportunities** - 2-3 problems/opportunities
**🎯 Actionable Recommendations** - 3-5 specific next steps

Minimum 200 words with specific metrics and markdown formatting.`;
}

/**
 * GET /api/sql-agent-stream
 * Health check
 */
export async function GET() {
  const status = {
    database: !!process.env.DATABASE_URL,
    azureOpenAI: !!process.env.AZURE_OPENAI_KEY && !!process.env.AZURE_OPENAI_ENDPOINT,
    ready: !!process.env.DATABASE_URL && !!process.env.AZURE_OPENAI_KEY
  };

  return new Response(
    JSON.stringify({
      status: 'SQL Agent Stream API',
      version: '1.0.0',
      streaming: true,
      configuration: status
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
