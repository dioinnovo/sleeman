# Enterprise Migration Guide

## Overview

This document provides comprehensive guidance for migrating the BrewMind AI Analytics Platform codebase to a new enterprise deployment. It covers database configuration, environment variable best practices, and the lessons learned from previous migrations.

**Document Version:** 1.0
**Last Updated:** December 2025
**Previous Enterprise:** Ship Sticks (Golf Equipment Logistics)
**Current Enterprise:** Sleeman Breweries (Craft Brewery Operations)

---

## Table of Contents

1. [Critical Issue: DATABASE_URL Override Problem](#critical-issue-database_url-override-problem)
2. [Environment Variable Best Practices](#environment-variable-best-practices)
3. [Database Migration Checklist](#database-migration-checklist)
4. [AI System Prompt Customization](#ai-system-prompt-customization)
5. [UI Component Updates](#ui-component-updates)
6. [Complete Migration Checklist](#complete-migration-checklist)

---

## Critical Issue: DATABASE_URL Override Problem

### The Problem

**This is the most critical issue that caused repeated deployment failures.**

Shell environment variables take precedence over `.env.local` values in Next.js applications. If a developer or deployment environment has a `DATABASE_URL` set in their shell profile (`.bashrc`, `.zshrc`, etc.), it will **override** the project's `.env.local` configuration.

#### Symptoms
- Application connects to wrong database
- SQL queries return "No results found"
- Logs show connection to unexpected database
- AI agent fails to provide answers

#### Root Cause
```bash
# Developer's shell profile might have:
export DATABASE_URL=postgresql://localhost:5432/old_project_database

# This overrides .env.local even when the project has:
DATABASE_URL="postgresql://newproject:password@localhost:5433/newproject"
```

### The Solution

**Use project-specific environment variable names that won't conflict with shell variables.**

#### Implementation Pattern

```typescript
// src/lib/ai/langchain-config.ts (or your database config file)

export async function getDataSource(): Promise<DataSource> {
  // Priority: PROJECT_SPECIFIC_URL > DATABASE_URL
  const databaseUrl = process.env.YOURPROJECT_DATABASE_URL || process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "YOURPROJECT_DATABASE_URL or DATABASE_URL environment variable is not set. " +
      "Please configure your PostgreSQL connection."
    );
  }

  console.log("🔌 Connecting to database...");
  console.log("   DATABASE_URL:", databaseUrl.replace(/:[^:@]+@/, ':***@')); // Mask password

  // ... rest of connection logic
}
```

#### .env.local Configuration

```bash
# .env.local

# Project-specific variable (takes priority to avoid shell environment conflicts)
YOURPROJECT_DATABASE_URL="postgresql://user:password@localhost:5433/database"

# Fallback for other tools that may need DATABASE_URL
DATABASE_URL="postgresql://user:password@localhost:5433/database"
```

### Key Files to Update

| File | Purpose | Changes Required |
|------|---------|-----------------|
| `src/lib/ai/langchain-config.ts` | Database connection for AI agent | Add project-specific env var check |
| `.env.local` | Environment configuration | Add project-specific DATABASE_URL |
| `docker-compose.yml` | Container database URL | Use project-specific variable |

---

## Environment Variable Best Practices

### 1. Use Project-Specific Prefixes

Instead of generic names, use project-specific prefixes:

```bash
# ❌ Bad - can be overridden by shell
DATABASE_URL=...
API_KEY=...
SECRET_KEY=...

# ✅ Good - project-specific, won't conflict
BREWMIND_DATABASE_URL=...
BREWMIND_API_KEY=...
BREWMIND_SECRET_KEY=...
```

### 2. Environment Variable Priority

Document the priority order in your code:

```typescript
// Always check project-specific first, then fall back to generic
const dbUrl =
  process.env.BREWMIND_DATABASE_URL ||  // Priority 1: Project-specific
  process.env.DATABASE_URL;              // Priority 2: Generic fallback
```

### 3. Validate Configuration on Startup

Add validation to catch configuration issues early:

```typescript
// src/lib/config/validate.ts
export function validateEnvironment(): void {
  const required = [
    'BREWMIND_DATABASE_URL',
    'AZURE_OPENAI_ENDPOINT',
    'AZURE_OPENAI_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    throw new Error('Environment validation failed');
  }

  console.log('✅ Environment validation passed');
}
```

### 4. Log Configuration (Safely)

Always log which database you're connecting to (with masked passwords):

```typescript
function maskConnectionString(url: string): string {
  return url.replace(/:[^:@]+@/, ':***@');
}

console.log(`Connecting to: ${maskConnectionString(databaseUrl)}`);
```

---

## Database Migration Checklist

When migrating to a new enterprise, follow these steps:

### 1. Schema Updates

Update all table and column names to match the new domain:

```sql
-- Example: Changing from liters to hectoliters (brewery standard)
-- Old column: volume_liters
-- New column: volume_hectoliters

ALTER TABLE production_batches
  RENAME COLUMN target_volume_liters TO target_volume_hectoliters;

ALTER TABLE production_batches
  RENAME COLUMN actual_volume_liters TO actual_volume_hectoliters;
```

### 2. Files to Update

| File | Location | Purpose |
|------|----------|---------|
| Schema SQL | `src/lib/db/init/01-schema.sql` | Database table definitions |
| Seed Data | `src/lib/db/init/02-seed-data.sql` | Sample/demo data |
| Queries | `src/lib/db/brewery-queries.ts` | SQL query functions |
| Types | `src/lib/db/types.ts` | TypeScript interfaces |

### 3. Reinitialize Database

After schema changes, reinitialize the database:

```bash
# Connect to PostgreSQL
docker exec -it brewmind-postgres psql -U brewmind -d brewmind

# Drop all tables (in correct order to handle foreign keys)
DROP TABLE IF EXISTS production_batches CASCADE;
DROP TABLE IF EXISTS quality_tests CASCADE;
-- ... drop all tables

# Run schema
\i src/lib/db/init/01-schema.sql

# Run seed data
\i src/lib/db/init/02-seed-data.sql

# Verify
\dt
```

### 4. Verify Schema Cache

The application caches database schema on startup. Verify it's working:

```
✅ Schema cache initialized: 15 tables, 12.0KB
```

---

## AI System Prompt Customization

### Location

`src/lib/ai/system-prompts.ts`

### Key Sections to Update

1. **Company Identity**
```typescript
export const ASSISTANT_PROMPT = `You are [AI_NAME], the intelligent analytics assistant for [COMPANY_NAME] - [COMPANY_DESCRIPTION].

## WHO YOU ARE
- An expert [DOMAIN] analyst with deep knowledge of [INDUSTRY]
- Data-driven, precise, and passionate about [SPECIALTY]
...
```

2. **Domain Expertise**
```typescript
### [Industry] Domain
- **Category 1**: Specific metrics, terms, processes
- **Category 2**: Industry-specific knowledge
- **Category 3**: Technical terminology
```

3. **Key Metrics and Units**
```typescript
### IMPORTANT: Volume Units - [UNIT_NAME] ([ABBREVIATION])
- **All volumes are measured in [UNIT_NAME] ([ABBREVIATION])** - the industry standard
- 1 [ABBREVIATION] = [CONVERSION]
- Database columns use the *_[column_suffix] naming convention
```

4. **Business Context Template**
```typescript
export const BUSINESS_CONTEXT_TEMPLATE = `
## [COMPANY] COMPANY CONTEXT

**Company**: [Full Company Name]
**Founded**: [Year]
**Mission**: [Mission statement]
**Value Proposition**: "[Tagline]"

**Key Metrics:**
- [Metric 1]: [Value]
- [Metric 2]: [Value]
...
```

### Quick Actions Update

```typescript
export const QUICK_ACTION_PROMPTS = {
  METRIC_SUMMARY: "Show me [metric] by [dimension] for the last [period]",
  ISSUE_REPORT: "What [items] have [issue type]?",
  EFFICIENCY_REPORT: "Compare [metric] across all [entities]",
  // ... customize for your domain
}
```

---

## UI Component Updates

### 1. Sample Questions

Update sample questions in the chat interface:

**File:** `src/app/dashboard/_components/sql-analytics-chat.tsx`

```typescript
const QUICK_QUESTIONS = [
  "Show me [domain-specific query 1]",
  "What are the [domain-specific metrics]?",
  "Compare [entity A] vs [entity B]",
  // ... customize for your domain
];
```

### 2. Branding Updates

| Component | Location | Updates Needed |
|-----------|----------|---------------|
| Logo | `public/images/` | Replace logo files |
| Colors | `tailwind.config.ts` | Update brand colors |
| Favicon | `public/` | Replace favicon |
| App Name | `next.config.ts` | Update metadata |

### 3. Navigation

Update sidebar navigation for domain-specific pages:

**File:** `src/components/layout/sidebar.tsx`

```typescript
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: '[Domain Page 1]', href: '/dashboard/[page1]', icon: Icon1 },
  { name: '[Domain Page 2]', href: '/dashboard/[page2]', icon: Icon2 },
  // ... customize navigation
];
```

---

## Complete Migration Checklist

Use this checklist when migrating to a new enterprise:

### Phase 1: Environment Setup (Critical)

- [ ] **Create project-specific environment variable**
  - Add `[PROJECT]_DATABASE_URL` to `.env.local`
  - Update `langchain-config.ts` to check project-specific var first
  - Document the variable name in README

- [ ] **Verify no shell conflicts**
  - Run `echo $DATABASE_URL` to check for shell override
  - Use `unset DATABASE_URL` if needed during development
  - Document this in developer onboarding

- [ ] **Set up new database**
  - Create PostgreSQL database with new credentials
  - Update Docker compose file
  - Test connection string

### Phase 2: Database Schema

- [ ] **Update schema SQL** (`01-schema.sql`)
  - Rename tables to match new domain
  - Update column names (especially units)
  - Verify foreign key relationships

- [ ] **Update seed data** (`02-seed-data.sql`)
  - Replace sample data with domain-appropriate values
  - Ensure data reflects realistic industry metrics
  - Test data integrity

- [ ] **Update query functions** (`brewery-queries.ts` or equivalent)
  - Update all SQL queries with new column names
  - Update TypeScript interfaces
  - Test all query functions

### Phase 3: AI Customization

- [ ] **Update system prompts** (`system-prompts.ts`)
  - Change AI assistant name and persona
  - Update domain expertise sections
  - Add industry-specific terminology
  - Update key metrics and units

- [ ] **Update quick actions**
  - Customize sample questions
  - Update UI placeholders
  - Test AI responses

### Phase 4: UI Updates

- [ ] **Update branding**
  - Replace logos and favicon
  - Update color scheme
  - Update app metadata

- [ ] **Update navigation**
  - Customize sidebar items
  - Update page titles
  - Remove irrelevant pages

- [ ] **Update content**
  - Landing page copy
  - Dashboard labels
  - Help text and tooltips

### Phase 5: Testing

- [ ] **Database connection test**
  - Verify correct database in logs
  - Test all queries return data
  - Check schema cache initialization

- [ ] **AI agent test**
  - Ask domain-specific questions
  - Verify SQL generation uses correct columns
  - Test natural language understanding

- [ ] **UI test**
  - Navigate all pages
  - Test responsive design
  - Verify branding consistency

### Phase 6: Documentation

- [ ] **Update CLAUDE.md** with new project context
- [ ] **Update README.md** with setup instructions
- [ ] **Update this migration guide** with lessons learned

---

## Troubleshooting

### Issue: AI Agent Returns "No results found"

1. Check database connection in logs
2. Verify schema cache loaded correctly
3. Check column names match SQL queries

### Issue: Wrong Database Connection

1. Check `echo $DATABASE_URL` in terminal
2. Verify project-specific env var is set
3. Restart development server

### Issue: Schema Cache Not Loading

1. Verify database is running
2. Check credentials are correct
3. Run schema SQL manually to verify

---

## Contact

For questions about this migration process, refer to:
- [CLAUDE.md](../CLAUDE.md) - Project-specific instructions
- [DATABASE_MANAGEMENT.md](./DATABASE_MANAGEMENT.md) - Database operations
- [SQL_AGENT_ARCHITECTURE.md](./SQL_AGENT_ARCHITECTURE.md) - AI agent details

---

*This document should be updated after each enterprise migration with new lessons learned.*
