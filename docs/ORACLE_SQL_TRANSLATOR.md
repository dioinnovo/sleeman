# Oracle SQL Translator

## Overview

The Oracle SQL Translator is an AI-powered module that converts PostgreSQL queries to Oracle SQL syntax in real-time. This feature is specifically designed for the Sleeman Breweries demo to showcase compatibility with their existing Oracle EBS R12 infrastructure.

**Why This Matters for Sleeman:**
- Sleeman uses Oracle E-Business Suite R12 as their core ERP
- Brian Cappellaro's team has deep Oracle expertise
- Demonstrating Oracle SQL output builds confidence that BrewMind can integrate with their existing infrastructure

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SQL Agent Stream API                             │
│                   /api/sql-agent-stream                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. User Question                                                    │
│        ↓                                                             │
│  2. Generate PostgreSQL Query (Azure OpenAI)                         │
│        ↓                                                             │
│  3. ┌──────────────────────────────────────────┐                    │
│     │   Oracle SQL Translator                  │                    │
│     │   src/lib/ai/oracle-translator.ts        │                    │
│     │                                          │                    │
│     │   • LLM-based translation (primary)      │                    │
│     │   • Rule-based fallback (backup)         │                    │
│     └──────────────────────────────────────────┘                    │
│        ↓                                                             │
│  4. Execute PostgreSQL Query → Return Results                        │
│        ↓                                                             │
│  5. Response includes both:                                          │
│     • sqlQuery (PostgreSQL)                                          │
│     • oracleSqlQuery (Oracle equivalent)                             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Files

| File | Description |
|------|-------------|
| `src/lib/ai/oracle-translator.ts` | Core translation logic |
| `src/app/api/sql-agent-stream/route.ts` | Streaming API that uses the translator |

---

## Translation Capabilities

### LLM-Based Translation (Primary)

Uses Azure OpenAI GPT-4o-mini to intelligently translate complex PostgreSQL syntax to Oracle SQL. The LLM understands context and handles edge cases that rule-based systems cannot.

**System Prompt:**
```
You are a SQL syntax translator. Convert the following PostgreSQL query
to Oracle SQL syntax.

Key translations to apply:
- LIMIT n → FETCH FIRST n ROWS ONLY
- NOW() → SYSDATE
- CURRENT_TIMESTAMP → SYSTIMESTAMP
- TRUE/FALSE → 1/0
- ::type casting → CAST(x AS type)
- ILIKE → UPPER(col) LIKE UPPER(pattern)
...
```

### Rule-Based Fallback

If the LLM translation fails, a deterministic fallback handles common patterns:

| PostgreSQL | Oracle |
|------------|--------|
| `LIMIT 10` | `FETCH FIRST 10 ROWS ONLY` |
| `LIMIT 10 OFFSET 5` | `OFFSET 5 ROWS FETCH NEXT 10 ROWS ONLY` |
| `NOW()` | `SYSDATE` |
| `CURRENT_TIMESTAMP` | `SYSTIMESTAMP` |
| `CURRENT_DATE` | `TRUNC(SYSDATE)` |
| `TRUE` / `FALSE` | `1` / `0` |
| `column::type` | `CAST(column AS type)` |
| `ILIKE 'pattern'` | `UPPER(col) LIKE UPPER('pattern')` |

---

## Syntax Mapping Reference

### Date/Time Functions

| PostgreSQL | Oracle |
|------------|--------|
| `NOW()` | `SYSDATE` |
| `CURRENT_TIMESTAMP` | `SYSTIMESTAMP` |
| `CURRENT_DATE` | `TRUNC(SYSDATE)` |
| `EXTRACT(EPOCH FROM interval)` | Oracle date arithmetic |
| `interval '1 day'` | `NUMTODSINTERVAL(1, 'DAY')` |

### Pagination

| PostgreSQL | Oracle (12c+) |
|------------|---------------|
| `LIMIT 10` | `FETCH FIRST 10 ROWS ONLY` |
| `LIMIT 10 OFFSET 20` | `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` |
| `LIMIT 10` | `WHERE ROWNUM <= 10` (legacy) |

### Null Handling

| PostgreSQL | Oracle |
|------------|--------|
| `COALESCE(a, b)` | `NVL(a, b)` (2 args) |
| `COALESCE(a, b, c)` | `COALESCE(a, b, c)` (3+ args - same) |
| `NULLIF(a, b)` | `NULLIF(a, b)` (same) |

### Type Casting

| PostgreSQL | Oracle |
|------------|--------|
| `column::integer` | `CAST(column AS NUMBER)` |
| `column::text` | `CAST(column AS VARCHAR2(4000))` |
| `column::date` | `CAST(column AS DATE)` |
| `column::numeric` | `CAST(column AS NUMBER)` |

### String Functions

