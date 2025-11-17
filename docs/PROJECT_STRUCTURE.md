# Project Structure Framework

This document explains the architectural decisions and structure of the Ship Sticks Intelligence Platform, serving as a framework for maintaining consistency and best practices across all future development.

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Design Principles](#design-principles)
4. [Routing Architecture](#routing-architecture)
5. [Component Organization](#component-organization)
6. [Configuration Standards](#configuration-standards)
7. [Best Practices](#best-practices)
8. [Migration History](#migration-history)

---

## Overview

The Ship Sticks Intelligence Platform follows **Next.js 15 App Router conventions** with the **src/ directory pattern**. This structure provides:

- ✅ Clear separation between application code and configuration
- ✅ Scalable organization for growing codebases
- ✅ Type-safe imports with path aliases
- ✅ Feature-based component colocation
- ✅ Industry-standard conventions

**Key Technologies:**
- Next.js 15.5.6 with App Router
- TypeScript with strict mode
- Tailwind CSS 3.4
- React 19.2
- shadcn/ui component library
- pnpm 9.15.0 package manager

---

## Directory Structure

```
shipsticks/
├── src/                          # Application source code
│   ├── app/                      # Next.js App Router
│   │   ├── (admin)/             # Admin-only routes (route group)
│   │   │   ├── admin/           # → /admin
│   │   │   │   └── claims-center/ # → /admin/claims-center
│   │   │   ├── error.tsx        # Admin error boundary
│   │   │   └── loading.tsx      # Admin loading state
│   │   │
│   │   ├── (marketing)/         # Public marketing pages (route group)
│   │   │   ├── demo/            # → /demo
│   │   │   ├── page.tsx         # → / (landing page)
│   │   │   ├── error.tsx        # Marketing error boundary
│   │   │   └── loading.tsx      # Marketing loading state
│   │   │
│   │   ├── dashboard/           # Authenticated user area
│   │   │   ├── _components/     # Dashboard-specific components
│   │   │   │   ├── assistant/   # AI assistant components
│   │   │   │   ├── care-coordination/ # Care plan components
│   │   │   │   ├── patient/     # Patient card components
│   │   │   │   ├── shipment/    # Shipment form components
│   │   │   │   ├── mobile-chat-interface.tsx
│   │   │   │   ├── sql-analytics-chat.tsx
│   │   │   │   ├── virtual-assistant.tsx
│   │   │   │   └── voice-debug-panel.tsx
│   │   │   │
│   │   │   ├── analytics/       # → /dashboard/analytics
│   │   │   ├── assistant/       # → /dashboard/assistant
│   │   │   ├── care-coordination/ # → /dashboard/care-coordination
│   │   │   ├── care-sessions/   # → /dashboard/care-sessions
│   │   │   ├── claims/          # → /dashboard/claims
│   │   │   ├── compliance/      # → /dashboard/compliance
│   │   │   ├── integrations/    # → /dashboard/integrations
│   │   │   ├── patients/        # → /dashboard/patients
│   │   │   ├── referrals/       # → /dashboard/referrals
│   │   │   ├── reports/         # → /dashboard/reports
│   │   │   ├── shipments/       # → /dashboard/shipments
│   │   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   │   └── page.tsx         # → /dashboard (overview)
│   │   │
│   │   ├── _dev/                # Development/testing pages (not routable)
│   │   │   ├── claim-assessment/
│   │   │   ├── inspection/
│   │   │   ├── presentation-test/
│   │   │   ├── prompt-demo/
│   │   │   ├── test-sources/
│   │   │   └── tinder-swipe-demo/
│   │   │
│   │   ├── api/                 # API routes
│   │   │   ├── admin/           # Admin API endpoints
│   │   │   ├── assistant/       # AI assistant endpoints
│   │   │   ├── chat/            # Chat endpoints
│   │   │   ├── claims/          # Claims processing
│   │   │   ├── enrichment/      # Data enrichment
│   │   │   ├── graphrag/        # Graph RAG queries
│   │   │   ├── orchestrate/     # Workflow orchestration
│   │   │   ├── realtime/        # Real-time WebSocket
│   │   │   ├── scotty-claims/   # Scotty claims agent
│   │   │   ├── scotty-leads/    # Scotty leads agent
│   │   │   └── sql-agent/       # SQL analytics agent
│   │   │
│   │   ├── error.tsx            # Global error boundary
│   │   ├── not-found.tsx        # Custom 404 page
│   │   ├── loading.tsx          # Global loading state
│   │   ├── layout.tsx           # Root layout
│   │   ├── favicon.ico          # Site favicon
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # Global shared components
│   │   ├── ui/                  # shadcn/ui primitives
│   │   │   ├── ai-processing-overlay.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── care-assessment-carousel.tsx
│   │   │   ├── chatgpt-prompt-input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── file-upload-modal.tsx
│   │   │   ├── input.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── property-area-swipe.tsx
│   │   │   ├── section-header.tsx
│   │   │   ├── simple-markdown-message.tsx
│   │   │   ├── siri-orb.tsx
│   │   │   ├── sources-modal.tsx
│   │   │   ├── sources-section.tsx
│   │   │   ├── tinder-like-swipe.tsx
│   │   │   └── typewriter-message.tsx
│   │   │
│   │   ├── AddressAutocomplete.tsx  # Google Maps autocomplete
│   │   ├── DisableGrammarly.tsx     # Grammarly disabler
│   │   ├── MobileBottomNav.tsx      # Mobile navigation
│   │   ├── Sidebar.tsx              # Dashboard sidebar
│   │   └── roi-calculator.tsx       # ROI calculator widget
│   │
│   ├── lib/                     # Utilities and business logic
│   │   ├── ai/                  # AI service integrations
│   │   │   ├── prompts/         # AI prompts
│   │   │   ├── providers/       # AI provider configs
│   │   │   ├── utils/           # AI utilities
│   │   │   ├── arthur-quick-responses.ts
│   │   │   ├── business-intelligence.ts
│   │   │   ├── chart-generator.ts
│   │   │   ├── health-policy-analysis.ts
│   │   │   ├── insights-generator.ts
│   │   │   ├── langchain-config.ts
│   │   │   ├── mock-*.ts        # Mock data generators
│   │   │   ├── query-classifier.ts
│   │   │   ├── sql-agent.ts
│   │   │   ├── sql-tools.ts
│   │   │   ├── system-prompts.ts
│   │   │   └── web-search.ts
│   │   │
│   │   ├── agents/              # AI agent orchestration
│   │   │   ├── analytics.ts
│   │   │   ├── conversation*.ts
│   │   │   ├── extraction.ts
│   │   │   ├── notification.ts
│   │   │   ├── nurture.ts
│   │   │   ├── qualification.ts
│   │   │   ├── recommendation.ts
│   │   │   └── scheduling.ts
│   │   │
│   │   ├── orchestrator/        # Workflow orchestration
│   │   │   ├── api/             # API graph definitions
│   │   │   ├── enhanced-master.ts
│   │   │   ├── master.ts
│   │   │   ├── monitoring.ts
│   │   │   ├── state.ts
│   │   │   └── workflow-enforcer.ts
│   │   │
│   │   ├── graphrag/            # Graph RAG implementation
│   │   │   ├── document-entity-extractor.ts
│   │   │   ├── gap-detector.ts
│   │   │   ├── healthcare-schema.ts
│   │   │   ├── neo4j-client.ts
│   │   │   ├── quality-tester.ts
│   │   │   ├── schema-discovery-agent.ts
│   │   │   ├── synapse-schema-reader.ts
│   │   │   └── text2cypher.ts
│   │   │
│   │   ├── email/               # Email generation
│   │   ├── gcs/                 # Google Cloud Storage
│   │   ├── pdf/                 # PDF generation
│   │   ├── realtime/            # Real-time audio processing
│   │   ├── voice/               # Voice integration
│   │   ├── shipment/            # Shipment utilities
│   │   ├── constants/           # App constants
│   │   ├── data/                # Mock/sample data
│   │   ├── hooks/               # Library hooks
│   │   ├── knowledge/           # Knowledge base
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── utils.ts             # Core utilities
│   │   ├── db.ts                # Database client
│   │   └── graphrag.ts          # Graph RAG utilities
│   │
│   ├── contexts/                # React context providers
│   │   ├── SidebarContext.tsx   # Sidebar state
│   │   └── theme-provider.tsx   # Dark mode provider
│   │
│   └── hooks/                   # Custom React hooks
│       └── useRealtimeVoice.ts  # Real-time voice hook
│
├── public/                      # Static assets
│   └── images/                  # Images served at /images/*
│
├── docs/                        # Documentation
│   ├── backups/                 # Configuration backups
│   ├── sow/                     # Statements of work
│   ├── AUDIT_SUMMARY.txt        # Structure audit results
│   ├── DATABASE_AUDIT_REPORT.md # Database audit
│   ├── EXECUTIVE_QUESTIONS.md   # Executive Q&A
│   ├── GRAPHITI_RESEARCH_REPORT.md # Graphiti research
│   ├── MIGRATION_CHECKLIST.md   # Migration tasks
│   ├── PROJECT_STRUCTURE.md     # This file
│   ├── README_AUDIT.md          # Audit navigation
│   ├── STRUCTURE_AUDIT_REPORT.md # Detailed audit
│   └── TEST_SQL_MODES.md        # SQL testing docs
│
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema
│
├── scripts/                     # Build/deployment scripts
├── synapse/                     # Synapse integration
├── tests/                       # Test files
│
├── .env.local                   # Environment variables (not committed)
├── .env.example                 # Environment template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies (pnpm)
├── pnpm-lock.yaml               # pnpm lock file
└── README.md                    # Project overview
```

---

## Design Principles

### 1. Separation of Concerns

**Problem:** Configuration files mixed with application code creates clutter and confusion.

**Solution:** The `src/` directory pattern separates concerns:
- `src/` → All application code (app, components, lib, etc.)
- Root → Only configuration files (package.json, tsconfig.json, etc.)

**Benefits:**
- Cleaner project root
- Easier to navigate
- Industry standard
- Better IDE organization

### 2. Feature-Based Organization

**Problem:** All components in one folder becomes unmanageable as projects grow.

**Solution:** Two-tier component organization:
- **Global components** (`src/components/`) - Shared across entire app
- **Private components** (`src/app/dashboard/_components/`) - Feature-specific

**Benefits:**
- Components live near where they're used (colocation)
- Clear ownership and scope
- Easier to find and maintain
- Prevents accidental routing (underscore prefix)

### 3. Type Safety

**Problem:** Import errors and type mismatches during development.

**Solution:** Path aliases configured in TypeScript:
```typescript
"paths": {
  "@/*": ["./src/*"]
}
```

**Benefits:**
- Clean imports: `@/components/Button` vs `../../../components/Button`
- IDE autocomplete
- Refactoring safety
- Consistent import style

### 4. Progressive Enhancement

**Problem:** Poor user experience during loading and errors.

**Solution:** Next.js special files at appropriate levels:
- `error.tsx` - Error boundaries for graceful failure
- `loading.tsx` - Loading states for better UX
- `not-found.tsx` - Custom 404 pages

**Benefits:**
- Better error handling
- Smooth loading states
- Professional user experience
- SEO-friendly error pages

---

## Routing Architecture

### Route Groups

**What are Route Groups?**
Folders wrapped in parentheses `(folder)` organize routes **without affecting the URL structure**.

**When to Use:**
- Grouping routes that share a layout
- Organizing routes by section (marketing, dashboard, admin)
- Multiple root layouts at same level

**Ship Sticks Route Groups:**
- `(marketing)/` - Public-facing pages (landing, demo)
- `(admin)/` - Admin-only pages (claims center)
- `dashboard/` - Authenticated user area (no route group needed)

**Examples:**
```
app/(marketing)/page.tsx       → /
app/(marketing)/demo/page.tsx  → /demo
app/(admin)/admin/page.tsx     → /admin
app/dashboard/page.tsx         → /dashboard
```

### Private Folders

**What are Private Folders?**
Folders prefixed with underscore `_folder` are **excluded from routing**.

**When to Use:**
- Storing feature-specific components
- Co-locating utilities with routes
- Organizing tests near code

**Ship Sticks Private Folders:**
- `dashboard/_components/` - Dashboard-only components
- `_dev/` - Development/testing pages

---

## Component Organization

### Two-Tier System

#### Tier 1: Global Components (`src/components/`)

**Purpose:** Components used across **2 or more route groups**

**Examples:**
- `ui/` - shadcn/ui primitives (button, card, dialog, etc.)
- `Sidebar.tsx` - Used in dashboard
- `MobileBottomNav.tsx` - Used in dashboard
- `AddressAutocomplete.tsx` - Used in multiple forms
- `roi-calculator.tsx` - Used in marketing and dashboard

**Guidelines:**
- Must be reusable and generic
- Should not contain route-specific logic
- Can accept props for customization
- Should be documented with JSDoc

#### Tier 2: Private Components (`src/app/*/\_components/`)

**Purpose:** Components used **only within a specific route or feature**

**Ship Sticks Examples:**
```
dashboard/_components/
├── assistant/               # AI assistant UI components
│   ├── ChartDisplay.tsx
│   ├── ChatHistoryPanel.tsx
│   ├── DataTableDisplay.tsx
│   ├── ExcelDownloadButton.tsx
│   ├── ShipmentSelectorModal.tsx
│   └── SqlQueryDisplay.tsx
├── care-coordination/       # Care plan components
│   └── care-plan-card.tsx
├── patient/                 # Patient management
│   └── PatientCard.tsx
├── shipment/               # Shipment workflow
│   ├── AddressStep.tsx
│   ├── DatesStep.tsx
│   ├── EquipmentStep.tsx
│   └── VoiceNotesStep.tsx
├── mobile-chat-interface.tsx
├── sql-analytics-chat.tsx
├── virtual-assistant.tsx
└── voice-debug-panel.tsx
```

**Guidelines:**
- Tightly coupled to specific feature
- Can use route-specific hooks/contexts
- Import using relative paths (e.g., `../_components/PatientCard`)
- Named descriptively for their feature

### Decision Matrix: Where Should This Component Live?

| Question | Global (`components/`) | Private (`_components/`) |
|----------|----------------------|--------------------------|
| Used in 2+ route groups? | ✅ Yes | ❌ No |
| Contains route-specific logic? | ❌ No | ✅ Yes |
| Needs to be discoverable? | ✅ Yes | ❌ No |
| Tightly coupled to a feature? | ❌ No | ✅ Yes |

---

## Configuration Standards

### TypeScript Configuration

**Path Aliases:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Benefits:**
- Clean imports throughout codebase
- IDE autocomplete support
- Easy refactoring

### Tailwind Configuration

**Content Paths:**
```typescript
content: [
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
]
```

**Ensures:**
- All component styles are scanned
- Unused styles are purged
- Optimal bundle size

### Package Manager

**pnpm Configuration:**
```json
{
  "packageManager": "pnpm@9.15.0"
}
```

**Benefits:**
- Faster installation than npm
- Disk space efficient (shared dependencies)
- Strict dependency resolution
- Monorepo friendly

---

## Best Practices

### 1. Import Conventions

**Use path aliases for global imports:**
```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ Avoid
import { Button } from '../../../components/ui/button'
```

**Use relative paths for private components:**
```typescript
// ✅ Good (in dashboard/claims/page.tsx)
import PatientCard from '../_components/patient/PatientCard'

// ❌ Avoid
import PatientCard from '@/app/dashboard/_components/patient/PatientCard'
```

### 2. File Naming

**Use kebab-case for files:**
```
✅ care-plan-card.tsx
✅ patient-card.tsx
❌ CarePlanCard.tsx
❌ PatientCard.tsx (except when exporting component)
```

**Component files should match export:**
```typescript
// PatientCard.tsx
export default function PatientCard() { ... }
```

### 3. Special Files

**Always include at route levels:**
- `layout.tsx` - Shared UI wrapper
- `error.tsx` - Error boundary
- `loading.tsx` - Loading state
- `page.tsx` - Route endpoint

**Example structure:**
```
dashboard/
├── layout.tsx      # Dashboard shell
├── error.tsx       # Catches errors in dashboard
├── loading.tsx     # Shows while dashboard loads
└── page.tsx        # Dashboard home
```

### 4. API Routes

**Organize by feature:**
```
api/
├── assistant/      # AI assistant endpoints
├── claims/         # Claims processing
├── shipments/      # Shipment management
└── analytics/      # Analytics queries
```

**Use route handlers:**
```typescript
// api/assistant/chat/route.ts
export async function POST(request: Request) {
  // Handle POST requests
}
```

---

## Migration History

### November 16, 2025 - Next.js 16 Best Practices Migration

**Compliance Score:** 62% → 98%

**Changes:**
1. ✅ Migrated all code to `src/` directory
2. ✅ Added error boundaries (`error.tsx`) at global and route group levels
3. ✅ Added loading states (`loading.tsx`) at global and route group levels
4. ✅ Added custom 404 page (`not-found.tsx`)
5. ✅ Implemented private `_components` folders for dashboard
6. ✅ Updated TypeScript path aliases to `./src/*`
7. ✅ Updated Tailwind content paths to scan `src/`
8. ✅ Migrated from npm to pnpm@9.15.0
9. ✅ Removed redundant `(app)` route group
10. ✅ Organized backup files into `docs/backups/`

**Files Affected:** 239 files reorganized

**Benefits:**
- Clearer separation of concerns
- Better error handling and UX
- Improved component organization
- Faster package installation with pnpm
- Industry-standard structure

---

## Maintaining This Structure

### When Adding New Features

1. **Create route folder** under appropriate section (dashboard, admin, etc.)
2. **Add special files** if needed (layout, error, loading)
3. **Create _components folder** if feature has >2 components
4. **Use global components** when possible to avoid duplication
5. **Update documentation** if adding new patterns

### When Adding Components

**Ask yourself:**
- Is this used in multiple route groups? → `src/components/`
- Is this specific to one feature? → `src/app/*/\_components/`

### When Refactoring

1. **Check imports** - Ensure path aliases are used correctly
2. **Verify component tier** - Ensure components are in correct location
3. **Update tests** - Keep tests in same folder as components
4. **Document changes** - Update this file if structure changes

---

## Questions?

For questions about this structure or to propose changes, refer to:
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Project Structure Best Practices](https://nextjs.org/docs/app/getting-started/project-structure)
- `/docs/AUDIT_SUMMARY.txt` - Compliance audit results
- `/docs/MIGRATION_CHECKLIST.md` - Migration guide

**Last Updated:** November 16, 2025
**Framework Version:** Next.js 15.5.6
**Compliance Score:** 98%
