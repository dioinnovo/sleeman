# BrewMind Demo Script

## Demo Overview

**Duration**: 10-15 minutes
**Target Audience**: Sleeman Breweries stakeholders, potential clients, internal teams
**Prerequisites**:
- Docker container running (`docker-compose up -d`)
- Development server running (`pnpm run dev`)
- PostgreSQL database seeded with demo data

---

## Pre-Demo Checklist

- [ ] Docker container `sleeman-brewmind-db` is running
- [ ] Development server is running on http://localhost:3000
- [ ] Browser is in incognito/private mode (fresh session)
- [ ] Screen sharing is set up (if remote demo)
- [ ] Backup slides ready in case of technical issues

---

## Demo Flow

### 1. Landing Page Introduction (2 min)
**URL**: http://localhost:3000

**Key Points**:
- Introduce BrewMind as an AI-powered brewery intelligence platform
- Highlight Barley, the AI brewing analyst
- Show the 4 key stats: 150+ years heritage, 15 beer styles, 5 production lines, 99.2% quality pass rate
- Point out the 6 feature cards (AI Analytics, Production, Quality, Distribution, Compliance, Revenue)
- Click "Talk to Barley" or "Launch Dashboard"

**Talking Script**:
> "Welcome to BrewMind, Sleeman's AI-powered brewery intelligence platform. At the heart of BrewMind is Barley, an AI analyst that lets you ask questions about your brewery operations in plain English - no technical knowledge required."

---

### 2. Interactive Demo Walkthrough (3 min)
**URL**: http://localhost:3000/demo

**Key Points**:
- Step through each of the 5 demo stages
- Show the interactive previews for each feature
- Emphasize the SQL-powered backend
- Navigate to the Barley AI assistant

**Talking Script**:
> "Let me show you a quick walkthrough of what BrewMind can do. We have 5 key capabilities..."

---

### 3. Barley AI Chat (4 min)
**URL**: http://localhost:3000/dashboard/assistant

**Suggested Questions to Ask**:
1. "What is our production volume by beer style?"
2. "Show me quality issues this month"
3. "Who are our top distributors by revenue?"
4. "What's the equipment utilization rate?"

**Key Points**:
- Show the natural language interface
- Demonstrate how questions are converted to SQL
- Point out the data visualization (charts/tables)
- Show the "Show SQL" toggle to reveal the actual query
- Highlight follow-up question suggestions

**Talking Script**:
> "Watch this - I'll ask Barley a question in plain English. It understands the context and automatically queries our production database. Notice how it shows the results visually and even suggests related questions."

---

### 4. Main Dashboard (2 min)
**URL**: http://localhost:3000/dashboard

**Key Points**:
- Show the 6 KPI cards at the top
- Scroll to the charts section:
  - Production Volume bar chart (12 months)
  - Quality Metrics trend line
  - Beer Style Distribution pie chart
  - Top Products by Revenue
- Emphasize real-time data from PostgreSQL

**Talking Script**:
> "The main dashboard gives you an at-a-glance view of your entire operation. These KPIs are live from our database - production volume, quality rates, equipment utilization, and revenue."

---

### 5. Quality Control (2 min)
**URL**: http://localhost:3000/dashboard/compliance

**Key Points**:
- Show the compliance metrics
- Point out the HACCP compliance section
- Show the audit history table
- Highlight the brewing standards monitoring

**Talking Script**:
> "Quality is paramount in brewing. This dashboard tracks every quality test - pH, ABV, gravity, clarity - and monitors HACCP compliance. We can see audit history and any issues that need attention."

---

### 6. Distribution (1 min)
**URL**: http://localhost:3000/dashboard/distribution

**Key Points**:
- Show the distributor performance metrics
- Point out shipment tracking
- Highlight regional distribution

**Talking Script**:
> "Distribution tracking shows shipments to LCBO, BC Liquor, and all 14 of our major distributors. We can track delivery performance and identify any delays."

---

### 7. Q&A and Wrap-Up (1-2 min)

**Key Closing Points**:
- BrewMind is powered by:
  - Claude AI for natural language understanding
  - PostgreSQL for robust data storage
  - 23 pre-built SQL queries for common questions
  - 15 brewery-specific database tables
- Fully customizable for any brewery operation
- Integration-ready with existing ERP and SCADA systems

---

## Troubleshooting

### Database Connection Issues
```bash
# Check if Docker container is running
docker ps | grep sleeman-brewmind-db

# Restart the container
docker-compose down && docker-compose up -d

# Verify database is accessible
docker exec sleeman-brewmind-db psql -U brewmind -d brewmind -c "SELECT COUNT(*) FROM production_batches;"
```

### Dev Server Issues
```bash
# Kill existing processes and restart
pkill -f "next dev"
pnpm run dev
```

### Common Questions from Audience

**Q: What database is this using?**
A: PostgreSQL 16, running in Docker. The schema has 15 tables covering production, quality, inventory, distribution, and compliance.

**Q: How does Barley understand questions?**
A: Barley uses Claude AI to interpret natural language questions and maps them to predefined SQL queries. For complex questions, it can generate custom SQL.

**Q: Can this integrate with our existing systems?**
A: Yes! The Integrations page shows our current connections to Oracle ERP, PlantPAx SCADA, Workday, and more. The architecture is designed for enterprise integration.

**Q: Is the data real?**
A: For this demo, we use realistic seed data spanning 12 months. In production, it would connect to your live systems.

---

## Demo URLs Summary

| Page | URL |
|------|-----|
| Landing Page | http://localhost:3000 |
| Interactive Demo | http://localhost:3000/demo |
| Barley AI Chat | http://localhost:3000/dashboard/assistant |
| Main Dashboard | http://localhost:3000/dashboard |
| Quality Control | http://localhost:3000/dashboard/compliance |
| Distribution | http://localhost:3000/dashboard/distribution |
| Reports | http://localhost:3000/dashboard/reports |
| Integrations | http://localhost:3000/dashboard/integrations |

---

*Last Updated: December 2, 2024*
