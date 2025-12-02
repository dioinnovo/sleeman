# Sleeman Breweries BrewMind Demo Migration

## Overview

This document tracks the migration of the Ship Sticks application to the Sleeman Breweries BrewMind AI Data Analyst demo platform.

**Target Audience**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries
**Demo Purpose**: Showcase AI-powered brewery operations intelligence using Text-to-SQL and natural language analytics

## Migration Status

| Epic | Name | Status | Stories | Documentation |
|------|------|--------|---------|---------------|
| 1 | Foundation & Brand Identity | ✅ Complete | 5/5 | [epic-1-foundation.md](./epic-1-foundation.md) |
| 2 | Navigation & Layout | ✅ Complete | 4/4 | [epic-2-navigation.md](./epic-2-navigation.md) |
| 3 | AI Assistant (Barley) | ✅ Complete | 4/4 | [epic-3-ai-assistant.md](./epic-3-ai-assistant.md) |
| 4 | SQLite Database & Seed Data | 🔄 In Progress | 0/5 | [epic-4-database.md](./epic-4-database.md) |
| 5 | Dashboard Pages | 🔄 Pending | 0/6 | - |
| 6 | API Routes | 🔄 Pending | 0/5 | - |
| 7 | Analytics & Reports | 🔄 Pending | 0/4 | - |
| 8 | Marketing & Demo Pages | 🔄 Pending | 0/4 | - |
| 9 | Documentation & Testing | 🔄 Pending | 0/4 | - |
| 10 | Polish & Launch Ready | 🔄 Pending | 0/3 | - |

## Key Decisions

### AI Assistant
- **Name**: Barley
- **Persona**: AI data analyst specializing in brewery operations intelligence
- **Capabilities**: Text-to-SQL queries, production analytics, quality monitoring

### Theme
- **Style**: Dark brewery aesthetic inspired by Sleeman's brand
- **Primary**: #1C1812 (dark charcoal)
- **Secondary**: #D4A84B (amber/gold)
- **Accent**: #1863DC (blue)

### Database
- **Engine**: SQLite (local, portable for demos)
- **Schema**: Brewery operations (production, quality, inventory, equipment, compliance)
- **Seed Data**: 12 months of realistic brewery data

## Architecture

```
sleeman/
├── app/
│   ├── (auth)/           # Authentication flows
│   ├── dashboard/        # Protected dashboard routes
│   │   ├── assistant/    # Barley AI interface
│   │   ├── production/   # Production monitoring
│   │   ├── quality/      # Quality control
│   │   ├── inventory/    # Inventory management
│   │   └── reports/      # Analytics & reports
│   ├── api/              # API routes
│   └── demo/             # Demo landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   └── barley/           # AI assistant components
├── lib/
│   ├── ai/               # AI/LLM integrations
│   ├── db/               # SQLite database
│   └── constants/        # Brand, colors, config
└── public/               # Static assets (logos)
```

## Migration Checklist

### Completed
- [x] Brand constants updated (SLEEMAN_BRAND)
- [x] Color palette defined (amber/gold theme)
- [x] Logo assets added (sleeman-logo.png variants)
- [x] Tailwind configuration updated
- [x] CSS variables configured for dark theme
- [x] Sidebar navigation transformed
- [x] Mobile navigation updated
- [x] Dashboard layout with dark theme
- [x] Header components themed
- [x] Siri Orb with amber/gold colors
- [x] Mobile chat interface (Barley)
- [x] Virtual assistant component
- [x] SQL analytics chat interface

### In Progress
- [ ] SQLite database schema
- [ ] Quick question → SQL query mapping
- [ ] Query execution service

### Pending
- [ ] Seed data generation (12 months)
- [ ] Dashboard pages
- [ ] API routes
- [ ] Marketing pages
- [ ] Testing & polish

## Running the Demo

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access at http://localhost:3000
```

## Demo Script Outline

1. **Landing Page**: Introduce BrewMind AI platform
2. **Dashboard Overview**: Show brewery KPIs at a glance
3. **Barley AI Assistant**: Demonstrate natural language queries
4. **Production Analytics**: Deep dive into brewing metrics
5. **Quality Control**: Showcase quality monitoring
6. **Reports**: Generate executive summaries

---

*Last Updated: December 2, 2024*
