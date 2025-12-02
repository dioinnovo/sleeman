# Sleeman Breweries Demo Migration Plan

## Ship Sticks → BrewMind Transformation

**Version**: 2.0
**Created**: December 2025
**Target Demo**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries
**Key Persona**: Jennifer, Supply Chain Director - 8-day → 1-day transformation

---

## Executive Summary

This document outlines the systematic migration of the Ship Sticks golf shipping application to BrewMind - an AI-powered data analytics platform for Sleeman Breweries. The migration preserves the existing Text-to-SQL AI agent, dashboard infrastructure, and component architecture while completely rebranding for the brewery domain.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme | Dark brewery theme | Matches Sleeman website aesthetic (#1C1812 dark, amber/gold accents) |
| AI Name | Barley | Witty, friendly name following pattern (Stella for Stellar, Scott for SCC). Barley is the key brewing ingredient. |
| Database | PostgreSQL with comprehensive seed data | Realistic demo requires real queries against actual data |
| Scope | ALL features (must-have + nice-to-have) | Complete demo showcasing full platform capabilities |

## Documentation Requirements

**CRITICAL**: After each Epic is completed:
1. Create comprehensive documentation of what was built
2. Document technical architecture decisions
3. Update docs/demo-migration.md with completion status
4. Review and verify before proceeding to next Epic

---

## Epic Structure Overview

| Epic | Name | Priority | Status | Estimated Effort |
|------|------|----------|--------|------------------|
| 1 | Foundation & Brand Identity | 🔴 Critical | ✅ Complete | 4-6 hours |
| 2 | Navigation & Layout | 🔴 Critical | ✅ Complete | 3-4 hours |
| 3 | AI Assistant (Barley) | 🔴 Critical | ✅ Complete | 6-8 hours |
| 4 | Database Schema & Seed Data | 🔴 Critical | ✅ Complete | 8-10 hours |
| 5 | Dashboard Pages (Must-Have) | 🔴 Critical | 🔄 In Progress | 6-8 hours |
| 6 | Dashboard Pages (Nice-to-Have) | 🟡 High | ⏳ Pending | 4-6 hours |
| 7 | API Routes & Backend | 🟢 Medium | ⏳ Pending | 4-5 hours |
| 8 | Marketing & Demo Pages | 🟢 Medium | ⏳ Pending | 3-4 hours |
| 9 | Documentation & Cleanup | 🟢 Medium | 🔄 In Progress | 2-3 hours |
| 10 | Demo Testing & Polish | 🔴 Critical | ⏳ Pending | 3-4 hours |

**Total Estimated Effort**: 43-58 hours

---

## Epic 1: Foundation & Brand Identity ✅ COMPLETE

**Documentation**: [epic-1-foundation.md](./epic-1-foundation.md)

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 1.1 | Create SLEEMAN_BRAND configuration in `src/lib/constants/brand.ts` | ✅ |
| 1.2 | Update color palette in `src/lib/constants/colors.ts` | ✅ |
| 1.3 | Add Sleeman logo assets to `public/` | ✅ |
| 1.4 | Update Tailwind configuration with sleeman colors | ✅ |
| 1.5 | Update CSS variables in `globals.css` | ✅ |

### Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Sleeman Dark | #1C1812 | `--sleeman-dark` | Backgrounds |
| Sleeman Gold | #D4A84B | `--sleeman-gold` | Primary accent |
| Sleeman Gold Light | #E8C76A | `--sleeman-gold-light` | Hover states |
| Sleeman Gold Dark | #8B6914 | `--sleeman-gold-dark` | Deep accents |
| Sleeman Blue | #1863DC | `--sleeman-blue` | Secondary accent |
| Sleeman Brown | #2C2416 | `--sleeman-brown` | Cards, borders |

---

## Epic 2: Navigation & Layout ✅ COMPLETE

**Documentation**: [epic-2-navigation.md](./epic-2-navigation.md)

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 2.1 | Transform Sidebar with Sleeman branding and brewery menu items | ✅ |
| 2.2 | Update MobileBottomNav with matching theme | ✅ |
| 2.3 | Update Dashboard Layout with dark brewery theme | ✅ |
| 2.4 | Transform page-header and section-header components | ✅ |

### Sidebar Menu Structure

| Menu Item | Icon | Route | Description |
|-----------|------|-------|-------------|
| Dashboard | LayoutDashboard | /dashboard | Brewery Overview |
| Barley | Brain | /dashboard/assistant | AI Data Analyst |
| Quality Control | ShieldCheck | /dashboard/compliance | Brewing Standards |
| Distribution | Truck | /dashboard/distribution | Shipments & Logistics |
| Reports | FileText | /dashboard/reports | Brewery Reports |
| Integrations | Settings | /dashboard/integrations | System Connections |

---

## Epic 3: AI Assistant (Barley) ✅ COMPLETE

**Documentation**: [epic-3-ai-assistant.md](./epic-3-ai-assistant.md)

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 3.1 | Update mobile-chat-interface.tsx with Barley branding | ✅ |
| 3.2 | Transform siri-orb.tsx to amber/gold color scheme | ✅ |
| 3.3 | Update virtual-assistant.tsx with brewery context | ✅ |
| 3.4 | Transform sql-analytics-chat.tsx for BrewMind | ✅ |
| 3.5 | Fix API response mapping for SQL analytics | ✅ |

### Barley AI Identity

- **Name**: Barley
- **Tagline**: "BrewMind AI - Intelligent Brewery Analytics"
- **Persona**: Friendly, knowledgeable brewery data analyst
- **Focus Areas**: Production, Quality, Inventory, Distribution

### Quick Question Categories

1. **Production & Operations**
   - Production volume by beer style
   - Fermentation efficiency by line
   - Monthly production trends

2. **Quality Control**
   - Batch failure rates
   - Quality test variance
   - Common quality issues

3. **Inventory & Supply Chain**
   - Material usage trends
   - Supplier reliability scores
   - Inventory reorder alerts

4. **Strategic Planning**
   - Top distributors by revenue
   - Capacity utilization
   - Cost per hectoliter

---

## Epic 4: Database Schema & Seed Data ✅ COMPLETE

**Documentation**: [epic-4-database.md](./epic-4-database.md)

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 4.1 | Create PostgreSQL schema with 15 brewery tables | ✅ |
| 4.2 | Generate 12 months of realistic seed data | ✅ |
| 4.3 | Map quick questions to SQL queries (23 queries) | ✅ |
| 4.4 | Create query execution service | ✅ |
| 4.5 | Integrate with API routes | ✅ |

### Database Schema

**Production Tables**:
- `beer_styles` - 8 Sleeman beer styles
- `production_lines` - 5 lines (Guelph + Vernon)
- `production_batches` - ~500 batch records
- `quality_tests` - ~3000 test results
- `quality_issues` - Issue tracking

**Inventory Tables**:
- `suppliers` - 10 suppliers
- `raw_materials` - 14 materials
- `material_usage` - Consumption tracking

**Equipment Tables**:
- `equipment` - 15 pieces
- `equipment_downtime` - Downtime events

**Distribution Tables**:
- `distributors` - 14 distributors
- `shipments` - Shipment records
- `products` - 15 SKUs
- `monthly_revenue` - Revenue by product/month

**Compliance Tables**:
- `compliance_audits` - Audit records

### Docker Configuration

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    container_name: sleeman-brewmind-db
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: brewmind
      POSTGRES_PASSWORD: brewmind_demo_2024
      POSTGRES_DB: brewmind
```

---

## Epic 5: Dashboard Pages (Must-Have) 🔄 IN PROGRESS

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 5.1 | Main Dashboard with brewery KPI cards | 🔄 Partial |
| 5.2 | Quality Control page (/dashboard/compliance) | ✅ Complete |
| 5.3 | Distribution page (/dashboard/distribution) | ⏳ Pending |
| 5.4 | Reports page with brewery reports | ⏳ Pending |
| 5.5 | Integrations page | ⏳ Pending |
| 5.6 | Barley AI Assistant page | ✅ Complete |

### Story 5.1: Main Dashboard

**KPI Cards Required**:
- Total Production Volume (hectoliters)
- Quality Pass Rate (%)
- Equipment Utilization (%)
- Revenue MTD ($)
- Active Production Lines
- Pending Quality Issues

**Charts**:
- Production volume by month (12 months)
- Quality metrics trend
- Beer style distribution

### Story 5.2: Quality Control Page ✅

**File**: `src/app/dashboard/compliance/page.tsx`

**Sections**:
- Overview metrics cards
- Recent quality audits table
- Fermentation standards
- Ingredient quality control
- HACCP compliance tracking
- LCBO regulatory compliance
- Training modules

### Story 5.3: Distribution Page ⏳

**File**: `src/app/dashboard/distribution/page.tsx`

**Required Sections**:
- Distribution overview KPIs
- Top distributors table
- Shipment tracking
- Delivery performance metrics
- Regional distribution map
- Revenue by distributor

### Story 5.4: Reports Page ⏳

**File**: `src/app/dashboard/reports/page.tsx`

**Required Reports**:
- Production summary reports
- Quality control reports
- Financial reports
- Compliance reports
- Export functionality (PDF/Excel)

### Story 5.5: Integrations Page ⏳

**File**: `src/app/dashboard/integrations/page.tsx`

**Required Integrations**:
- Oracle ERP connection status
- PlantPAx DCS integration
- Workday HR integration
- Data sync status

---

## Epic 6: Dashboard Pages (Nice-to-Have) ⏳ PENDING

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 6.1 | Equipment Maintenance dashboard | ⏳ Pending |
| 6.2 | Inventory Management page | ⏳ Pending |
| 6.3 | Production Scheduling page | ⏳ Pending |
| 6.4 | Supplier Management page | ⏳ Pending |

---

## Epic 7: API Routes & Backend ⏳ PENDING

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 7.1 | Create /api/brewery/production endpoint | ⏳ Pending |
| 7.2 | Create /api/brewery/quality endpoint | ⏳ Pending |
| 7.3 | Create /api/brewery/inventory endpoint | ⏳ Pending |
| 7.4 | Create /api/brewery/distribution endpoint | ⏳ Pending |
| 7.5 | Create /api/brewery/reports endpoint | ⏳ Pending |

### Existing API Routes

| Route | Method | Description | Status |
|-------|--------|-------------|--------|
| /api/sql-agent | POST | Natural language SQL queries | ✅ Working |
| /api/sql-agent | GET | Health check | ✅ Working |
| /api/brewery/query | POST | Direct brewery queries | ✅ Working |

---

## Epic 8: Marketing & Demo Pages ⏳ PENDING

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 8.1 | Update landing page (/) with Sleeman branding | ⏳ Pending |
| 8.2 | Create demo page (/demo) | ⏳ Pending |
| 8.3 | Update favicon and meta tags | ✅ Complete |
| 8.4 | Create demo script documentation | ⏳ Pending |

---

## Epic 9: Documentation & Cleanup 🔄 IN PROGRESS

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 9.1 | Remove all Ship Sticks specific files | ✅ Complete |
| 9.2 | Update README.md for Sleeman | ⏳ Pending |
| 9.3 | Update CLAUDE.md for new context | ⏳ Pending |
| 9.4 | Create migration status documentation | ✅ Complete |
| 9.5 | Create complete epic documentation | 🔄 In Progress |

### Files Removed

- All `docs/` Ship Sticks documentation (40+ files)
- `src/app/dashboard/care-sessions/**`
- `src/app/dashboard/claims/**`
- `src/app/dashboard/referrals/**`
- `src/app/dashboard/shipments/**`
- `src/app/(admin)/**`
- `src/lib/ai/mock-shipment-data.ts`
- `src/lib/shipment/insurance-calculator.ts`
- And many more...

---

## Epic 10: Demo Testing & Polish ⏳ PENDING

### Stories

| Story | Description | Status |
|-------|-------------|--------|
| 10.1 | End-to-end testing of all pages | ⏳ Pending |
| 10.2 | Test all SQL queries return valid data | ⏳ Pending |
| 10.3 | Mobile responsiveness testing | ⏳ Pending |
| 10.4 | Performance optimization | ⏳ Pending |
| 10.5 | Create demo walkthrough script | ⏳ Pending |

### Demo Script Outline

1. **Landing Page** (2 min)
   - Introduce BrewMind AI platform
   - Highlight key capabilities

2. **Dashboard Overview** (3 min)
   - Show brewery KPIs at a glance
   - Explain real-time data integration

3. **Barley AI Assistant** (10 min)
   - Demonstrate natural language queries
   - Show production volume analysis
   - Quality control queries
   - Revenue and distribution insights

4. **Quality Control** (5 min)
   - Show compliance monitoring
   - Demonstrate audit tracking

5. **Distribution** (5 min)
   - Top distributors analysis
   - Shipment tracking

6. **Reports** (3 min)
   - Generate executive summary
   - Export capabilities

---

## Progress Summary

| Category | Completed | Remaining | % Complete |
|----------|-----------|-----------|------------|
| Epics | 4 | 6 | 40% |
| Stories (Critical) | 18 | 12 | 60% |
| Stories (All) | 22 | 24 | 48% |
| Documentation | 5 | 5 | 50% |

## Immediate Next Steps

1. **Create Distribution Page** (`/dashboard/distribution/page.tsx`)
2. **Push to GitHub** (authenticate with Diostack account)
3. **Update Reports Page** with brewery content
4. **Update Integrations Page** with brewery integrations
5. **Create Epic 5 & 6 documentation**

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BREWMIND PLATFORM                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Next.js   │  │   React     │  │   Tailwind CSS      │  │
│  │   16.0.3    │  │   18.2      │  │   + shadcn/ui       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              BARLEY AI (Text-to-SQL Agent)              ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ││
│  │  │ Azure OpenAI │  │  LangChain   │  │   Insights   │  ││
│  │  │  GPT-4o-mini │  │  SQL Agent   │  │  Generator   │  ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘  ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  PostgreSQL Database                     ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   ││
│  │  │Production│ │ Quality  │ │Inventory │ │Distribtn │   ││
│  │  │  Tables  │ │  Tables  │ │  Tables  │ │  Tables  │   ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

*Last Updated: December 2, 2024*
