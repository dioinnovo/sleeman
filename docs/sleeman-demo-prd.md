# BrewMind Demo Application PRD
## Brian Cappellaro Presentation - Strategic Demo Build
### Version 1.0 | December 2025

---

# EXECUTIVE SUMMARY

This PRD defines the technical specifications for a demonstration application tailored specifically for **Brian Cappellaro, Director of IT and PMO at Sleeman Breweries**. The demo showcases a Text-to-SQL Data Analyst Agent that addresses Brian's core challenges: democratizing data access across siloed systems, empowering business users with self-service analytics, and demonstrating IT leadership through AI innovation.

**Demo Objective**: Position Brian as the visionary leader who brings AI-powered data accessibility to Sleeman, enabling any business user to query enterprise data in natural language while maintaining governance and compliance.

**Key Persona Focus**: Jennifer, Supply Chain Director (Corporate) - demonstrating 8 days → 1 day transformation in monthly demand planning workflow.

---

# PART 1: STRATEGIC DEMO POSITIONING

## 1.1 Brian Cappellaro Profile Summary

### Professional Context
- **Role**: Director, Information Technology and Project Management Office
- **Team Size**: 36-person IT department
- **Scope**: 4 breweries, 11 distribution centers, ~1,100 employees
- **Tech Stack**: Oracle EBS R12, Rockwell PlantPAx, FactoryTalk, VMware, Workday
- **Parent Company**: Sapporo Holdings (Japan) - acquired for $400M CAD in 2006

### Key Pain Points to Address
1. **Data silos** across Oracle ERP, PlantPAx historian, and facility systems
2. **IT as bottleneck** for ad-hoc reporting with limited staff
3. **Parent company visibility** - need for streamlined Sapporo reporting
4. **Multi-facility complexity** - 4 breweries with different systems/data
5. **Legacy Oracle expertise scarcity** - R12 specialists increasingly rare
6. **PMO governance needs** - tracking project ROI and portfolio KPIs

### Career Motivations
- Demonstrate business value beyond "keeping lights on"
- Build credibility with Sapporo headquarters
- Path from Director to VP/CIO through transformational leadership
- Industry recognition potential (CIO awards, thought leadership)

### Conversation Levers
1. **Oracle Integration** - "Works with your existing R12 investment"
2. **Self-Service Empowerment** - "Free your team from ad-hoc report requests"
3. **Sapporo Reporting** - "Executive dashboards in natural language"
4. **Governance & Audit** - "Complete query logging and access controls"
5. **Quick Time-to-Value** - "Augment, don't replace your infrastructure"

## 1.2 Demo Narrative Arc

### Opening Hook
> "Brian, imagine if Jennifer in Supply Chain could ask 'What was our production cost per hectoliter by facility last quarter?' and get an instant answer with a chart—without submitting a ticket to your team. That's what we're going to show you today."

### Story Flow
1. **Current Pain**: Show Jennifer's 8-day monthly planning journey (manual, siloed)
2. **Cost of Inaction**: Competitors (Molson Coors, Labatt) investing billions in AI
3. **Vision of Success**: Any business user querying data in natural language
4. **Solution Demo**: Live Text-to-SQL agent answering real questions
5. **Proof Points**: Cross-facility benchmarking, demand forecasting, compliance
6. **Brian's Win**: "You become the leader who democratized data at Sleeman"

---

# PART 2: APPLICATION ARCHITECTURE

## 2.1 Technology Stack

```
Frontend:        Next.js 16 (App Router)
UI Components:   shadcn/ui + Tailwind CSS
State:           React Server Components + Client State
Streaming:       Vercel AI SDK with resumable-stream
Database:        SQLite (demo) / PostgreSQL (production)
Cache/Stream:    Redis Stream (for real-time data simulation)
AI Agent:        LangChain + Claude/GPT-4 for Text-to-SQL
Authentication:  NextAuth.js (demo mode with mock users)
```

## 2.2 Application Structure

