# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sleeman BrewMind is a Next.js 16.0.3 application for AI-powered brewery analytics and operations intelligence. It demonstrates how AI can help Sleeman Breweries optimize production, quality control, inventory management, and distribution through natural language SQL queries powered by the BrewMind AI assistant "Barley".

**Target Demo**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries

## CRITICAL: Database Configuration

**READ THIS FIRST** when encountering database issues.

### Documentation
- [docs/DATABASE_MANAGEMENT.md](docs/DATABASE_MANAGEMENT.md) - Database troubleshooting
- [docs/ENTERPRISE_MIGRATION_GUIDE.md](docs/ENTERPRISE_MIGRATION_GUIDE.md) - **Migration guide for repurposing this codebase**

### Current Database Configuration
- **Container**: `sleeman-brewmind-db` (Docker)
- **Port**: `5433` (NOT 5432!)
- **Database**: `brewmind`
- **Primary Env Var**: `BREWMIND_DATABASE_URL` (avoids shell conflicts)
- **Connection**: `postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind`

### CRITICAL: Shell Environment Override Issue

**This was the root cause of repeated deployment failures.**

Shell environment variables (from `.bashrc`, `.zshrc`) override `.env.local`. The fix is to use project-specific environment variables.

```typescript
// In langchain-config.ts - use BREWMIND_DATABASE_URL first
const databaseUrl = process.env.BREWMIND_DATABASE_URL || process.env.DATABASE_URL;
```

### Troubleshooting Connection Issues

If you see "No results found" or wrong database errors:

1. **Check which database is being used in logs:**
   ```
   🔌 Initializing LangChain TypeORM DataSource...
      DATABASE_URL: postgresql://brewmind:***@localhost:5433/brewmind  ← Should show BrewMind
   ```

2. **Check for shell environment override:**
   ```bash
   echo $DATABASE_URL  # Should be empty or match BrewMind
   unset DATABASE_URL  # Remove shell override
   ```

3. **Restart Next.js:**
   ```bash
   pkill -f "next dev"
   pnpm run dev
   ```

4. **Verify BREWMIND_DATABASE_URL is set in .env.local:**
   ```bash
   grep BREWMIND_DATABASE_URL .env.local
   ```

### Demo Lifecycle Scripts

```bash
# Start demo environment (cleans up conflicts automatically)
./scripts/start-demo.sh

# Stop demo environment (frees all resources)
./scripts/cleanup-demo.sh
```

## Development Commands

### Running the Application
```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 16.0.3 with App Router
- **UI**: React 18.2, Tailwind CSS 3.3, shadcn/ui components
- **State Management**: React hooks
- **Animations**: Framer Motion 11.0
- **AI Integration**: LangChain, Azure OpenAI (GPT-4o-mini)
- **Database**: PostgreSQL 16 (Docker), TypeORM
- **Data Visualization**: Recharts

### Project Structure
```
sleeman/
├── app/                     # Next.js App Router
│   ├── dashboard/          # Protected dashboard routes
│   │   └── _components/    # SQL Analytics Chat interface
│   ├── api/
│   │   └── sql-agent/      # Text-to-SQL API endpoint
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── dashboard/         # Dashboard components
├── lib/
│   └── ai/                # AI service integrations
│       ├── sql-agent.ts         # LangChain ReAct SQL Agent
│       ├── sql-agent-fast.ts    # Fast path for simple queries
│       ├── sql-tools.ts         # SQL tools for the agent
│       ├── langchain-config.ts  # TypeORM DataSource
│       ├── query-classifier.ts  # Query complexity classifier
│       ├── insights-generator.ts # Business insights LLM
│       └── chart-generator.ts   # Chart data generator
├── scripts/
│   ├── start-demo.sh      # Start demo environment
│   └── cleanup-demo.sh    # Stop all demo processes
├── docs/
│   └── DATABASE_MANAGEMENT.md  # Database troubleshooting guide
└── .env.local             # Environment variables
```

### Key Features

1. **SQL Analytics Chat** (`app/dashboard/_components/sql-analytics-chat.tsx`)
   - Natural language to SQL queries
   - Quick mode (concise) and Pro mode (comprehensive analysis)
   - Interactive data tables with export to Excel
   - Chart visualizations for numeric data

2. **Text-to-SQL Agent** (`lib/ai/sql-agent.ts`)
   - LangChain ReAct agent with Azure OpenAI
   - Schema-aware SQL generation
   - Automatic query validation and safety checks
   - Fast path routing for simple queries

3. **Database Schema** (16 tables)
   - Production: beer_styles, production_lines, production_batches
   - Quality: quality_tests, quality_issues
   - Inventory: suppliers, raw_materials, material_usage
   - Equipment: equipment, equipment_downtime
   - Distribution: distributors, shipments, products, monthly_revenue
   - Sales: **sales_transactions** (600+ rows - detailed revenue by province, liquor board, store)
   - Compliance: compliance_audits

### Environment Variables

Key environment variables in `.env.local`:
- `BREWMIND_DATABASE_URL` - **Primary** PostgreSQL connection (avoids shell conflicts)
- `DATABASE_URL` - Fallback PostgreSQL connection (must use port 5433)
- `AZURE_OPENAI_KEY` - Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT` - Azure OpenAI endpoint
- `AZURE_OPENAI_DEPLOYMENT` - Deployment name (gpt-4o-mini)
- `AZURE_OPENAI_VERSION` - API version

