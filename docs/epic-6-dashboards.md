# Epic 6: Dashboard Pages (Nice-to-Have)

**Status**: ✅ Complete
**Completed**: December 2, 2024

## Overview

This epic creates additional dashboard pages for enhanced brewery management capabilities. These pages complement the core dashboards (Epic 5) with specialized views for equipment, inventory, production scheduling, and supplier management.

## Stories Completed

### Story 6.1: Equipment Maintenance Dashboard ✅

**File**: `src/app/dashboard/equipment/page.tsx`

Comprehensive equipment management dashboard with:

**KPI Cards (6)**:
- Operational equipment count
- In maintenance count
- Warning status count
- Average utilization %
- Average efficiency %
- Pending maintenance tasks

**Equipment Grid**:
- 10 equipment entries across Guelph & Vernon facilities
- Types: Fermenter, Bottling, Kegging, Cooling, Boiler, Conveyor
- Status indicators: operational, maintenance, warning, offline
- Utilization and efficiency metrics per equipment
- Location and type filters

**Maintenance Schedule**:
- 5 maintenance tasks with priorities (critical, high, medium, low)
- Status tracking (scheduled, overdue, in-progress)
- Due dates and assigned technicians
- Estimated duration

**Recent Downtime Events**:
- 3 recent downtime records
- Duration, cause, and resolution tracking
- Impact assessment

**Performance Summary**:
- OEE: 94.2%
- MTBF: 847 hours
- MTTR: 2.4 hours
- Uptime: 98.7%

---

### Story 6.2: Inventory Management Page ✅

**File**: `src/app/dashboard/inventory/page.tsx`

Full inventory tracking system with:

**KPI Cards (6)**:
- Total materials (active SKUs)
- Low stock items
- Critical items (urgent restock)
- Inventory value (CAD)
- Pending orders
- In-transit value

**Raw Materials Inventory Table**:
- 10 materials across 6 categories
- Categories: Malt, Hops, Yeast, Adjuncts, Packaging, Chemicals
- Stock level with visual progress bars
- Reorder level indicators
- Location (Guelph/Vernon/Both)
- Supplier information
- Unit cost and total value
- Status: adequate, low, critical, overstocked

**Recent Movements**:
- 5 recent inventory transactions
- Types: received, used, adjusted, transferred
- Reference numbers and users

**Purchase Orders**:
- 4 active purchase orders
- Status: pending, approved, shipped, received
- Expected delivery dates
- Total cost tracking

**Category Summary**:
- 6 category cards with item counts and values
- Restock alerts for categories with issues

---

### Story 6.3: Production Scheduling Page ✅

**File**: `src/app/dashboard/production/page.tsx`

Production planning and batch tracking with:

**KPI Cards (6)**:
- Active batches (currently processing)
- Today's schedule (batches today)
- Delayed batches
- Scheduled volume (hL in pipeline)
- Active lines (running/total)
- Average utilization

**Week Capacity Overview**:
- 7-day calendar view
- Capacity bars (scheduled vs max hL)
- Batch counts per day
- Color-coded capacity indicators (red=90%+, amber=75%+, green=<75%)
- Week navigation controls

**Batch Schedule**:
- 10 scheduled batches
- Status: scheduled, in-progress, fermenting, conditioning, packaging, delayed
- Priority levels (high, medium, low)
- Beer style, production line, facility
- Target volume, assigned crew
- Start date and notes

**Production Lines Status**:
- 5 production lines (3 Guelph, 2 Vernon)
- Status: active, idle, maintenance, changeover
- Current batch assignment
- Today's utilization
- Scheduled batch count

**Batch Status Summary**:
- Count by status type

**Crew Schedule**:
- Today's crew assignments
- On duty / starting status

---

### Story 6.4: Supplier Management Page ✅

**File**: `src/app/dashboard/suppliers/page.tsx`

Supplier relationship management with:

**KPI Cards (6)**:
- Total suppliers
- Preferred suppliers (top tier)
- Average reliability score
- YTD spend
- Pending orders
- Issues (need attention)

**Supplier Directory**:
- 8 suppliers across 7 categories
- Status: preferred, active, under-review, suspended
- Scorecard: overall, reliability, quality, delivery scores
- Contact information
- Location (city, country)
- Order statistics (total orders, total spend)
- Lead time and payment terms
- Certifications (ISO, HACCP, SQF, etc.)

**Recent Orders**:
- 5 recent purchase orders
- Status: pending, confirmed, shipped, delivered, issue
- Material, quantity, amount

**Performance Leaders**:
- Top 5 suppliers by performance
- On-time delivery and quality acceptance rates
- Trend indicators (up, down, stable)

**Spend by Category**:
- Horizontal bar chart by category
- Percentage of total spend

---

## Verification Checklist

- [x] Equipment page loads at `/dashboard/equipment`
- [x] Equipment filters work (location, status)
- [x] Maintenance tasks display correctly
- [x] Downtime events show
- [x] Inventory page loads at `/dashboard/inventory`
- [x] Inventory filters work (category, location, status)
- [x] Stock levels display with progress bars
- [x] Purchase orders show status
- [x] Production page loads at `/dashboard/production`
- [x] Week capacity calendar displays
- [x] Batch schedule filters work
- [x] Production line status shows
- [x] Suppliers page loads at `/dashboard/suppliers`
- [x] Supplier cards show scorecards
- [x] Performance leaderboard displays
- [x] All pages use Sleeman dark theme