```
brewmind-demo/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                    # Main dashboard layout with sidebar
│   │   ├── page.tsx                      # Dashboard home / Overview
│   │   ├── assistant/
│   │   │   └── page.tsx                  # 🎯 PRIMARY: AI Chat Interface
│   │   ├── analytics/
│   │   │   ├── page.tsx                  # Analytics overview
│   │   │   ├── demand-forecast/
│   │   │   │   └── page.tsx              # Demand Forecasting Dashboard
│   │   │   ├── production/
│   │   │   │   └── page.tsx              # Production Analytics
│   │   │   └── cross-facility/
│   │   │       └── page.tsx              # 🎯 Cross-Facility Benchmarking
│   │   ├── operations/
│   │   │   ├── page.tsx                  # Operations overview
│   │   │   ├── fermentation/
│   │   │   │   └── page.tsx              # Fermentation Monitoring
│   │   │   ├── packaging/
│   │   │   │   └── page.tsx              # Packaging Line Status
│   │   │   └── maintenance/
│   │   │       └── page.tsx              # Predictive Maintenance
│   │   ├── supply-chain/
│   │   │   ├── page.tsx                  # Supply Chain Overview
│   │   │   ├── inventory/
│   │   │   │   └── page.tsx              # Inventory Management
│   │   │   ├── scheduling/
│   │   │   │   └── page.tsx              # 🎯 Production Schedule Optimizer
│   │   │   └── distribution/
│   │   │       └── page.tsx              # Distribution Logistics
│   │   ├── compliance/
│   │   │   ├── page.tsx                  # Compliance Overview
│   │   │   ├── excise-duty/
│   │   │   │   └── page.tsx              # 🎯 Excise Duty Automation
│   │   │   └── audit-trail/
│   │   │       └── page.tsx              # Audit Trail & Logging
│   │   ├── reports/
│   │   │   ├── page.tsx                  # Report Library
│   │   │   ├── generator/
│   │   │   │   └── page.tsx              # 🎯 AI Report Generator
│   │   │   └── scheduled/
│   │   │       └── page.tsx              # Scheduled Reports
│   │   └── settings/
│   │       ├── page.tsx                  # Settings Overview
│   │       ├── users/
│   │       │   └── page.tsx              # User Management
│   │       └── integrations/
│   │           └── page.tsx              # System Integrations
│   └── api/
│       ├── chat/
│       │   └── route.ts                  # 🎯 AI Chat endpoint (streaming)
│       ├── query/
│       │   └── route.ts                  # Text-to-SQL execution
│       ├── analytics/
│       │   ├── demand-forecast/
│       │   │   └── route.ts              # Demand forecast data
│       │   ├── cross-facility/
│       │   │   └── route.ts              # Cross-facility comparison
│       │   └── production/
│       │       └── route.ts              # Production metrics
│       ├── operations/
│       │   ├── fermentation/
│       │   │   └── route.ts              # Fermentation data
│       │   └── maintenance/
│       │       └── route.ts              # Maintenance alerts
│       ├── supply-chain/
│       │   ├── inventory/
│       │   │   └── route.ts              # Inventory levels
│       │   └── scheduling/
│       │       └── route.ts              # Production schedules
│       ├── compliance/
│       │   ├── excise-duty/
│       │   │   └── route.ts              # Excise calculations
│       │   └── audit/
│       │       └── route.ts              # Audit log retrieval
│       ├── reports/
│       │   ├── generate/
│       │   │   └── route.ts              # AI report generation
│       │   └── export/
│       │       └── route.ts              # Export to Excel/PDF
│       └── stream/
│           └── route.ts                  # Redis stream endpoint
├── components/
│   ├── ui/                               # shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx                   # Main navigation sidebar
│   │   ├── header.tsx                    # Top header with user menu
│   │   └── breadcrumb.tsx                # Breadcrumb navigation
│   ├── chat/
│   │   ├── chat-interface.tsx            # Main chat component
│   │   ├── message-bubble.tsx            # Chat message display
│   │   ├── query-result.tsx              # SQL result visualization
│   │   ├── chart-renderer.tsx            # Dynamic chart generation
│   │   └── suggested-queries.tsx         # Query suggestions
│   ├── dashboard/
│   │   ├── metric-card.tsx               # KPI display card
│   │   ├── facility-selector.tsx         # Facility dropdown
│   │   └── date-range-picker.tsx         # Date range selection
│   ├── analytics/
│   │   ├── demand-chart.tsx              # Demand forecast visualization
│   │   ├── facility-comparison.tsx       # Cross-facility charts
│   │   └── trend-indicator.tsx           # Trend up/down indicators
│   ├── reports/
│   │   ├── report-template.tsx           # Report template component
│   │   ├── approval-workflow.tsx         # Report approval UI
│   │   └── export-options.tsx            # Export format selection
│   └── tables/
│       ├── data-table.tsx                # Generic data table
│       └── sortable-header.tsx           # Sortable table headers
├── lib/
│   ├── db/
│   │   ├── schema.ts                     # Database schema definitions
│   │   ├── seed.ts                       # Seed data for demo
│   │   └── queries.ts                    # Common SQL queries
│   ├── ai/
│   │   ├── agent.ts                      # LangChain agent setup
│   │   ├── text-to-sql.ts                # Text-to-SQL logic
│   │   ├── prompts.ts                    # System prompts
│   │   └── tools.ts                      # Agent tools definitions
│   ├── stream/
│   │   ├── redis.ts                      # Redis client setup
│   │   └── resumable.ts                  # Resumable stream utilities
│   └── utils/
│       ├── formatters.ts                 # Data formatting utilities
│       └── calculations.ts               # Business calculations
├── hooks/
│   ├── use-chat.ts                       # Chat state management
│   ├── use-stream.ts                     # Stream subscription hook
│   └── use-facility.ts                   # Facility context hook
├── types/
│   └── index.ts                          # TypeScript type definitions
└── public/
    ├── sleeman-logo.svg
    └── facility-images/
```

## 2.3 Sidebar Navigation Structure

```typescript
// components/layout/sidebar.tsx

const navigation = [
  {
    name: 'Overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'AI Assistant',
    href: '/assistant',
    icon: MessageSquare,
    badge: 'NEW',  // Highlight for demo
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    children: [
      { name: 'Demand Forecast', href: '/analytics/demand-forecast' },
      { name: 'Production Analytics', href: '/analytics/production' },
      { name: 'Cross-Facility', href: '/analytics/cross-facility', badge: 'DEMO' },
    ],
  },
  {
    name: 'Operations',
    href: '/operations',
    icon: Factory,
    children: [
      { name: 'Fermentation', href: '/operations/fermentation' },
      { name: 'Packaging Lines', href: '/operations/packaging' },
      { name: 'Maintenance', href: '/operations/maintenance' },
    ],
  },
  {
    name: 'Supply Chain',
    href: '/supply-chain',
    icon: Truck,
    children: [
      { name: 'Inventory', href: '/supply-chain/inventory' },
      { name: 'Scheduling', href: '/supply-chain/scheduling', badge: 'DEMO' },
      { name: 'Distribution', href: '/supply-chain/distribution' },
    ],
  },
  {
    name: 'Compliance',
    href: '/compliance',
    icon: Shield,
    children: [
      { name: 'Excise Duty', href: '/compliance/excise-duty', badge: 'DEMO' },
      { name: 'Audit Trail', href: '/compliance/audit-trail' },
    ],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
    children: [
      { name: 'Report Library', href: '/reports' },
      { name: 'AI Generator', href: '/reports/generator', badge: 'DEMO' },
      { name: 'Scheduled', href: '/reports/scheduled' },
    ],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    children: [
      { name: 'Users', href: '/settings/users' },
      { name: 'Integrations', href: '/settings/integrations' },
    ],
  },
];
```

---

# PART 3: API ROUTES SPECIFICATION

## 3.1 Core API Routes

### Chat/AI Assistant Endpoint

```typescript
// app/api/chat/route.ts

import { StreamingTextResponse, LangChainStream } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { createSqlAgent } from '@/lib/ai/agent';

export async function POST(req: Request) {
  const { messages, facilityId } = await req.json();
  
  const { stream, handlers } = LangChainStream();
  
  const agent = await createSqlAgent({
    facilityId,
    streaming: true,
    callbacks: [handlers],
  });
  
  // Execute agent with user message
  agent.invoke({
    input: messages[messages.length - 1].content,
    chat_history: messages.slice(0, -1),
  });
  
  return new StreamingTextResponse(stream);
}
```

### Text-to-SQL Query Endpoint

```typescript
// app/api/query/route.ts

import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/queries';
import { generateSQL } from '@/lib/ai/text-to-sql';
import { logQuery } from '@/lib/audit';

export async function POST(req: Request) {
  const { naturalLanguageQuery, facilityId, userId } = await req.json();
  
  try {
    // Generate SQL from natural language
    const { sql, explanation, confidence } = await generateSQL(naturalLanguageQuery);
    
    // Execute query
    const results = await executeQuery(sql);
    
    // Log for audit trail
    await logQuery({
      userId,
      naturalLanguageQuery,
      generatedSQL: sql,
      timestamp: new Date(),
      facilityId,
      rowsReturned: results.length,
    });
    
    return NextResponse.json({
      success: true,
      sql,
      explanation,
      confidence,
      results,
      metadata: {
        rowCount: results.length,
        executionTime: Date.now(),
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
```

### Analytics Endpoints

