# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sleeman BrewMind is a Next.js 16.0.3 application for AI-powered brewery analytics and operations intelligence. It demonstrates how AI can help Sleeman Breweries optimize production, quality control, inventory management, and distribution through natural language SQL queries powered by the BrewMind AI assistant "Barley".

**Target Demo**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries

## CRITICAL: Database Management

**READ THIS FIRST** when encountering database issues. See [docs/DATABASE_MANAGEMENT.md](docs/DATABASE_MANAGEMENT.md) for full details.

### Current Database Configuration
- **Container**: `sleeman-brewmind-db` (Docker)
- **Port**: `5433` (NOT 5432!)
- **Database**: `brewmind`
- **Connection**: `postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind`

### Common Issue: Wrong Database Connection

If you see errors like `relation "table_name" does not exist`:

1. **Check for orphaned PostgreSQL on port 5432:**
   ```bash
   lsof -i :5432  # Should be empty
   brew services stop postgresql@14
   ```

2. **Check for shell environment override:**
   ```bash
   echo $DATABASE_URL  # Should be empty
   unset DATABASE_URL
   ```

3. **Restart Next.js:**
   ```bash
   pkill -f "next dev"
   pnpm run dev
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

3. **Database Schema** (15 tables)
   - Production: beer_styles, production_lines, production_batches
   - Quality: quality_tests, quality_issues
   - Inventory: suppliers, raw_materials, material_usage
   - Equipment: equipment, equipment_downtime
   - Distribution: distributors, shipments, products, monthly_revenue
   - Compliance: compliance_audits

### Environment Variables

Key environment variables in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection (must use port 5433)
- `AZURE_OPENAI_KEY` - Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT` - Azure OpenAI endpoint
- `AZURE_OPENAI_DEPLOYMENT` - Deployment name (gpt-4o-mini)
- `AZURE_OPENAI_VERSION` - API version

### Design System

- **Colors**:
  - Sleeman Dark: #1C1812 (backgrounds)
  - Sleeman Gold: #D4A84B (primary accent)
  - Sleeman Gold Light: #E8C76A (hover states)
  - Sleeman Brown: #2C2416 (cards, borders)
  - Sleeman Blue: #1863DC (secondary accent)
- **Theme**: Dark brewery aesthetic matching Sleeman brand
- **Components**: Using shadcn/ui with brewery-themed customizations
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
