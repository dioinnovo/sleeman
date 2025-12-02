/**
 * Oracle SQL Translator
 *
 * Translates PostgreSQL queries to Oracle SQL syntax for demo purposes.
 * Uses LLM-based translation to handle complex syntax differences.
 */

import { generateText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// Initialize Azure OpenAI provider (same config as sql-agent-stream)
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';
const azureApiVersion = process.env.AZURE_OPENAI_VERSION || '2024-12-01-preview';

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

const model = azureProvider.chatModel('gpt-4o-mini');

/**
 * System prompt for PostgreSQL → Oracle translation
 */
const ORACLE_TRANSLATION_PROMPT = `You are a SQL syntax translator. Convert the following PostgreSQL query to Oracle SQL syntax.

Key translations to apply:
- LIMIT n → FETCH FIRST n ROWS ONLY
- LIMIT n OFFSET m → OFFSET m ROWS FETCH NEXT n ROWS ONLY
- NOW() → SYSDATE
- CURRENT_TIMESTAMP → SYSTIMESTAMP
- CURRENT_DATE → TRUNC(SYSDATE)
- COALESCE(a, b) → NVL(a, b) when 2 arguments
- TRUE/FALSE → 1/0
- ::type casting → CAST(x AS type) or TO_NUMBER/TO_CHAR/TO_DATE
- ILIKE → UPPER(col) LIKE UPPER(pattern)
- EXTRACT(epoch FROM interval) → Use Oracle date arithmetic
- String concatenation behavior is similar (||)
- Table aliases don't need AS keyword in Oracle

Important Oracle-specific rules:
- Oracle requires FROM DUAL for SELECT without a table
- ROWNUM can be used instead of LIMIT for simple cases
- Use NVL2(expr, val_if_not_null, val_if_null) for conditional null handling

Return ONLY the Oracle SQL query, no explanations or markdown formatting.`;

/**
 * Translate a PostgreSQL query to Oracle SQL syntax
 *
 * @param postgresQuery - The PostgreSQL query to translate
 * @returns The equivalent Oracle SQL query
 */
export async function translateToOracleSQL(postgresQuery: string): Promise<string> {
  try {
    const response = await generateText({
      model,
      system: ORACLE_TRANSLATION_PROMPT,
      prompt: `PostgreSQL Query:\n${postgresQuery}\n\nOracle SQL Query:`,
      temperature: 0.1,
      maxOutputTokens: 2000,
    });

    // Clean up the response
    let oracleQuery = response.text
      .replace(/```sql\n?/gi, '')
      .replace(/```\n?/g, '')
      .replace(/^Oracle SQL Query:\s*/i, '')
      .trim();

    return oracleQuery;
  } catch (error) {
    console.error('[Oracle Translator] Error translating query:', error);
    // Return a simple transformation as fallback
    return fallbackTranslation(postgresQuery);
  }
}

/**
 * Simple rule-based fallback translation
 * Used when LLM translation fails
 */
function fallbackTranslation(postgresQuery: string): string {
  let oracleQuery = postgresQuery;

  // Replace LIMIT with FETCH FIRST
  oracleQuery = oracleQuery.replace(
    /\bLIMIT\s+(\d+)\s*$/gi,
    'FETCH FIRST $1 ROWS ONLY'
  );

  // Replace LIMIT with OFFSET
  oracleQuery = oracleQuery.replace(
    /\bLIMIT\s+(\d+)\s+OFFSET\s+(\d+)/gi,
    'OFFSET $2 ROWS FETCH NEXT $1 ROWS ONLY'
  );

  // Replace NOW() with SYSDATE
  oracleQuery = oracleQuery.replace(/\bNOW\(\)/gi, 'SYSDATE');

  // Replace CURRENT_TIMESTAMP with SYSTIMESTAMP
  oracleQuery = oracleQuery.replace(/\bCURRENT_TIMESTAMP\b/gi, 'SYSTIMESTAMP');

  // Replace CURRENT_DATE with TRUNC(SYSDATE)
  oracleQuery = oracleQuery.replace(/\bCURRENT_DATE\b/gi, 'TRUNC(SYSDATE)');

  // Replace boolean literals
  oracleQuery = oracleQuery.replace(/\bTRUE\b/gi, '1');
  oracleQuery = oracleQuery.replace(/\bFALSE\b/gi, '0');

  // Replace ::type casting with CAST
  oracleQuery = oracleQuery.replace(
    /(\w+)::(\w+)/g,
    'CAST($1 AS $2)'
  );

  // Replace ILIKE with case-insensitive LIKE
  oracleQuery = oracleQuery.replace(
    /(\w+)\s+ILIKE\s+('[^']*')/gi,
    'UPPER($1) LIKE UPPER($2)'
  );

  return oracleQuery;
}