```typescript
// app/api/analytics/demand-forecast/route.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const facilityId = searchParams.get('facilityId');
  const sku = searchParams.get('sku');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  
  const forecast = await getDemandForecast({
    facilityId,
    sku,
    dateRange: { start: startDate, end: endDate },
  });
  
  return NextResponse.json(forecast);
}

// app/api/analytics/cross-facility/route.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const metric = searchParams.get('metric'); // e.g., 'cost_per_hl', 'oee', 'quality_score'
  const period = searchParams.get('period'); // e.g., 'month', 'quarter', 'year'
  
  const comparison = await getCrossFacilityComparison({
    metric,
    period,
  });
  
  return NextResponse.json(comparison);
}
```

### Compliance Endpoints

```typescript
// app/api/compliance/excise-duty/route.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const facilityId = searchParams.get('facilityId');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  
  const dutyCalculation = await calculateExciseDuty({
    facilityId,
    period: { month: parseInt(month), year: parseInt(year) },
  });
  
  return NextResponse.json(dutyCalculation);
}

export async function POST(req: Request) {
  const { facilityId, month, year, adjustments } = await req.json();
  
  // Generate excise duty report
  const report = await generateExciseDutyReport({
    facilityId,
    period: { month, year },
    adjustments,
  });
  
  return NextResponse.json(report);
}
```

### Report Generation Endpoint

```typescript
// app/api/reports/generate/route.ts

import { StreamingTextResponse } from 'ai';
import { generateReport } from '@/lib/ai/report-generator';

export async function POST(req: Request) {
  const { 
    reportType,
    parameters,
    format,
    approvalRequired 
  } = await req.json();
  
  const stream = await generateReport({
    type: reportType,
    parameters,
    outputFormat: format,
  });
  
  if (approvalRequired) {
    // Create draft for approval workflow
    await createReportDraft({
      content: stream,
      type: reportType,
      parameters,
      status: 'pending_approval',
    });
  }
  
  return new StreamingTextResponse(stream);
}
```

### Redis Stream Endpoint

```typescript
// app/api/stream/route.ts

import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const streamKey = searchParams.get('stream');
  const lastId = searchParams.get('lastId') || '0';
  
  // Read from Redis stream
  const messages = await redis.xread(
    'BLOCK', 5000,
    'STREAMS', streamKey, lastId
  );
  
  return NextResponse.json({ messages });
}

export async function POST(req: Request) {
  const { streamKey, data } = await req.json();
  
  // Add to Redis stream
  const id = await redis.xadd(streamKey, '*', data);
  
  return NextResponse.json({ id });
}
```

## 3.2 Complete API Route Reference

| Route | Method | Description | Demo Priority |
|-------|--------|-------------|---------------|
| `/api/chat` | POST | AI chat with streaming response | 🎯 PRIMARY |
| `/api/query` | POST | Execute Text-to-SQL query | 🎯 PRIMARY |
| `/api/analytics/demand-forecast` | GET | Get demand forecast data | HIGH |
| `/api/analytics/cross-facility` | GET | Cross-facility comparison | 🎯 PRIMARY |
| `/api/analytics/production` | GET | Production metrics | MEDIUM |
| `/api/operations/fermentation` | GET | Fermentation tank status | MEDIUM |
| `/api/operations/maintenance` | GET | Maintenance alerts | MEDIUM |
| `/api/supply-chain/inventory` | GET | Inventory levels | HIGH |
| `/api/supply-chain/scheduling` | GET/POST | Production schedules | HIGH |
| `/api/compliance/excise-duty` | GET/POST | Excise duty calculations | 🎯 PRIMARY |
| `/api/compliance/audit` | GET | Audit trail retrieval | HIGH |
| `/api/reports/generate` | POST | AI report generation | 🎯 PRIMARY |
| `/api/reports/export` | POST | Export to Excel/PDF | HIGH |
| `/api/stream` | GET/POST | Redis stream operations | MEDIUM |

---

# PART 4: SYNTHETIC DATABASE SCHEMA

## 4.1 Database Schema Overview

The synthetic database simulates Sleeman's data environment with realistic brewing industry data across their four facilities.