---

## Files Created

| File | Description | Lines |
|------|-------------|-------|
| `src/app/dashboard/equipment/page.tsx` | Equipment Maintenance Dashboard | ~500 |
| `src/app/dashboard/inventory/page.tsx` | Inventory Management Page | ~450 |
| `src/app/dashboard/production/page.tsx` | Production Scheduling Page | ~480 |
| `src/app/dashboard/suppliers/page.tsx` | Supplier Management Page | ~470 |

---

## Technical Architecture

### Page Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               NICE-TO-HAVE DASHBOARD PAGES                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │     Equipment Maintenance (/dashboard/equipment)        ││
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐││
│  │  │  KPIs  │ │ Equip  │ │ Maint  │ │ Down   │ │Summary │││
│  │  │(6 card)│ │ Grid   │ │Schedule│ │ Events │ │  OEE   │││
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │       Inventory Management (/dashboard/inventory)       ││
│  │  ┌────────┐ ┌────────────────┐ ┌──────────────────────┐││
│  │  │  KPIs  │ │ Materials Table│ │ Movements + Orders   │││
│  │  │(6 card)│ │ (w/ filters)   │ │ + Category Summary   │││
│  │  └────────┘ └────────────────┘ └──────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │      Production Scheduling (/dashboard/production)      ││
│  │  ┌────────┐ ┌──────────────┐ ┌────────────────────────┐││
│  │  │  KPIs  │ │Week Capacity │ │ Batch Schedule + Lines │││
│  │  │(6 card)│ │   Calendar   │ │ + Status + Crews       │││
│  │  └────────┘ └──────────────┘ └────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │        Supplier Management (/dashboard/suppliers)       ││
│  │  ┌────────┐ ┌──────────────┐ ┌────────────────────────┐││
│  │  │  KPIs  │ │  Supplier    │ │ Orders + Leaders +     │││
│  │  │(6 card)│ │  Directory   │ │ Spend by Category      │││
│  │  └────────┘ └──────────────┘ └────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Component Patterns

All pages follow consistent patterns:

1. **PageHeader**: Title and description
2. **KPI Cards Grid**: 6 cards in responsive grid (2/3/6 columns)
3. **Filters Section**: Search + category/status dropdowns
4. **Main Content**: 2/3 grid with primary content (2 cols) + sidebar (1 col)
5. **Summary Section**: Gradient background with aggregated data

### Data Types (TypeScript Interfaces)

| Page | Primary Interface | Supporting Interfaces |
|------|-------------------|----------------------|
| Equipment | `Equipment` | `MaintenanceTask`, `DowntimeEvent` |
| Inventory | `RawMaterial` | `InventoryMovement`, `PurchaseOrder` |
| Production | `ScheduledBatch` | `ProductionLine`, `DailyCapacity` |
| Suppliers | `Supplier` | `SupplierOrder`, `SupplierPerformance` |

### Status Color Functions

Each page includes helper functions for consistent status coloring:

```typescript
// Example from Equipment page
const getStatusColor = (status: Equipment['status']) => {
  switch (status) {
    case 'operational':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'maintenance':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'warning':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'offline':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}
```

### Theme Integration

| Color Variable | Hex | Usage |
|---------------|-----|-------|
| `bg-sleeman-dark` | #1C1812 | Page backgrounds |
| `text-sleeman-gold` | #D4A84B | Primary accent, icons |
| `bg-sleeman-brown/50` | rgba | Card backgrounds |
| `border-sleeman-gold/20` | rgba | Card borders |
| `bg-sleeman-gold/5` | rgba | Hover states |

### Routing

| URL | Component | Description |
|-----|-----------|-------------|
| `/dashboard/equipment` | `equipment/page.tsx` | Equipment maintenance |
| `/dashboard/inventory` | `inventory/page.tsx` | Inventory management |
| `/dashboard/production` | `production/page.tsx` | Production scheduling |
| `/dashboard/suppliers` | `suppliers/page.tsx` | Supplier management |

---

## Design Decisions

1. **Mock Data**: All pages use client-side mock data for demo purposes. In production, these would connect to the PostgreSQL database via API routes.

2. **Consistent Layout**: All 4 pages follow the same layout pattern (KPIs → Filters → 2/3 Grid) for user familiarity.

3. **Rich Status Indicators**: Each entity type has multiple status states with distinct colors for quick visual scanning.

4. **Brewery-Specific Metrics**: Metrics like OEE (Overall Equipment Effectiveness), MTBF (Mean Time Between Failures), and hectoliters align with brewery industry standards.

5. **Facility Support**: All pages support multi-facility (Guelph/Vernon) filtering where applicable.

6. **No Navigation Updates**: These pages are accessible via direct URL but not added to the main sidebar navigation to keep the demo focused on core features.

---

## Next Epic

**Epic 10: Demo Testing & Polish** - End-to-end testing and final polish before demo.

---

*Epic 6 completed December 2, 2024*
