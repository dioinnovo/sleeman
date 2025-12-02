# Sleeman BrewMind AI Demo Walkthrough

## Overview
This document provides a step-by-step walkthrough for demonstrating the Sleeman BrewMind AI platform to Brian Cappellaro and the Sleeman Breweries team.

**Demo Duration:** 20-30 minutes
**Target Audience:** IT Director, PMO Leadership, Business Stakeholders

---

## Pre-Demo Setup

### 1. Start the Environment
```bash
# Start PostgreSQL database
docker-compose up -d

# Start development server
pnpm run dev
```

### 2. Verify Services
- Open http://localhost:3000 in Chrome
- Confirm database connection: API should show `ready: true` at `/api/sql-agent`
- Have the demo page ready: http://localhost:3000/demo

### 3. Browser Setup
- Use Chrome in full-screen mode (F11)
- Close other tabs to avoid distractions
- Clear browser cache if needed for fresh experience

---

## Demo Flow (20-30 minutes)

### Act 1: The Business Challenge (2-3 min)

**Talking Points:**
> "Brian, you mentioned the challenge of data silos across your four breweries - production data in PlantPAx, financials in Oracle EBS, sales data elsewhere. Your 36-person team gets constant ad-hoc report requests, and demonstrating operational excellence to Sapporo requires consolidating insights from multiple systems."

**Show:** Landing page briefly, then navigate to Dashboard

---

### Act 2: The Dashboard - Enterprise Overview (3-4 min)

**Navigate to:** `/dashboard`

**Highlight:**
1. **KPI Cards** - Real-time metrics across facilities
   - Production volume (all 4 breweries consolidated)
   - Efficiency metrics (Sapporo-ready numbers)
   - Quality scores

2. **Today's Production Summary**
   - Show how multiple facility data is unified
   - "This replaces manual consolidation from separate systems"

3. **Visual Analytics**
   - Production trends chart
   - Quick insights without SQL expertise

**Key Message:**
> "Business users see this dashboard first thing in the morning. No IT tickets, no waiting for reports - just answers."

---

### Act 3: Meet Barley - The AI Data Analyst (8-10 min)

**Navigate to:** `/dashboard/assistant`

**This is the hero demo. Take your time here.**

#### Demo Question 1: Simple Query
> "Show me production volume by beer style this month"

**Wait for response, then highlight:**
- Natural language → SQL translation
- Real-time data from your Oracle/PlantPAx systems
- Formatted results with charts
- Download to Excel button (for Sapporo reports)

#### Demo Question 2: Cross-Facility Analysis
> "Compare fermentation efficiency across all production lines"

**Key Message:**
> "This would typically require someone with Oracle SQL skills and access to multiple systems. Now, any operations manager can ask this in plain English."

#### Demo Question 3: Executive-Ready Insights
> "What's our cost per hectoliter by brand for the last quarter?"

**Emphasize:**
- This is the type of question Sapporo asks
- Instant response vs. days of manual data gathering
- Audit trail - every query is logged

#### Demo Question 4: Compliance & Quality
> "Show me any batches with quality issues this month"

**Key Message:**
> "For TTB and FDA compliance, you need traceability. Barley can instantly surface any quality concerns for FSMA documentation."

---

### Act 4: Quality Control Dashboard (3-4 min)

**Navigate to:** `/dashboard/compliance`

**Highlight:**
- Real-time quality metrics
- Batch tracking for regulatory compliance
- Test results visualization
- "No more paper-based batch reporting"

---

### Act 5: Distribution & Operations (2-3 min)

**Navigate to:** `/dashboard/distribution`

**Show:**
- Shipment tracking across 11 distribution centers
- Regional performance metrics
- Delivery analytics
- Top distributors dashboard

---

### Act 6: The Interactive Demo Mode (2-3 min)

**Navigate to:** `/demo`

**This page shows the platform's capabilities in a guided format:**
- Step through the automated demo
- Show different query types
- Demonstrate Oracle SQL translation

---

### Act 7: Close - The Value Proposition (2-3 min)

**Return to:** `/dashboard/assistant`

**Final Talking Points:**

1. **For Your Team:**
   > "Instead of 36 people fielding ad-hoc report requests, they focus on strategic projects. The PMO can track project ROI with real data."

2. **For Sapporo:**
   > "Executive dashboards generated in seconds. Clear visibility into all four breweries. The compliance documentation that Sapporo's standards require."

3. **For Brian's Career:**
   > "You become the leader who brought AI-powered data access to a 170-year-old brewery while maintaining Oracle integration and enterprise governance."

---

## Sample Questions for Demo

### Production Queries
- "What's our daily production volume this week?"
- "Show me production by beer style for the last 6 months"
- "Which production line has the highest efficiency?"
- "Compare output between Guelph and Vernon facilities"

### Quality Queries
- "Any fermentation issues in the last 30 days?"
- "What's our average quality score by product line?"
- "Show batches that failed quality tests this quarter"
- "Which beer styles have the highest reject rates?"

### Financial/Business Queries
- "Top 10 distributors by revenue"
- "Revenue breakdown by product category"
- "Cost per hectoliter trend over 12 months"
- "Most profitable product lines"

### Compliance Queries
- "Batch tracking for lot number XYZ"
- "Temperature variance incidents this month"
- "Quality certification status by facility"

---

## Handling Questions

### "How does it connect to Oracle?"
> "The platform uses secure read-only connections to Oracle EBS. We translate natural language to Oracle SQL, execute the query, and return results - all while maintaining your existing security and access controls."

### "What about data governance?"
> "Every query is logged with user, timestamp, and the SQL executed. Role-based access controls mirror your existing Oracle permissions. The PMO can audit any data access."

### "How long to implement?"
> "We start with a focused dataset - maybe production and quality data from one brewery. Typically 4-6 weeks to first value. Then expand as you see results."

### "What about sensitive financial data?"
> "We implement field-level security. Users only see data they're authorized to access. The AI understands permissions and won't surface restricted information."

---

## Technical Requirements (if asked)

- **Database:** PostgreSQL (demo) / Oracle EBS R12 (production)
- **AI Model:** Azure OpenAI GPT-4o-mini
- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Security:** Role-based access, query logging, encrypted connections
- **Deployment:** Azure cloud or on-premises options

---

## Demo Backup Plans

### If database is down:
- Use the `/demo` page which has simulated data
- Explain that live data would show similar visualizations

### If AI is slow:
- Have a few pre-generated response screenshots ready
- Use the time to discuss the query while waiting

### If a query fails:
- Acknowledge it gracefully
- Move to a different question
- "In production, we tune the AI for your specific data model"

---

## Post-Demo Actions

1. Send follow-up email with:
   - Link to this demo (if deployable)
   - One-pager on platform capabilities
   - Suggested next steps

2. Offer pilot program:
   - 4-week proof of concept
   - Focus on one high-value use case
   - Measurable success criteria

3. Schedule technical deep-dive:
   - Oracle integration architecture
   - Security and governance review
   - IT team Q&A session