**Important**: Always use project-specific environment variable names (like `BREWMIND_DATABASE_URL`) to avoid conflicts with shell environment variables. See [docs/ENTERPRISE_MIGRATION_GUIDE.md](docs/ENTERPRISE_MIGRATION_GUIDE.md) for details.

### Design System

**Full documentation**: [docs/design-system.md](docs/design-system.md)

#### Core Principles
- **8pt Grid**: All spacing uses multiples of 8px (4, 8, 16, 24, 32, 48, 64px)
- **Transparent Headers**: Page headers have NO background, border, or shadow
- **Cards for Content Only**: Only use card styling for KPIs, data tables, distinct blocks

#### Critical UI Rules (AI Agents MUST follow)

1. **PageHeader must remain transparent**
   - File: `src/components/ui/page-header.tsx`
   - NO bg-muted, bg-card, shadow, border, or rounded corners
   - Spacing: `pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-6 lg:px-8`

2. **Consistent horizontal padding**
   - All page content uses: `px-4 sm:px-6 lg:px-8`

3. **Layout gap is fixed**
   - Gap between sidebar and content: `gap-4` (16px)
   - Do NOT change this in `src/app/dashboard/layout.tsx`

4. **Sidebar navigation states**
   - Active: `bg-accent text-foreground/80 font-semibold border-l-4 border-primary`
   - Hover: `hover:bg-accent/50 text-muted-foreground hover:text-foreground/70`

#### Color Tokens (Tailwind/shadcn)
- `bg-background` - Page background
- `bg-muted` - Sidebar, card backgrounds
- `bg-card` - Card backgrounds
- `bg-accent` - Hover/active states
- `text-foreground` - Primary text
- `text-foreground/80` - Selected nav items
- `text-muted-foreground` - Secondary text

#### Key UI Files
| File | Purpose |
|------|---------|
| `src/app/dashboard/layout.tsx` | Dashboard shell (sidebar + content) |
| `src/components/Sidebar.tsx` | Navigation sidebar |
| `src/components/ui/page-header.tsx` | Page title component |
| `src/components/MobileBottomNav.tsx` | Mobile bottom nav |

- **Theme**: Light/dark mode with brewery aesthetic
- **Components**: shadcn/ui with custom styling
- **Animations**: Framer Motion for smooth transitions

### AI Agent Architecture

The SQL agent uses a two-path architecture:

1. **Fast Path** (simple queries, ~5 seconds)
   - Single LLM call to generate SQL
   - Used for: aggregations, top N, simple comparisons
   - Implemented in `sql-agent-fast.ts`

2. **Full Agent** (complex queries, ~30-60 seconds)
   - LangChain ReAct agent with tool calls
   - Used for: multi-table joins, complex analytics
   - Implemented in `sql-agent.ts`

Query classification (`query-classifier.ts`) routes requests automatically.

### Beer Styles in Database (EXACT names from beer_styles.name)
- Sleeman Clear 2.0
- Sleeman Original Draught
- Sleeman Honey Brown Lager
- Sleeman Cream Ale
- Sleeman Silver Creek Lager
- Okanagan Spring Pale Ale
- Wild Rose IPA
- Sapporo Premium Beer

### Facilities (EXACT values from production_lines.facility)
- Guelph Brewery: 3 production lines
- Vernon Brewery: 2 production lines

### Distributors (EXACT names from distributors.name)
- LCBO Ontario, BC Liquor Stores, SAQ Quebec, Alberta Gaming
- Costco Canada, Metro Inc., Sobeys
- The Keg Steakhouse, Boston Pizza, Moxies, Bier Markt, Craft Beer Market
- Export USA, Export Japan