```sql
-- =====================================================
-- BREWMIND DEMO DATABASE SCHEMA
-- Sleeman Breweries Synthetic Data
-- =====================================================

-- -----------------------------------------------------
-- FACILITY & ORGANIZATION
-- -----------------------------------------------------

CREATE TABLE facilities (
    facility_id INTEGER PRIMARY KEY,
    facility_code VARCHAR(10) UNIQUE NOT NULL,
    facility_name VARCHAR(100) NOT NULL,
    location_city VARCHAR(50) NOT NULL,
    location_province VARCHAR(50) NOT NULL,
    facility_type VARCHAR(50) NOT NULL, -- 'flagship', 'specialty', 'craft', 'taproom'
    annual_capacity_hl INTEGER NOT NULL,
    employee_count INTEGER NOT NULL,
    opened_date DATE NOT NULL,
    timezone VARCHAR(50) NOT NULL
);

-- Seed: Sleeman's 4 facilities
INSERT INTO facilities VALUES
(1, 'GUE', 'Sleeman Guelph', 'Guelph', 'Ontario', 'flagship', 850000, 450, '1988-01-01', 'America/Toronto'),
(2, 'CHA', 'Unibroue', 'Chambly', 'Quebec', 'specialty', 150000, 120, '1990-06-01', 'America/Montreal'),
(3, 'VER', 'Okanagan Spring', 'Vernon', 'British Columbia', 'craft', 120000, 85, '1985-03-15', 'America/Vancouver'),
(4, 'CAL', 'Wild Rose', 'Calgary', 'Alberta', 'taproom', 25000, 35, '1996-09-01', 'America/Edmonton');

-- -----------------------------------------------------
-- PRODUCTS & BRANDS
-- -----------------------------------------------------

CREATE TABLE brands (
    brand_id INTEGER PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL,
    brand_family VARCHAR(50) NOT NULL, -- 'Sleeman', 'Unibroue', 'Okanagan', 'Wild Rose', 'Value'
    segment VARCHAR(50) NOT NULL, -- 'premium', 'craft', 'value', 'import'
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    sku VARCHAR(20) UNIQUE NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    brand_id INTEGER REFERENCES brands(brand_id),
    style VARCHAR(50) NOT NULL, -- 'lager', 'ale', 'ipa', 'stout', 'wheat', 'specialty'
    abv DECIMAL(3,1) NOT NULL,
    package_type VARCHAR(30) NOT NULL, -- 'bottle_341ml', 'can_355ml', 'can_473ml', 'keg_50l'
    units_per_case INTEGER NOT NULL,
    primary_facility_id INTEGER REFERENCES facilities(facility_id),
    cost_per_hl DECIMAL(10,2) NOT NULL,
    is_seasonal BOOLEAN DEFAULT FALSE,
    created_date DATE NOT NULL
);

-- Sample products
INSERT INTO brands VALUES
(1, 'Sleeman Original', 'Sleeman', 'premium', TRUE),
(2, 'Sleeman Honey Brown', 'Sleeman', 'premium', TRUE),
(3, 'Sleeman Clear 2.0', 'Sleeman', 'premium', TRUE),
(4, 'La Fin du Monde', 'Unibroue', 'craft', TRUE),
(5, 'Blanche de Chambly', 'Unibroue', 'craft', TRUE),
(6, 'Maudite', 'Unibroue', 'craft', TRUE),
(7, 'Okanagan Spring Pale Ale', 'Okanagan', 'craft', TRUE),
(8, 'Okanagan Spring 1516', 'Okanagan', 'craft', TRUE),
(9, 'Wild Rose Wraspberry', 'Wild Rose', 'craft', TRUE),
(10, 'Wild Rose IPA', 'Wild Rose', 'craft', TRUE),
(11, 'Pabst Blue Ribbon', 'Value', 'value', TRUE),
(12, 'Old Milwaukee', 'Value', 'value', TRUE),
(13, 'Sapporo Premium', 'Import', 'import', TRUE);

-- -----------------------------------------------------
-- PRODUCTION DATA
-- -----------------------------------------------------

CREATE TABLE production_batches (
    batch_id INTEGER PRIMARY KEY,
    batch_number VARCHAR(20) UNIQUE NOT NULL,
    facility_id INTEGER REFERENCES facilities(facility_id),
    product_id INTEGER REFERENCES products(product_id),
    batch_size_hl DECIMAL(10,2) NOT NULL,
    brew_date DATE NOT NULL,
    fermentation_start TIMESTAMP,
    fermentation_end TIMESTAMP,
    packaging_date DATE,
    status VARCHAR(30) NOT NULL, -- 'brewing', 'fermenting', 'conditioning', 'packaging', 'complete', 'hold'
    quality_score DECIMAL(5,2), -- 0-100
    yield_percentage DECIMAL(5,2),
    cost_actual DECIMAL(12,2),
    cost_variance_pct DECIMAL(5,2),
    notes TEXT
);

CREATE TABLE fermentation_readings (
    reading_id INTEGER PRIMARY KEY,
    batch_id INTEGER REFERENCES production_batches(batch_id),
    tank_id VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    temperature_c DECIMAL(4,2) NOT NULL,
    specific_gravity DECIMAL(6,4) NOT NULL,
    ph DECIMAL(3,2),
    dissolved_oxygen DECIMAL(5,2), -- ppm
    pressure_psi DECIMAL(5,2),
    status VARCHAR(20) NOT NULL -- 'normal', 'attention', 'critical'
);

CREATE TABLE packaging_runs (
    run_id INTEGER PRIMARY KEY,
    batch_id INTEGER REFERENCES production_batches(batch_id),
    line_id VARCHAR(20) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    target_units INTEGER NOT NULL,
    actual_units INTEGER,
    reject_count INTEGER DEFAULT 0,
    efficiency_pct DECIMAL(5,2),
    downtime_minutes INTEGER DEFAULT 0,
    defect_types JSON -- {'fill_level': 5, 'label': 3, 'seal': 1}
);

-- -----------------------------------------------------
-- INVENTORY & SUPPLY CHAIN
-- -----------------------------------------------------

CREATE TABLE inventory (
    inventory_id INTEGER PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(facility_id),
    product_id INTEGER REFERENCES products(product_id),
    location_type VARCHAR(30) NOT NULL, -- 'warehouse', 'cold_storage', 'distribution_center'
    quantity_cases INTEGER NOT NULL,
    quantity_hl DECIMAL(10,2) NOT NULL,
    lot_number VARCHAR(30),
    production_date DATE,
    expiry_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE raw_materials (
    material_id INTEGER PRIMARY KEY,
    material_name VARCHAR(100) NOT NULL,
    material_type VARCHAR(50) NOT NULL, -- 'malt', 'hops', 'yeast', 'adjunct', 'packaging'
    supplier_id INTEGER,
    unit_of_measure VARCHAR(20) NOT NULL,
    current_stock DECIMAL(12,2) NOT NULL,
    reorder_point DECIMAL(12,2) NOT NULL,
    lead_time_days INTEGER NOT NULL,
    cost_per_unit DECIMAL(10,4) NOT NULL,
    last_delivery_date DATE
);

CREATE TABLE sales_orders (
    order_id INTEGER PRIMARY KEY,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    customer_id INTEGER,
    customer_name VARCHAR(100) NOT NULL,
    customer_type VARCHAR(30) NOT NULL, -- 'distributor', 'retail_chain', 'lcbo', 'saq', 'direct'
    facility_id INTEGER REFERENCES facilities(facility_id),
    order_date DATE NOT NULL,
    requested_date DATE NOT NULL,
    shipped_date DATE,
    status VARCHAR(30) NOT NULL, -- 'pending', 'confirmed', 'picking', 'shipped', 'delivered'
    total_cases INTEGER NOT NULL,
    total_revenue DECIMAL(12,2) NOT NULL,
    province VARCHAR(50) NOT NULL
);

CREATE TABLE sales_order_lines (
    line_id INTEGER PRIMARY KEY,
    order_id INTEGER REFERENCES sales_orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity_cases INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(12,2) NOT NULL
);

-- -----------------------------------------------------
-- DEMAND & FORECASTING
-- -----------------------------------------------------

CREATE TABLE demand_forecast (
    forecast_id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    facility_id INTEGER REFERENCES facilities(facility_id),
    forecast_date DATE NOT NULL,
    period_type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
    forecast_quantity_cases INTEGER NOT NULL,
    forecast_quantity_hl DECIMAL(10,2) NOT NULL,
    confidence_level DECIMAL(5,2) NOT NULL, -- 0-100
    actual_quantity_cases INTEGER, -- filled in after period ends
    forecast_error_pct DECIMAL(6,2), -- calculated variance
    model_version VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE demand_drivers (
    driver_id INTEGER PRIMARY KEY,
    forecast_id INTEGER REFERENCES demand_forecast(forecast_id),
    driver_type VARCHAR(50) NOT NULL, -- 'seasonality', 'promotion', 'weather', 'event', 'trend'
    driver_name VARCHAR(100) NOT NULL,
    impact_pct DECIMAL(6,2) NOT NULL, -- positive or negative impact
    confidence DECIMAL(5,2) NOT NULL
);

-- -----------------------------------------------------
-- EQUIPMENT & MAINTENANCE
-- -----------------------------------------------------

CREATE TABLE equipment (
    equipment_id INTEGER PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(facility_id),
    equipment_code VARCHAR(30) UNIQUE NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(50) NOT NULL, -- 'fermenter', 'bright_tank', 'filler', 'labeler', 'pump', 'chiller'
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    install_date DATE NOT NULL,
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    health_score DECIMAL(5,2), -- 0-100
    status VARCHAR(30) NOT NULL -- 'operational', 'maintenance', 'degraded', 'offline'
);

CREATE TABLE maintenance_events (
    event_id INTEGER PRIMARY KEY,
    equipment_id INTEGER REFERENCES equipment(equipment_id),
    event_type VARCHAR(50) NOT NULL, -- 'preventive', 'corrective', 'emergency', 'inspection'
    scheduled_date DATE,
    actual_date DATE,
    duration_hours DECIMAL(6,2),
    cost DECIMAL(10,2),
    description TEXT,
    parts_used JSON,
    technician VARCHAR(100),
    status VARCHAR(30) NOT NULL -- 'scheduled', 'in_progress', 'complete', 'cancelled'
);

CREATE TABLE equipment_alerts (
    alert_id INTEGER PRIMARY KEY,
    equipment_id INTEGER REFERENCES equipment(equipment_id),
    alert_type VARCHAR(50) NOT NULL, -- 'vibration', 'temperature', 'pressure', 'performance'
    severity VARCHAR(20) NOT NULL, -- 'info', 'warning', 'critical'
    message TEXT NOT NULL,
    detected_at TIMESTAMP NOT NULL,
    acknowledged_at TIMESTAMP,
    resolved_at TIMESTAMP,
    predicted_failure_date DATE, -- for predictive alerts
    failure_probability DECIMAL(5,2) -- 0-100
);

-- -----------------------------------------------------
-- ENERGY & SUSTAINABILITY
-- -----------------------------------------------------

CREATE TABLE energy_consumption (
    consumption_id INTEGER PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(facility_id),
    reading_date DATE NOT NULL,
    electricity_kwh DECIMAL(12,2) NOT NULL,
    natural_gas_m3 DECIMAL(12,2) NOT NULL,
    water_liters DECIMAL(14,2) NOT NULL,
    steam_kg DECIMAL(12,2),
    co2_emissions_kg DECIMAL(12,2),
    production_hl DECIMAL(10,2) NOT NULL, -- for per-hl calculations
    electricity_cost DECIMAL(10,2),
    gas_cost DECIMAL(10,2),
    water_cost DECIMAL(10,2)
);

-- -----------------------------------------------------
-- COMPLIANCE & EXCISE
-- -----------------------------------------------------

CREATE TABLE excise_duty_rates (
    rate_id INTEGER PRIMARY KEY,
    effective_date DATE NOT NULL,
    end_date DATE,
    rate_tier VARCHAR(50) NOT NULL, -- 'small_brewer_tier1', 'small_brewer_tier2', 'standard'
    rate_per_hl DECIMAL(10,4) NOT NULL,
    abv_threshold_low DECIMAL(3,1),
    abv_threshold_high DECIMAL(3,1),
    province VARCHAR(50) -- NULL for federal
);

CREATE TABLE excise_duty_calculations (
    calculation_id INTEGER PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(facility_id),
    period_month INTEGER NOT NULL,
    period_year INTEGER NOT NULL,
    total_production_hl DECIMAL(12,2) NOT NULL,
    taxable_removals_hl DECIMAL(12,2) NOT NULL,
    exempt_hl DECIMAL(12,2) DEFAULT 0, -- exports, samples, etc.
    duty_rate_applied DECIMAL(10,4) NOT NULL,
    gross_duty DECIMAL(12,2) NOT NULL,
    adjustments DECIMAL(12,2) DEFAULT 0,
    net_duty_payable DECIMAL(12,2) NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    status VARCHAR(30) NOT NULL -- 'draft', 'pending_review', 'submitted', 'confirmed'
);

-- -----------------------------------------------------
-- QUALITY & LAB
-- -----------------------------------------------------

CREATE TABLE quality_tests (
    test_id INTEGER PRIMARY KEY,
    batch_id INTEGER REFERENCES production_batches(batch_id),
    test_type VARCHAR(50) NOT NULL, -- 'chemical', 'microbiological', 'sensory', 'packaging'
    test_date TIMESTAMP NOT NULL,
    parameter VARCHAR(50) NOT NULL,
    target_value DECIMAL(10,4),
    actual_value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20),
    pass_fail VARCHAR(10) NOT NULL,
    tested_by VARCHAR(100),
    notes TEXT
);

CREATE TABLE sensory_evaluations (
    eval_id INTEGER PRIMARY KEY,
    batch_id INTEGER REFERENCES production_batches(batch_id),
    eval_date DATE NOT NULL,
    panel_size INTEGER NOT NULL,
    appearance_score DECIMAL(4,2), -- 1-10
    aroma_score DECIMAL(4,2),
    taste_score DECIMAL(4,2),
    mouthfeel_score DECIMAL(4,2),
    overall_score DECIMAL(4,2),
    pass_fail VARCHAR(10) NOT NULL,
    comments TEXT
);

-- -----------------------------------------------------
-- AUDIT & LOGGING
-- -----------------------------------------------------

CREATE TABLE query_audit_log (
    log_id INTEGER PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    natural_language_query TEXT NOT NULL,
    generated_sql TEXT NOT NULL,
    execution_time_ms INTEGER,
    rows_returned INTEGER,
    facility_context VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    success BOOLEAN NOT NULL
);

CREATE TABLE report_generation_log (
    log_id INTEGER PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    parameters JSON,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_status VARCHAR(30), -- 'auto_approved', 'pending', 'approved', 'rejected'
    approved_by VARCHAR(100),
    approved_at TIMESTAMP,
    export_format VARCHAR(20),
    recipient_emails JSON
);

-- -----------------------------------------------------
-- VIEWS FOR COMMON QUERIES
-- -----------------------------------------------------

-- Cross-facility production comparison
CREATE VIEW v_facility_production_summary AS
SELECT 
    f.facility_id,
    f.facility_name,
    f.facility_code,
    DATE_TRUNC('month', pb.brew_date) as month,
    COUNT(pb.batch_id) as batch_count,
    SUM(pb.batch_size_hl) as total_production_hl,
    AVG(pb.quality_score) as avg_quality_score,
    AVG(pb.yield_percentage) as avg_yield_pct,
    SUM(pb.cost_actual) as total_cost,
    SUM(pb.cost_actual) / NULLIF(SUM(pb.batch_size_hl), 0) as cost_per_hl
FROM facilities f
LEFT JOIN production_batches pb ON f.facility_id = pb.facility_id
GROUP BY f.facility_id, f.facility_name, f.facility_code, DATE_TRUNC('month', pb.brew_date);

-- Inventory health by facility
CREATE VIEW v_inventory_health AS
SELECT 
    f.facility_id,
    f.facility_name,
    p.product_name,
    b.brand_name,
    i.quantity_cases,
    i.quantity_hl,
    i.expiry_date,
    CASE 
        WHEN i.expiry_date < CURRENT_DATE THEN 'expired'
        WHEN i.expiry_date < CURRENT_DATE + INTERVAL '30 days' THEN 'expiring_soon'
        ELSE 'good'
    END as freshness_status,
    df.forecast_quantity_cases as next_month_forecast,
    i.quantity_cases - COALESCE(df.forecast_quantity_cases, 0) as projected_variance
FROM inventory i
JOIN facilities f ON i.facility_id = f.facility_id
JOIN products p ON i.product_id = p.product_id
JOIN brands b ON p.brand_id = b.brand_id
LEFT JOIN demand_forecast df ON i.product_id = df.product_id 
    AND i.facility_id = df.facility_id
    AND df.forecast_date = DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month');

-- Equipment health dashboard
CREATE VIEW v_equipment_health AS
SELECT 
    f.facility_id,
    f.facility_name,
    e.equipment_id,
    e.equipment_code,
    e.equipment_name,
    e.equipment_type,
    e.health_score,
    e.status,
    e.next_maintenance_date,
    COALESCE(
        (SELECT COUNT(*) FROM equipment_alerts ea 
         WHERE ea.equipment_id = e.equipment_id 
         AND ea.resolved_at IS NULL), 0
    ) as open_alerts,
    COALESCE(
        (SELECT MAX(failure_probability) FROM equipment_alerts ea 
         WHERE ea.equipment_id = e.equipment_id 
         AND ea.resolved_at IS NULL), 0
    ) as max_failure_risk
FROM equipment e
JOIN facilities f ON e.facility_id = f.facility_id;
```

