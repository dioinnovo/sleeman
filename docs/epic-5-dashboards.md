# Epic 5: Dashboard Pages (Must-Have)

**Status**: 🔄 In Progress
**Priority**: 🔴 Critical
**Estimated Effort**: 6-8 hours

---

## Overview

This epic creates the essential dashboard pages for the BrewMind demo, showcasing brewery-specific analytics, quality control, distribution management, and reporting capabilities.

---

## Stories

| Story | Description | Status | File |
|-------|-------------|--------|------|
| 5.1 | Main Dashboard with KPI cards | 🔄 Partial | `/dashboard/page.tsx` |
| 5.2 | Quality Control page | ✅ Complete | `/dashboard/compliance/page.tsx` |
| 5.3 | Distribution page | ✅ Complete | `/dashboard/distribution/page.tsx` |
| 5.4 | Reports page | ⏳ Pending | `/dashboard/reports/page.tsx` |
| 5.5 | Integrations page | ⏳ Pending | `/dashboard/integrations/page.tsx` |
| 5.6 | Barley AI Assistant page | ✅ Complete | `/dashboard/assistant/page.tsx` |

---

## Story 5.1: Main Dashboard 🔄

### Current State
- Basic dashboard layout exists
- Needs brewery-specific KPI cards

### Required KPI Cards

| Metric | Source | Visualization |
|--------|--------|---------------|
| Total Production Volume | production_batches | Number + trend |
| Quality Pass Rate | quality_tests | Percentage + gauge |
| Equipment Utilization | equipment_downtime | Percentage |
| Revenue MTD | monthly_revenue | Currency + trend |
| Active Production Lines | production_lines | Number |
| Pending Quality Issues | quality_issues | Number + badge |

### Required Charts
- Production volume by month (12 months, bar chart)
- Quality metrics trend (line chart)
- Beer style distribution (pie/donut chart)
- Top products by revenue (horizontal bar)

---

## Story 5.2: Quality Control Page ✅ COMPLETE

**File**: `src/app/dashboard/compliance/page.tsx`

### Implemented Sections

1. **Overview Metrics**
   - Quality pass rate
   - Active audits
   - Compliance score
   - Training completion

2. **Recent Quality Audits Table**
   - Audit date, type, status, score

3. **Brewing Standards**
   - Fermentation temperature controls
   - pH level monitoring
   - Gravity readings

4. **Ingredient Quality Control**
   - Malt specifications
   - Hops quality grades
   - Yeast viability

5. **HACCP Compliance**
   - Critical control points
   - Monitoring procedures

6. **LCBO Regulatory Compliance**
   - Labeling requirements
   - Alcohol content verification

7. **Training Modules**
   - Staff certification status

---

## Story 5.3: Distribution Page ✅ COMPLETE

**File**: `src/app/dashboard/distribution/page.tsx`

### Implemented Sections

1. **Distribution Overview KPIs**
   - Active distributors count
   - Total volume YTD (hectoliters)
   - Total revenue YTD
   - Average on-time delivery rate
   - Pending orders
   - In-transit shipments

2. **Regional Distribution Performance**
   - 5 regions: Ontario, Quebec, Western Canada, Atlantic, Export
   - Distributors, volume, revenue, and growth per region

3. **Top Distributors Table**
   - 8 distributors with name, region, type
   - Orders, volume, revenue metrics
   - On-time delivery rate

4. **Recent Shipments**
   - Tracking number, product, status
   - Volume, order date, revenue
   - Status filters (pending, shipped, delivered)

5. **Delivery Performance Summary**
   - Weekly deliveries completed
   - Active in-transit shipments
   - Average transit time
   - Month-over-month growth

6. **Warehouse Inventory Status**
   - Top 4 products with stock levels
   - Allocated vs available inventory

---

## Story 5.4: Reports Page ⏳ PENDING

**File**: `src/app/dashboard/reports/page.tsx`

### Required Reports

1. **Production Summary Report**
   - Monthly production volumes
   - Beer style breakdown
   - Line efficiency metrics

2. **Quality Control Report**
   - Test results summary
   - Issue resolution rates
   - Compliance audit history

3. **Financial Report**
   - Revenue by product
   - Cost analysis
   - Margin calculations

4. **Compliance Report**
   - Regulatory compliance status
   - Audit schedules

### Export Functionality
- PDF export
- Excel/CSV export

---

## Story 5.5: Integrations Page ⏳ PENDING

**File**: `src/app/dashboard/integrations/page.tsx`

### Required Integrations Display

1. **Oracle ERP Connection**
   - Status indicator
   - Last sync timestamp
   - Data flow diagram

2. **PlantPAx DCS Integration**
   - Real-time data connection
   - Production line status

3. **Workday HR Integration**
   - Employee data sync
   - Training records

4. **Data Sync Status**
   - Last update times
   - Error logs

---

## Story 5.6: Barley AI Assistant Page ✅ COMPLETE

**File**: `src/app/dashboard/assistant/page.tsx`

### Implemented Features
- SQL Analytics Chat component
- Natural language query interface
- Quick question categories
- Chart visualization
- Markdown-formatted responses
- Show/Hide SQL toggle

---

## Technical Requirements

### Styling
All pages must use:
- `bg-sleeman-dark` or `bg-sleeman-brown` backgrounds
- `text-gray-100` / `text-gray-300` text colors
- `border-sleeman-brown` borders
- `text-sleeman-gold` accents
- Card styling with `shadow-lg shadow-black/20`

### Components Used
- shadcn/ui Card, Table, Badge
- Recharts for visualizations
- lucide-react icons

### Data Fetching
- Server components with direct database queries
- Or API routes with client-side fetching

---

## Verification Checklist

### Story 5.1 (Main Dashboard)
- [ ] KPI cards display real data
- [ ] Charts render correctly
- [ ] Dark theme applied
- [ ] Responsive on mobile

### Story 5.2 (Quality Control) ✅
- [x] All sections render
- [x] Dark theme applied
- [x] Brewery-specific content

### Story 5.3 (Distribution) ✅
- [x] Page created
- [x] Distributor data displays
- [x] Shipment tracking works
- [x] Dark theme applied
- [x] Regional performance display
- [x] Warehouse inventory status

### Story 5.4 (Reports)
- [ ] Page created
- [ ] Report templates render
- [ ] Export functionality works
- [ ] Dark theme applied

### Story 5.5 (Integrations)
- [ ] Page created
- [ ] Integration status displays
- [ ] Dark theme applied

### Story 5.6 (Barley AI) ✅
- [x] SQL chat works
- [x] Charts display
- [x] Markdown renders
- [x] Dark theme applied

---

## Next Steps

1. ~~Create Distribution page (`/dashboard/distribution/page.tsx`)~~ ✅ COMPLETE
2. Update Reports page with brewery content
3. Update Integrations page with brewery integrations
4. Add brewery KPIs to main dashboard

---

*Epic 5 documentation created December 2, 2024*
