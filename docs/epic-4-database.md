# Epic 4: PostgreSQL Database & Seed Data

**Status**: ✅ Complete
**Completed**: December 2, 2024

## Overview

This epic establishes a PostgreSQL database (running in Docker) with brewery-specific schema, generates 12 months of realistic seed data, and **connects the Barley AI quick questions to actual SQL queries** that fetch real data from the database.

## Implementation Summary

### Database Technology
- **Engine**: PostgreSQL 16 (via Docker)
- **Container**: `sleeman-brewmind-db`
- **Port**: 5433 (mapped to avoid conflicts)
- **Database**: `brewmind`
- **User**: `brewmind`

### Key Files Created

| File | Purpose |
|------|---------|
| `docker-compose.yml` | PostgreSQL container configuration |
| `src/lib/db/init/01-schema.sql` | Database schema (15 tables) |
| `src/lib/db/init/02-seed-data.sql` | 12 months of seed data |
| `src/lib/db/connection.ts` | PostgreSQL connection pool utility |
| `src/lib/db/brewery-queries.ts` | 23 predefined SQL queries |
| `src/app/api/sql-agent/route.ts` | API route for query execution |
| `src/app/api/brewery/query/route.ts` | Alternative brewery query endpoint |

## Stories Completed

### Story 4.1: Database Schema Design ✅

Created PostgreSQL schema with 15 tables:

**Production Tables**:
- `beer_styles` - 8 Sleeman beer styles
- `production_lines` - 5 lines (Guelph + Vernon)
- `production_batches` - Production batch records
- `quality_tests` - Quality test results
- `quality_issues` - Issue tracking

**Inventory Tables**:
- `suppliers` - 10 suppliers
- `raw_materials` - 14 materials
- `material_usage` - Material consumption

**Equipment Tables**:
- `equipment` - 15 pieces of equipment
- `equipment_downtime` - Downtime events

**Distribution Tables**:
- `distributors` - 14 distributors (LCBO, BC Liquor, etc.)
- `shipments` - Shipment records
- `products` - 15 SKUs
- `monthly_revenue` - Revenue by product/month

**Compliance Tables**:
- `compliance_audits` - Audit records

### Story 4.2: Seed Data Generation ✅

Generated data relative to current date (always fresh for demos):

| Entity | Count | Details |
|--------|-------|---------|
| Beer Styles | 8 | Full Sleeman portfolio |
| Production Lines | 5 | Guelph (3) + Vernon (2) |
| Production Batches | 504 | ~42/month for 12 months |
| Quality Tests | 2,910 | 6 test types per batch |
| Quality Issues | ~50 | Random issues with resolution |
| Suppliers | 10 | Malt, Hops, Yeast, Packaging |
| Raw Materials | 14 | With reorder levels |
| Equipment | 15 | Fermenters, tanks, lines |
| Distributors | 14 | National + Regional |
| Products | 15 | Various package formats |
| Monthly Revenue | 180 | 12 months × 15 products |

### Story 4.3: Quick Question SQL Query Mapping ✅

Created 23 predefined queries mapped to natural language:

**Production & Operations**:
- `production_volume_by_style` - Volume by beer style over 12 months
- `fermentation_efficiency_by_line` - Efficiency across production lines
- `production_line_downtime` - Downtime events and cost impact
- `monthly_production_trends` - Monthly trends and statistics
- `todays_production_summary` - Current day status

**Quality Control**:
- `quality_issues_by_batch` - Issues with batch details
- `batch_failure_rates` - Failure rates by beer style
- `quality_test_variance` - Test variance from expected
- `common_quality_issues` - Most common issues
- `highest_quality_batches` - Top quality batches

**Inventory & Supply Chain**:
- `material_usage_trends` - Material usage and costs
- `supplier_reliability` - Supplier performance
- `inventory_reorder_alerts` - Below reorder level

**Distributors & Revenue**:
- `top_distributors` - Top distributors by revenue
- `top_products_by_revenue` - Best selling products
- `revenue_by_product_category` - Revenue by category
- `seasonal_demand_patterns` - Seasonal patterns
- `profitable_product_lines` - Profit margins

**Equipment & Capacity**:
- `capacity_utilization` - Production line utilization
- `equipment_performance` - Equipment metrics
- `cost_per_hectoliter` - Production costs
- `waste_rates_by_line` - Waste analysis
- `avg_fermentation_by_style` - Fermentation times

### Story 4.4: Query Execution Service ✅

**File**: `src/lib/db/brewery-queries.ts`

Features:
- Type-safe query execution
- Automatic column detection
- Execution time tracking
- Natural language to query mapping
- Follow-up question suggestions

### Story 4.5: API Route Integration ✅

**Endpoint**: `POST /api/sql-agent`

Request:
```json
{
  "question": "What is our production volume by beer style?"
}
```

Response:
```json
{
  "success": true,
  "query": "SELECT ...",
  "results": [...],
  "rowCount": 96,
  "queryTime": 6,
  "followUpQuestions": [...]
}
```

## Quick Start

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify database
docker exec sleeman-brewmind-db psql -U brewmind -d brewmind -c "SELECT COUNT(*) FROM production_batches;"

# Start dev server
pnpm run dev

# Test API
curl http://localhost:3000/api/sql-agent
```

## Query Flow

```
User clicks Quick Question in Barley chat
        ↓
SQL Analytics Chat sends POST to /api/sql-agent
        ↓
mapQuestionToQuery() finds matching query key
        ↓
executeBreweryQuery() runs PostgreSQL query
        ↓
Results returned with:
  - SQL query used
  - Data rows
  - Row count
  - Execution time
  - Follow-up suggestions
        ↓
Chat displays results with:
  - Summary message
  - Data table
  - Bar chart (if chartable)
  - "Show SQL" toggle
```

## Success Criteria

- [x] PostgreSQL database running in Docker
- [x] 15 tables with proper relationships
- [x] 12 months of realistic seed data (relative to current date)
- [x] 23 quick questions mapped to SQL queries
- [x] Query service executes queries safely
- [x] API routes return formatted results
- [x] Barley displays query results in chat interface
- [x] SQL queries visible in expandable view
- [x] Results render as tables and charts
- [x] Follow-up questions suggested

## Next Epic

**Epic 5: Dashboard Pages** - Create production, quality, inventory, and equipment dashboard pages with KPI cards and visualizations.

---

*Epic 4 completed December 2, 2024*