## 4.2 Seed Data Generation Script

```typescript
// lib/db/seed.ts

import { db } from './connection';

export async function seedDemoData() {
  // Generate 12 months of production batches
  const facilities = [1, 2, 3, 4]; // GUE, CHA, VER, CAL
  const products = await db.select().from(products);
  
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const date = new Date();
    date.setMonth(date.getMonth() - monthOffset);
    
    for (const facilityId of facilities) {
      // Number of batches varies by facility size
      const batchCount = facilityId === 1 ? 45 : facilityId === 4 ? 8 : 20;
      
      for (let i = 0; i < batchCount; i++) {
        await generateProductionBatch(facilityId, date, products);
      }
    }
  }
  
  // Generate demand forecasts
  await generateDemandForecasts();
  
  // Generate equipment data and alerts
  await generateEquipmentData();
  
  // Generate energy consumption data
  await generateEnergyData();
  
  // Generate excise duty calculations
  await generateExciseDutyData();
  
  // Generate sales orders
  await generateSalesOrders();
  
  console.log('Demo data seeded successfully');
}

async function generateProductionBatch(facilityId: number, baseDate: Date, products: Product[]) {
  // Filter products for this facility
  const facilityProducts = products.filter(p => 
    p.primary_facility_id === facilityId || Math.random() > 0.7
  );
  
  const product = facilityProducts[Math.floor(Math.random() * facilityProducts.length)];
  
  // Realistic batch sizes by facility
  const batchSizes = {
    1: [200, 300, 400, 500], // Guelph - large batches
    2: [50, 75, 100, 150],   // Unibroue - medium specialty
    3: [75, 100, 150],       // Okanagan - medium craft
    4: [20, 30, 40],         // Wild Rose - small craft
  };
  
  const batchSize = batchSizes[facilityId][Math.floor(Math.random() * batchSizes[facilityId].length)];
  
  // Quality score with slight variation by facility (Unibroue highest)
  const baseQuality = facilityId === 2 ? 92 : 88;
  const qualityScore = baseQuality + (Math.random() * 10 - 3);
  
  // Yield typically 95-99%
  const yieldPct = 95 + Math.random() * 4;
  
  // Cost variance -5% to +10%
  const costVariance = -5 + Math.random() * 15;
  
  const batch = {
    batch_number: `${facilityId}-${baseDate.getFullYear()}${String(baseDate.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
    facility_id: facilityId,
    product_id: product.product_id,
    batch_size_hl: batchSize,
    brew_date: baseDate,
    fermentation_start: new Date(baseDate.getTime() + 4 * 60 * 60 * 1000), // 4 hours after brew
    fermentation_end: new Date(baseDate.getTime() + (7 + Math.random() * 7) * 24 * 60 * 60 * 1000), // 7-14 days
    packaging_date: new Date(baseDate.getTime() + (14 + Math.random() * 7) * 24 * 60 * 60 * 1000),
    status: 'complete',
    quality_score: qualityScore,
    yield_percentage: yieldPct,
    cost_actual: batchSize * product.cost_per_hl * (1 + costVariance / 100),
    cost_variance_pct: costVariance,
  };
  
  await db.insert(production_batches).values(batch);
  
  // Generate fermentation readings for this batch
  await generateFermentationReadings(batch);
}