| PostgreSQL | Oracle |
|------------|--------|
| `ILIKE` | `UPPER(col) LIKE UPPER(pattern)` |
| `\|\|` (concat) | `\|\|` (same) |
| `SUBSTRING(str, start, len)` | `SUBSTR(str, start, len)` |

### Boolean Values

| PostgreSQL | Oracle |
|------------|--------|
| `TRUE` | `1` |
| `FALSE` | `0` |
| `column = TRUE` | `column = 1` |

### Other Differences

| PostgreSQL | Oracle |
|------------|--------|
| `SELECT 1` | `SELECT 1 FROM DUAL` |
| `SELECT NOW()` | `SELECT SYSDATE FROM DUAL` |
| `AS alias` | `alias` (AS optional in Oracle) |

---

## API Usage

### Streaming Endpoint

```bash
POST /api/sql-agent-stream
Content-Type: application/json

{
  "question": "What is the production volume by beer style?",
  "responseMode": "quick"
}
```

### Response (SSE Events)

```javascript
// Oracle translation step
event: thinking
data: {"step": "oracle-translate", "message": "Translating to Oracle SQL...", "icon": "code"}

event: thinking
data: {"step": "oracle-translate-done", "message": "Oracle SQL generated", "icon": "code", "done": true}

// Final data includes both queries
event: data
data: {
  "success": true,
  "sqlQuery": "SELECT bs.name, SUM(pb.volume) FROM production_batches pb JOIN beer_styles bs ON pb.style_id = bs.id GROUP BY bs.name LIMIT 10",
  "oracleSqlQuery": "SELECT bs.name, SUM(pb.volume) FROM production_batches pb JOIN beer_styles bs ON pb.style_id = bs.id GROUP BY bs.name FETCH FIRST 10 ROWS ONLY",
  "queryResults": {...},
  "chartData": {...}
}
```

---

## Direct Function Usage

```typescript
import { translateToOracleSQL } from '@/lib/ai/oracle-translator';

const postgresQuery = `
  SELECT name, created_at
  FROM users
  WHERE active = TRUE
  LIMIT 10
`;

const oracleQuery = await translateToOracleSQL(postgresQuery);

// Result:
// SELECT name, created_at
// FROM users
// WHERE active = 1
// FETCH FIRST 10 ROWS ONLY
```

---

## Demo Talking Points

When presenting to Sleeman:

1. **Oracle Compatibility**: "Every query Barley generates is automatically translated to Oracle SQL. Your DBAs can review the exact syntax that would run against Oracle EBS."

2. **No Learning Curve**: "Your team already knows Oracle. We're not asking you to learn a new query language - we're just making it easier to ask questions."

3. **Audit Trail**: "Both the PostgreSQL and Oracle versions are logged, so you can always verify what queries were executed."

4. **Future Integration**: "When you're ready to connect to Oracle EBS directly, the translation is already proven. We're demonstrating compatibility now."

---

## Configuration

### Environment Variables

```bash
# Azure OpenAI (required for LLM translation)
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_VERSION=2024-12-01-preview
```

### Fallback Behavior

If Azure OpenAI is unavailable, the translator uses rule-based fallback:

```typescript
try {
  oracleQuery = await translateToOracleSQL(sqlQuery);
} catch (error) {
  // Falls back to rule-based translation
  oracleQuery = fallbackTranslation(sqlQuery);
}
```

---

## Testing

### Test Translation Accuracy

```bash
# Run the dev server
pnpm run dev

# Test via API
curl -X POST http://localhost:3000/api/sql-agent-stream \
  -H "Content-Type: application/json" \
  -d '{"question": "Show top 5 beer styles by production volume"}' \
  | grep -E "sqlQuery|oracleSqlQuery"
```

### Expected Translations

| Input (PostgreSQL) | Output (Oracle) |
|--------------------|-----------------|
| `SELECT * FROM beers LIMIT 5` | `SELECT * FROM beers FETCH FIRST 5 ROWS ONLY` |
| `SELECT NOW()` | `SELECT SYSDATE FROM DUAL` |
| `WHERE active = TRUE` | `WHERE active = 1` |

---

## Limitations

1. **Complex CTEs**: Very complex Common Table Expressions may require manual review
2. **PostgreSQL-specific functions**: Some functions don't have Oracle equivalents (e.g., `generate_series`)
3. **Array types**: PostgreSQL arrays don't translate directly to Oracle
4. **JSON functions**: PostgreSQL JSONB functions differ from Oracle JSON

For complex queries, the LLM handles most edge cases, but production integration should include query validation.

---

## Future Enhancements

1. **Bidirectional Translation**: Oracle → PostgreSQL for testing
2. **Dialect Selection**: Support for other databases (MySQL, SQL Server)
3. **Query Validation**: Verify Oracle syntax before returning
4. **Performance Hints**: Add Oracle optimizer hints

---

*Last Updated: December 2, 2024*
