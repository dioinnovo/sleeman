# Sleeman Breweries BrewMind Demo Migration

## Ship Sticks → BrewMind Transformation

**Version**: 2.0
**Target Demo**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries
**Key Persona**: Jennifer, Supply Chain Director - 8-day → 1-day transformation

---

## Executive Summary

This document tracks the migration of the Ship Sticks application to the Sleeman Breweries BrewMind AI Data Analyst demo platform. See [COMPLETE_MIGRATION_PLAN.md](./COMPLETE_MIGRATION_PLAN.md) for full epic details.

---

## Migration Status

| Epic | Name | Priority | Status | Stories | Documentation |
|------|------|----------|--------|---------|---------------|
| 1 | Foundation & Brand Identity | 🔴 Critical | ✅ Complete | 5/5 | [epic-1-foundation.md](./epic-1-foundation.md) |
| 2 | Navigation & Layout | 🔴 Critical | ✅ Complete | 4/4 | [epic-2-navigation.md](./epic-2-navigation.md) |
| 3 | AI Assistant (Barley) | 🔴 Critical | ✅ Complete | 5/5 | [epic-3-ai-assistant.md](./epic-3-ai-assistant.md) |
| 4 | Database Schema & Seed Data | 🔴 Critical | ✅ Complete | 5/5 | [epic-4-database.md](./epic-4-database.md) |
| 5 | Dashboard Pages (Must-Have) | 🔴 Critical | 🔄 In Progress | 2/6 | [epic-5-dashboards.md](./epic-5-dashboards.md) |
| 6 | Dashboard Pages (Nice-to-Have) | 🟡 High | ⏳ Pending | 0/4 | - |
| 7 | API Routes & Backend | 🟢 Medium | ⏳ Pending | 2/5 | - |
| 8 | Marketing & Demo Pages | 🟢 Medium | 🔄 Partial | 1/4 | - |
| 9 | Documentation & Cleanup | 🟢 Medium | 🔄 In Progress | 3/5 | - |
| 10 | Demo Testing & Polish | 🔴 Critical | ⏳ Pending | 0/5 | - |

**Overall Progress**: 27/48 stories complete (56%)

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme | Dark brewery theme | Matches Sleeman website aesthetic (#1C1812 dark, amber/gold accents) |
| AI Name | Barley | Witty, friendly name. Barley is the key brewing ingredient. |
| Database | PostgreSQL + Docker | Realistic demo requires real queries against actual data |
| Scope | ALL features | Complete demo showcasing full platform capabilities |

---

## Current Sprint Focus

### Epic 5: Dashboard Pages - In Progress

| Story | Description | Status |
|-------|-------------|--------|
| 5.1 | Main Dashboard with KPI cards | 🔄 Partial |
| 5.2 | Quality Control page | ✅ Complete |
| 5.3 | Distribution page | ⏳ Pending |
| 5.4 | Reports page | ⏳ Pending |
| 5.5 | Integrations page | ⏳ Pending |
| 5.6 | Barley AI Assistant page | ✅ Complete |

---

## Architecture

```
sleeman/
├── app/
│   ├── (auth)/              # Authentication flows
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── assistant/       # Barley AI interface ✅
│   │   ├── compliance/      # Quality Control ✅
│   │   ├── distribution/    # Distribution ⏳
│   │   ├── reports/         # Reports ⏳
│   │   └── integrations/    # Integrations ⏳
│   ├── api/                 # API routes
│   │   ├── sql-agent/       # Text-to-SQL endpoint ✅
│   │   └── brewery/         # Brewery data endpoints ✅
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── Sidebar.tsx          # Navigation ✅
│   └── MobileBottomNav.tsx  # Mobile nav ✅
├── lib/
│   ├── ai/                  # AI/LLM integrations ✅
│   ├── db/                  # PostgreSQL database ✅
│   └── constants/           # Brand, colors ✅
└── public/                  # Static assets (logos) ✅
```

---

## Database Schema

**15 Tables across 5 domains:**

| Domain | Tables | Status |
|--------|--------|--------|
| Production | beer_styles, production_lines, production_batches | ✅ |
| Quality | quality_tests, quality_issues | ✅ |
| Inventory | suppliers, raw_materials, material_usage | ✅ |
| Equipment | equipment, equipment_downtime | ✅ |
| Distribution | distributors, shipments, products, monthly_revenue | ✅ |
| Compliance | compliance_audits | ✅ |

---

## Running the Demo

```bash
# 1. Start PostgreSQL database
docker-compose up -d

# 2. Verify database
docker ps | grep sleeman-brewmind-db

# 3. Set environment
export DATABASE_URL="postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind"

# 4. Start dev server
pnpm run dev

# 5. Access at http://localhost:3000/dashboard/assistant
```

---

## Remaining Work

### High Priority (Demo Critical)

1. **Create Distribution Page** - `/dashboard/distribution`
   - Top distributors table
   - Shipment tracking
   - Delivery metrics

2. **Update Reports Page** - `/dashboard/reports`
   - Production reports
   - Quality reports
   - Export functionality

3. **Push to GitHub** - `https://github.com/Diostack/sleeman`
   - Authenticate with Diostack account
   - Push all changes

### Medium Priority

4. **Update Integrations Page**
5. **Main Dashboard KPIs**
6. **Landing Page Updates**

### Low Priority

7. Epic 6: Nice-to-have dashboards
8. Epic 7: Additional API routes
9. Epic 10: Final polish

---

## Demo Script Outline

| Section | Duration | Content |
|---------|----------|---------|
| Landing | 2 min | Introduce BrewMind AI platform |
| Dashboard | 3 min | Show brewery KPIs at a glance |
| Barley AI | 10 min | Natural language queries demo |
| Quality | 5 min | Compliance monitoring |
| Distribution | 5 min | Distributor analytics |
| Reports | 3 min | Executive summaries |
| **Total** | **28 min** | |

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.0.3 + Turbopack |
| UI | React 18, Tailwind CSS, shadcn/ui |
| Database | PostgreSQL 16 (Docker) |
| AI | Azure OpenAI GPT-4o-mini + LangChain |
| Charts | Recharts |
| Markdown | react-markdown + remark-gfm |

---

*Last Updated: December 2, 2024*