// Additional seed functions...
```

---

# PART 5: AI AGENT IMPLEMENTATION

## 5.1 LangChain Agent Configuration

```typescript
// lib/ai/agent.ts

import { ChatOpenAI } from '@langchain/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { DataSource } from 'typeorm';

const SYSTEM_PROMPT = `You are BrewMind, an AI data analyst assistant for Sleeman Breweries. 
You help brewery professionals query and analyze operational data across four facilities:
- Guelph (GUE): Flagship facility, largest production
- Chambly (CHA): Unibroue specialty Belgian-style ales
- Vernon (VER): Okanagan Spring craft brewery
- Calgary (CAL): Wild Rose craft taproom

You have access to a comprehensive brewery database including:
- Production data (batches, fermentation, packaging)
- Inventory and supply chain data
- Quality and lab results
- Equipment and maintenance records
- Energy consumption and sustainability metrics
- Sales orders and demand forecasts
- Excise duty and compliance data

When responding:
1. ALWAYS show the SQL query you're executing (for transparency and audit)
2. Explain your reasoning in plain English
3. Present data in clear tables or suggest visualizations
4. Flag any anomalies or insights you notice
5. If asked about trends, compare to historical averages
6. For compliance questions, be precise and cite relevant regulations

Current user context:
- Facility: {facilityContext}
- Role: {userRole}
- Date: {currentDate}

Remember: You're helping business users who may not know SQL. Make insights actionable.`;

