# 🍺 Sleeman BrewMind - AI-Powered Brewery Analytics

> **Quick Start**: Deploy and run the complete AI-powered brewery analytics platform in under 10 minutes

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** for the PostgreSQL database
- **Node.js 20+** and pnpm
- **Azure OpenAI** API access (GPT-4o-mini deployment)

### 1. Start the Demo Environment

```bash
# Clone the repository
git clone https://github.com/dioinnovo/sleeman.git
cd sleeman

# Install dependencies
pnpm install

# Start the demo (database + server)
./scripts/start-demo.sh
```

### 2. Access the Application

- **Application**: http://localhost:3000
- **SQL Analytics Dashboard**: http://localhost:3000/dashboard

### 3. Stop When Done

```bash
# Clean up all processes
./scripts/cleanup-demo.sh
```

## 🎯 What Is BrewMind?

BrewMind is an AI-powered analytics platform that transforms natural language questions into SQL queries, providing instant business insights for Sleeman Breweries operations.

### Key Features

- **🗣️ Natural Language Interface**: Ask questions in plain English
- **⚡ Fast Responses**: 5-15 seconds for most queries
- **📊 Visual Analytics**: Automatic chart generation
- **📥 Excel Export**: Download results for further analysis
- **🔒 Read-Only Safety**: No risk of data modification

### Sample Questions You Can Ask

**Production & Operations:**
- "What is our production volume by beer style?"
- "Compare fermentation efficiency across production lines"
- "Show me monthly production trends"

**Quality Control:**
- "What are the batch failure rates by beer style?"
- "Which batches have the highest quality scores?"
- "What are the most common quality issues?"

**Inventory & Supply Chain:**
- "What materials are below reorder level?"
- "Show me supplier reliability scores"
- "What is our material usage by batch?"

**Distribution & Revenue:**
- "Who are our top distributors by volume?"
- "What are our top products by revenue?"
- "Show me revenue trends by month"

## 🗄️ Database Schema

BrewMind connects to a PostgreSQL database with **15 brewery-specific tables**:

| Category | Tables |
|----------|--------|
| **Production** | beer_styles, production_lines, production_batches |
| **Quality** | quality_tests, quality_issues |
| **Inventory** | suppliers, raw_materials, material_usage |
| **Equipment** | equipment, equipment_downtime |
| **Distribution** | distributors, shipments, products, monthly_revenue |
| **Compliance** | compliance_audits |

### Beer Styles in Database
- Sleeman Clear 2.0 (Light Lager)
- Sleeman Original Draught (Lager)
- Sleeman Honey Brown (Amber Ale)
- Sleeman Cream Ale (Cream Ale)
- Sleeman Silver Creek (Lager)
- Okanagan Spring Pale Ale (Pale Ale)
- Wild Rose WRaspberry (Fruit Beer)
- Sapporo Premium (Lager)

### Facilities
- **Guelph Facility** (Ontario): 3 production lines
- **Vernon Facility** (BC): 2 production lines

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **AI**: LangChain + Azure OpenAI (GPT-4o-mini)
- **Database**: PostgreSQL 16 (Docker) + TypeORM
- **UI**: React 18.2, Tailwind CSS, shadcn/ui
- **Charts**: Recharts

### AI Agent Architecture

The SQL agent uses a two-path architecture for optimal performance:

1. **Fast Path** (~5 seconds)
   - Single LLM call to generate SQL
   - Used for: simple aggregations, top N queries, counts

2. **Full Agent** (~30-60 seconds)
   - LangChain ReAct agent with tool calls
   - Used for: complex joins, multi-step analytics

Query complexity is automatically classified to route to the appropriate path.

## 📁 Project Structure

```
sleeman/
├── app/
│   ├── dashboard/
│   │   └── _components/
│   │       └── sql-analytics-chat.tsx  # Main chat interface
│   └── api/
│       └── sql-agent/
│           └── route.ts                 # API endpoint
├── lib/ai/
│   ├── sql-agent.ts                     # Full ReAct agent
│   ├── sql-agent-fast.ts                # Fast path agent
│   ├── sql-tools.ts                     # SQL tools
│   ├── langchain-config.ts              # Database connection
│   ├── query-classifier.ts              # Complexity routing
│   ├── insights-generator.ts            # Business insights
│   └── chart-generator.ts               # Visualization
├── scripts/
│   ├── start-demo.sh                    # Start environment
│   └── cleanup-demo.sh                  # Stop environment
└── docs/
    └── DATABASE_MANAGEMENT.md           # Troubleshooting guide
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Database (Docker container on port 5433)
DATABASE_URL="postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind"

# Azure OpenAI
AZURE_OPENAI_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_VERSION=2024-12-01-preview
```

### Database Setup

The demo uses a Docker container with pre-seeded brewery data:

```bash
# Start database only
docker-compose up -d sleeman-brewmind-db

# Verify connection
docker exec sleeman-brewmind-db psql -U brewmind -d brewmind -c "\dt"
```

## 🐛 Troubleshooting

### Common Issues

See [docs/DATABASE_MANAGEMENT.md](docs/DATABASE_MANAGEMENT.md) for detailed troubleshooting.

**Quick Fixes:**

```bash
# If queries return wrong data (wrong database)
brew services stop postgresql@14
lsof -ti:5432 | xargs kill -9
unset DATABASE_URL
pkill -f "next dev"
pnpm run dev

# If database won't start
docker-compose down
docker-compose up -d sleeman-brewmind-db

# Full cleanup
./scripts/cleanup-demo.sh
./scripts/start-demo.sh
```

## 📊 Performance

| Query Type | Response Time |
|------------|---------------|
| Simple (count, top N) | 5-10 seconds |
| Medium (aggregations) | 10-20 seconds |
| Complex (multi-table) | 30-60 seconds |

- **Cache Hit Rate**: 90%+
- **Query Success Rate**: 98%+

## 📖 Documentation

- [Database Management Guide](docs/DATABASE_MANAGEMENT.md) - Troubleshooting & best practices
- [SQL Agent Architecture](docs/SQL_AGENT_ARCHITECTURE.md) - Technical details

## 🎯 Target Demo

**Audience**: Brian Cappellaro, Director IT & PMO at Sleeman Breweries

**Value Proposition**:
- Transform natural language into instant analytics
- No SQL knowledge required for business users
- Real-time insights from brewery operations data
- Secure, read-only access to production data

---

*Built with ❤️ for Sleeman Breweries - Canada's Craft Brewery Since 1834*