export async function createBrewMindAgent(config: {
  facilityId?: number;
  userRole?: string;
  streaming?: boolean;
  callbacks?: any[];
}) {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE_PATH || './brewmind.db',
  });

  await dataSource.initialize();

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: dataSource,
    sampleRowsInTableInfo: 3,
    includesTables: [
      'facilities',
      'brands',
      'products',
      'production_batches',
      'fermentation_readings',
      'packaging_runs',
      'inventory',
      'sales_orders',
      'demand_forecast',
      'equipment',
      'maintenance_events',
      'equipment_alerts',
      'energy_consumption',
      'excise_duty_calculations',
      'quality_tests',
      'v_facility_production_summary',
      'v_inventory_health',
      'v_equipment_health',
    ],
  });

  const llm = new ChatOpenAI({
    modelName: 'gpt-4-turbo-preview',
    temperature: 0,
    streaming: config.streaming,
    callbacks: config.callbacks,
  });

  const toolkit = new SqlToolkit(db, llm);

  const agent = createSqlAgent(llm, toolkit, {
    prefix: SYSTEM_PROMPT
      .replace('{facilityContext}', config.facilityId ? `Facility ${config.facilityId}` : 'All Facilities')
      .replace('{userRole}', config.userRole || 'Analyst')
      .replace('{currentDate}', new Date().toISOString().split('T')[0]),
    topK: 10,
  });

  return agent;
}
```

## 5.2 Text-to-SQL Implementation

```typescript
// lib/ai/text-to-sql.ts

import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

const SQL_GENERATION_PROMPT = `You are an expert SQL query generator for a brewery database.
Given a natural language question, generate a SQL query to answer it.

Database Schema Summary:
{schema}

Important Notes:
- Facility codes: GUE (Guelph), CHA (Chambly/Unibroue), VER (Vernon/Okanagan), CAL (Calgary/Wild Rose)
- Use views when available (v_facility_production_summary, v_inventory_health, v_equipment_health)
- For date ranges, use DATE functions appropriately
- Always include facility_name in results for clarity
- Round decimal values to 2 places for readability

User Question: {question}

Respond with a JSON object containing:
{{
  "sql": "the SQL query",
  "explanation": "plain English explanation of what this query does",
  "confidence": 0.0-1.0 confidence score,
  "suggestedVisualization": "table|bar_chart|line_chart|pie_chart|none"
}}`;

export async function generateSQL(naturalLanguageQuery: string) {
  const llm = new ChatOpenAI({
    modelName: 'gpt-4-turbo-preview',
    temperature: 0,
  });

  const prompt = PromptTemplate.fromTemplate(SQL_GENERATION_PROMPT);
  
  const schema = await getSchemaDescription();
  
  const response = await llm.invoke(
    await prompt.format({
      schema,
      question: naturalLanguageQuery,
    })
  );

  return JSON.parse(response.content as string);
}

async function getSchemaDescription(): Promise<string> {
  // Return condensed schema for context window efficiency
  return `
Tables:
- facilities (facility_id, facility_code, facility_name, location_city, location_province, facility_type, annual_capacity_hl)
- products (product_id, sku, product_name, brand_id, style, abv, package_type, cost_per_hl)
- brands (brand_id, brand_name, brand_family, segment)
- production_batches (batch_id, batch_number, facility_id, product_id, batch_size_hl, brew_date, quality_score, yield_percentage, cost_actual)
- inventory (inventory_id, facility_id, product_id, quantity_cases, quantity_hl, expiry_date)
- sales_orders (order_id, customer_name, customer_type, facility_id, order_date, total_cases, total_revenue, province)
- demand_forecast (forecast_id, product_id, facility_id, forecast_date, forecast_quantity_cases, confidence_level)
- equipment (equipment_id, facility_id, equipment_code, equipment_name, equipment_type, health_score, status)
- equipment_alerts (alert_id, equipment_id, alert_type, severity, predicted_failure_date, failure_probability)
- energy_consumption (facility_id, reading_date, electricity_kwh, natural_gas_m3, water_liters, production_hl)
- excise_duty_calculations (facility_id, period_month, period_year, total_production_hl, net_duty_payable)

Views:
- v_facility_production_summary (facility metrics by month)
- v_inventory_health (inventory with freshness and forecast)
- v_equipment_health (equipment with alert counts)
  `;
}
```

## 5.3 Chat Interface Component

```typescript
// components/chat/chat-interface.tsx

'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './message-bubble';
import { QueryResult } from './query-result';
import { SuggestedQueries } from './suggested-queries';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  facilityId?: number;
  userRole?: string;
}

export function ChatInterface({ facilityId, userRole }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      facilityId,
      userRole,
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedQueries = [
    "What was our production cost per hectoliter by facility last quarter?",
    "Show me the top 5 products by sales volume this month",
    "Compare quality scores across all four facilities",
    "Which equipment has the highest failure risk right now?",
    "What's our current inventory health by brand?",
    "Calculate excise duty for Guelph facility for November 2025",
    "Show demand forecast accuracy by product for the last 6 months",
    "What are the energy consumption trends per hectoliter?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold">BrewMind AI Assistant</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {facilityId ? `Facility: ${facilityId}` : 'All Facilities'} | 
          Role: {userRole || 'Analyst'}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Welcome to BrewMind
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                I'm your AI data analyst. Ask me anything about production, 
                inventory, quality, equipment, or compliance across all 
                Sleeman facilities.
              </p>
            </div>
            
            <SuggestedQueries 
              queries={suggestedQueries}
              onSelect={(query) => {
                handleInputChange({ target: { value: query } } as any);
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing your question...</span>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything about Sleeman's operations..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          All queries are logged for audit compliance. 
          Press Enter or click Send to submit.
        </p>
      </div>
    </div>
  );
}
```

---

# PART 6: DEMO FLOW & SCRIPT

## 6.1 Demo Sequence (45 minutes)

### Opening (5 minutes)

**Talking Points for Brian:**
1. "Brian, we've built this demo specifically around challenges we understand you face - data silos across Oracle, PlantPAx, and your four facilities."
2. "What we're about to show is how any business user - from Jennifer in Supply Chain to your plant managers - can query enterprise data in natural language, without a single IT ticket."
3. "The governance you need is built in - every query is logged, auditable, and respects your existing access controls."

### Demo Section 1: Jennifer's Workflow (15 minutes)
**Persona Focus: Supply Chain Director**

Navigate to: `/assistant`

**Live Queries to Demonstrate:**

```
Query 1: "What was our production cost per hectoliter by facility for Q3 2025?"

Expected Response:
- Shows SQL query (transparency)
- Table with Guelph, Unibroue, Okanagan, Wild Rose
- Bar chart visualization
- Insight: "Chambly has 12% higher cost per HL due to specialty ingredients"
```

```
Query 2: "Compare demand forecast accuracy across all products for the last 6 months"

Expected Response:
- Forecast vs Actual table
- MAPE calculation by product
- Highlight: "Sleeman Original shows 94% accuracy; seasonal products need attention"
```

```
Query 3: "Show me inventory at risk of expiring in the next 30 days by facility"

Expected Response:
- Inventory health table
- Expiry risk highlighting
- Actionable: "Vernon has 450 cases of Pale Ale expiring - recommend promotional pricing"
```

**Talking Point:** "Brian, this is Jennifer's 8-day monthly planning process compressed to minutes. She can now self-serve these insights without waiting for your team."

### Demo Section 2: Cross-Facility Benchmarking (10 minutes)
**Feature 13 - Key for Brian's Executive Reporting**

Navigate to: `/analytics/cross-facility`

**Live Queries:**

```
Query 4: "Rank all four facilities by overall equipment effectiveness (OEE) this quarter"

Expected Response:
- Facility ranking with OEE scores
- Breakdown: Availability × Performance × Quality
- Best practice highlight: "Guelph's packaging line 3 achieves 89% OEE - benchmark for other facilities"
```

```
Query 5: "Show me quality scores by facility and brand family, with trend indicators"

Expected Response:
- Matrix view: Facilities × Brand Families
- Color-coded scores (green/yellow/red)
- Trend arrows (improving/declining)
- Insight: "Unibroue maintains highest quality (96.2 avg) - specialty process pays off"
```

**Talking Point:** "This is the kind of cross-facility visibility that Sapporo executives would want to see. You can generate these benchmarks on-demand or schedule them for monthly reporting."

### Demo Section 3: Predictive Maintenance (5 minutes)
**Preventing Equipment Failures**

Navigate to: `/operations/maintenance`

**Live Query:**

```
Query 6: "Which equipment across all facilities has the highest failure probability in the next 30 days?"

Expected Response:
- Equipment list with failure probability
- Predicted failure date
- Recommended action
- Cost impact if failure occurs
- Example: "Guelph Filler #2 - 78% failure probability by Dec 15. Recommended: Schedule PM during next planned downtime. Estimated cost avoidance: $45,000"
```

**Talking Point:** "This is predictive maintenance in action. Instead of reactive repairs, your team can schedule maintenance proactively. The PRD targets preventing 2+ major failures per year."

### Demo Section 4: Compliance Automation (5 minutes)
**Excise Duty - Feature 9**

Navigate to: `/compliance/excise-duty`

**Live Query:**

```
Query 7: "Calculate excise duty for all facilities for November 2025, broken down by rate tier"

Expected Response:
- Facility-by-facility duty calculation
- Rate tier breakdown (small brewer vs standard)
- Total duty payable
- Comparison to previous month
- Audit trail reference
```

**Talking Point:** "Brian, this addresses your compliance burden directly. Instead of manual calculations and Excel reconciliation, the system computes duty automatically from production data, with full audit trails for CRA."

### Demo Section 5: AI Report Generation (5 minutes)
**Streaming Report Creation**

Navigate to: `/reports/generator`

**Demonstrate:**
1. Select report type: "Monthly Executive Summary"
2. Parameters: All facilities, November 2025
3. Show streaming generation of report sections
4. Highlight approval workflow: "Draft created → Pending Jennifer's approval → Auto-distribute to Sapporo"

**Talking Point:** "This is the report automation you mentioned wanting. The AI generates the first draft from real data, a human approves it, then it's distributed automatically. Your team doesn't write reports - they review them."

### Closing (5 minutes)

**Summary Slides:**
1. Jennifer's workflow: 8 days → 1 day (87% time savings)
2. Cross-facility visibility: Real-time benchmarking
3. Predictive maintenance: Prevent $100K+ in failures annually
4. Compliance: Automated excise calculations
5. Governance: Full audit trail, access controls, Sapporo-ready reporting

**Brian's Win Statement:**
> "Brian, you have the opportunity to be the leader who democratized data at Sleeman. Every business user empowered to get insights instantly. Your team freed from ad-hoc reporting to focus on strategic projects. And a platform that makes you look like an innovator to Sapporo."

**Next Steps:**
1. Technical deep-dive with your Oracle/PlantPAx integration team
2. Pilot scope definition (suggest: Guelph facility first)
3. ROI model customization for your PMO

---

# PART 7: IMPLEMENTATION CHECKLIST

## 7.1 Pre-Demo Build Checklist

### Database Setup (Priority 1)
- [ ] Create SQLite database with schema
- [ ] Run seed script for 12 months of synthetic data
- [ ] Verify all views are created and returning data
- [ ] Test queries for each demo scenario

### API Routes (Priority 1)
- [ ] `/api/chat` - Streaming chat endpoint working
- [ ] `/api/query` - Text-to-SQL execution working
- [ ] `/api/analytics/cross-facility` - Benchmarking data
- [ ] `/api/compliance/excise-duty` - Duty calculations
- [ ] `/api/reports/generate` - Report streaming

### UI Components (Priority 1)
- [ ] Sidebar navigation complete
- [ ] Chat interface with streaming
- [ ] Query result visualization (tables + charts)
- [ ] Cross-facility comparison dashboard
- [ ] Report generator with approval workflow

### AI Agent (Priority 1)
- [ ] LangChain agent configured with schema
- [ ] System prompt optimized for brewing domain
- [ ] SQL generation accurate for demo queries
- [ ] Streaming responses working smoothly

### Styling & Polish (Priority 2)
- [ ] Sleeman branding (colors, logo)
- [ ] Loading states and animations
- [ ] Error handling and fallbacks
- [ ] Mobile responsiveness (if showing on tablet)

### Demo Readiness (Priority 1)
- [ ] All 7 demo queries tested and working
- [ ] Backup responses prepared if AI fails
- [ ] Demo script printed/available
- [ ] Backup laptop/connection ready

## 7.2 Post-Demo Deliverables

- [ ] Recording of demo (if permitted)
- [ ] Follow-up email with key points
- [ ] Technical architecture document for IT team
- [ ] ROI calculator spreadsheet
- [ ] Pilot proposal document
- [ ] Reference customer list (if available)

---

# APPENDIX A: Environment Variables

```env
# Database
DATABASE_PATH=./brewmind.db

# AI
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Redis (for streaming)
UPSTASH_REDIS_URL=https://...
UPSTASH_REDIS_TOKEN=...

# Auth (demo mode)
NEXTAUTH_SECRET=demo-secret-change-in-prod
NEXTAUTH_URL=http://localhost:3000

# Feature Flags
ENABLE_AUDIT_LOGGING=true
ENABLE_REPORT_APPROVAL=true
DEMO_MODE=true
```

---

# APPENDIX B: Demo User Accounts

| User | Role | Facility Access | Password |
|------|------|-----------------|----------|
| jennifer.wilson | Supply Chain Director | All | demo123 |
| sarah.brewmaster | Head Brewmaster | Guelph | demo123 |
| pierre.quality | Quality Manager | Chambly | demo123 |
| brian.admin | IT Director | All | demo123 |

---

*Document Version: 1.0*
*Created: December 2025*
*For: Brian Cappellaro Demo - Sleeman Breweries*
