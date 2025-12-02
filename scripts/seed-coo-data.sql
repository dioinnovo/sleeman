-- ============================================================
-- Sleeman Breweries COO Financial Data Enhancement
-- Version: 1.0
-- Date: 2024
-- Purpose: Add comprehensive financial data for COO demo
-- ============================================================

-- ============================================================
-- PHASE 1: SCHEMA CHANGES
-- ============================================================

-- 1.1 Add Cost Impact columns to Quality Issues
ALTER TABLE quality_issues
ADD COLUMN IF NOT EXISTS cost_impact NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS labor_hours_lost NUMERIC(8,2),
ADD COLUMN IF NOT EXISTS material_waste_cost NUMERIC(12,2);

-- 1.2 Add Financial Fields to Equipment
ALTER TABLE equipment
ADD COLUMN IF NOT EXISTS purchase_cost NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS useful_life_years INT,
ADD COLUMN IF NOT EXISTS salvage_value NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS annual_depreciation NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS accumulated_depreciation NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS net_book_value NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS maintenance_budget_annual NUMERIC(12,2);

-- 1.3 Create Operating Expenses Table
CREATE TABLE IF NOT EXISTS operating_expenses (
  id SERIAL PRIMARY KEY,
  facility VARCHAR(50) NOT NULL,
  expense_category VARCHAR(50) NOT NULL,
  expense_type VARCHAR(100),
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  year INT NOT NULL CHECK (year >= 2020 AND year <= 2030),
  budgeted_amount NUMERIC(14,2),
  actual_amount NUMERIC(14,2),
  variance NUMERIC(14,2) GENERATED ALWAYS AS (actual_amount - budgeted_amount) STORED,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT operating_expenses_unique UNIQUE (facility, expense_category, month, year)
);

-- 1.4 Create Labor Costs Table
CREATE TABLE IF NOT EXISTS labor_costs (
  id SERIAL PRIMARY KEY,
  facility VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  year INT NOT NULL CHECK (year >= 2020 AND year <= 2030),
  headcount INT,
  regular_wages NUMERIC(12,2),
  overtime_wages NUMERIC(12,2),
  benefits_cost NUMERIC(12,2),
  training_cost NUMERIC(12,2),
  total_labor_cost NUMERIC(14,2),
  hours_worked NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT labor_costs_unique UNIQUE (facility, department, month, year)
);

-- 1.5 Create Distributor Costs Table
CREATE TABLE IF NOT EXISTS distributor_costs (
  id SERIAL PRIMARY KEY,
  distributor_id INT REFERENCES distributors(id),
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  year INT NOT NULL CHECK (year >= 2020 AND year <= 2030),
  logistics_cost NUMERIC(12,2),
  warehousing_cost NUMERIC(12,2),
  marketing_support NUMERIC(12,2),
  bad_debt_provision NUMERIC(12,2),
  total_channel_cost NUMERIC(14,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT distributor_costs_unique UNIQUE (distributor_id, month, year)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_operating_expenses_facility_year ON operating_expenses(facility, year);
CREATE INDEX IF NOT EXISTS idx_labor_costs_facility_year ON labor_costs(facility, year);
CREATE INDEX IF NOT EXISTS idx_distributor_costs_year ON distributor_costs(year);

-- ============================================================
-- PHASE 2: SEED OPERATING EXPENSES (36 months x 2 facilities x 6 categories)
-- ============================================================

-- Clear existing data if re-running
TRUNCATE TABLE operating_expenses RESTART IDENTITY CASCADE;

-- Generate Operating Expenses for Guelph Brewery (2022-2024)
-- Monthly base costs with realistic seasonal variations
INSERT INTO operating_expenses (facility, expense_category, expense_type, month, year, budgeted_amount, actual_amount, notes)
SELECT
  'Guelph Brewery' as facility,
  category,
  expense_type,
  month,
  year,
  -- Budgeted amounts (base costs)
  CASE category
    WHEN 'Utilities' THEN 85000 + (CASE WHEN month IN (1,2,12) THEN 15000 WHEN month IN (6,7,8) THEN 12000 ELSE 0 END)
    WHEN 'Rent' THEN 45000
    WHEN 'Insurance' THEN 18000
    WHEN 'Maintenance' THEN 32000 + (CASE WHEN month IN (3,9) THEN 8000 ELSE 0 END)
    WHEN 'Logistics' THEN 125000 + (CASE WHEN month IN (6,7,8,12) THEN 25000 ELSE 0 END)
    WHEN 'Administrative' THEN 65000
  END as budgeted_amount,
  -- Actual amounts (with realistic variance ±5-15%)
  CASE category
    WHEN 'Utilities' THEN (85000 + (CASE WHEN month IN (1,2,12) THEN 15000 WHEN month IN (6,7,8) THEN 12000 ELSE 0 END)) * (0.92 + random() * 0.16)
    WHEN 'Rent' THEN 45000 * (0.99 + random() * 0.02)
    WHEN 'Insurance' THEN 18000 * (0.98 + random() * 0.04)
    WHEN 'Maintenance' THEN (32000 + (CASE WHEN month IN (3,9) THEN 8000 ELSE 0 END)) * (0.85 + random() * 0.25)
    WHEN 'Logistics' THEN (125000 + (CASE WHEN month IN (6,7,8,12) THEN 25000 ELSE 0 END)) * (0.90 + random() * 0.18)
    WHEN 'Administrative' THEN 65000 * (0.95 + random() * 0.10)
  END as actual_amount,
  CASE
    WHEN random() < 0.3 THEN 'Seasonal adjustment applied'
    WHEN random() < 0.5 THEN 'Normal operations'
    ELSE NULL
  END as notes
FROM
  generate_series(2022, 2024) as year,
  generate_series(1, 12) as month,
  (VALUES
    ('Utilities', 'Electric, Gas, Water'),
    ('Rent', 'Facility Lease'),
    ('Insurance', 'Property & Liability'),
    ('Maintenance', 'General Maintenance'),
    ('Logistics', 'Transportation & Distribution'),
    ('Administrative', 'Office & Admin Costs')
  ) as categories(category, expense_type);

-- Generate Operating Expenses for Vernon Brewery (2022-2024)
INSERT INTO operating_expenses (facility, expense_category, expense_type, month, year, budgeted_amount, actual_amount, notes)
SELECT
  'Vernon Brewery' as facility,
  category,
  expense_type,
  month,
  year,
  -- Vernon is smaller, about 60% of Guelph costs
  CASE category
    WHEN 'Utilities' THEN 52000 + (CASE WHEN month IN (1,2,12) THEN 10000 WHEN month IN (6,7,8) THEN 8000 ELSE 0 END)
    WHEN 'Rent' THEN 28000
    WHEN 'Insurance' THEN 12000
    WHEN 'Maintenance' THEN 22000 + (CASE WHEN month IN (3,9) THEN 5000 ELSE 0 END)
    WHEN 'Logistics' THEN 78000 + (CASE WHEN month IN (6,7,8,12) THEN 15000 ELSE 0 END)
    WHEN 'Administrative' THEN 35000
  END as budgeted_amount,
  CASE category
    WHEN 'Utilities' THEN (52000 + (CASE WHEN month IN (1,2,12) THEN 10000 WHEN month IN (6,7,8) THEN 8000 ELSE 0 END)) * (0.92 + random() * 0.16)
    WHEN 'Rent' THEN 28000 * (0.99 + random() * 0.02)
    WHEN 'Insurance' THEN 12000 * (0.98 + random() * 0.04)
    WHEN 'Maintenance' THEN (22000 + (CASE WHEN month IN (3,9) THEN 5000 ELSE 0 END)) * (0.85 + random() * 0.25)
    WHEN 'Logistics' THEN (78000 + (CASE WHEN month IN (6,7,8,12) THEN 15000 ELSE 0 END)) * (0.90 + random() * 0.18)
    WHEN 'Administrative' THEN 35000 * (0.95 + random() * 0.10)
  END as actual_amount,
  CASE
    WHEN random() < 0.3 THEN 'Regional rate adjustment'
    WHEN random() < 0.5 THEN 'Normal operations'
    ELSE NULL
  END as notes
FROM
  generate_series(2022, 2024) as year,
  generate_series(1, 12) as month,
  (VALUES
    ('Utilities', 'Electric, Gas, Water'),
    ('Rent', 'Facility Lease'),
    ('Insurance', 'Property & Liability'),
    ('Maintenance', 'General Maintenance'),
    ('Logistics', 'Transportation & Distribution'),
    ('Administrative', 'Office & Admin Costs')
  ) as categories(category, expense_type);

-- ============================================================
-- PHASE 3: SEED LABOR COSTS (36 months x 2 facilities x 5 departments)
-- ============================================================

TRUNCATE TABLE labor_costs RESTART IDENTITY CASCADE;

-- Guelph Brewery Labor Costs
INSERT INTO labor_costs (facility, department, month, year, headcount, regular_wages, overtime_wages, benefits_cost, training_cost, total_labor_cost, hours_worked)
SELECT
  'Guelph Brewery' as facility,
  department,
  month,
  year,
  -- Headcount by department
  CASE department
    WHEN 'Production' THEN 45 + (CASE WHEN month IN (6,7,8) THEN 5 ELSE 0 END)
    WHEN 'Quality Control' THEN 12
    WHEN 'Maintenance' THEN 15
    WHEN 'Warehouse' THEN 20 + (CASE WHEN month IN (11,12) THEN 8 ELSE 0 END)
    WHEN 'Administration' THEN 18
  END as headcount,
  -- Regular wages (base monthly)
  CASE department
    WHEN 'Production' THEN 145000 + (year - 2022) * 5000
    WHEN 'Quality Control' THEN 38000 + (year - 2022) * 1500
    WHEN 'Maintenance' THEN 48000 + (year - 2022) * 2000
    WHEN 'Warehouse' THEN 58000 + (year - 2022) * 2500
    WHEN 'Administration' THEN 72000 + (year - 2022) * 3000
  END as regular_wages,
  -- Overtime (higher in peak months)
  CASE department
    WHEN 'Production' THEN 25000 * (CASE WHEN month IN (6,7,8,12) THEN 1.8 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Quality Control' THEN 5000 * (CASE WHEN month IN (6,7,8) THEN 1.5 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Maintenance' THEN 8000 * (CASE WHEN month IN (3,9) THEN 1.6 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Warehouse' THEN 12000 * (CASE WHEN month IN (11,12) THEN 2.0 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Administration' THEN 3000 * (0.8 + random() * 0.4)
  END as overtime_wages,
  -- Benefits (typically 25-30% of wages)
  CASE department
    WHEN 'Production' THEN 42000
    WHEN 'Quality Control' THEN 11000
    WHEN 'Maintenance' THEN 14000
    WHEN 'Warehouse' THEN 17000
    WHEN 'Administration' THEN 21000
  END as benefits_cost,
  -- Training costs (quarterly spikes)
  CASE
    WHEN month IN (1, 4, 7, 10) THEN
      CASE department
        WHEN 'Production' THEN 8000
        WHEN 'Quality Control' THEN 4000
        WHEN 'Maintenance' THEN 3000
        WHEN 'Warehouse' THEN 2500
        WHEN 'Administration' THEN 2000
      END
    ELSE
      CASE department
        WHEN 'Production' THEN 1500
        WHEN 'Quality Control' THEN 800
        WHEN 'Maintenance' THEN 600
        WHEN 'Warehouse' THEN 500
        WHEN 'Administration' THEN 400
      END
  END as training_cost,
  -- Total (calculated from above)
  0 as total_labor_cost, -- Will update below
  -- Hours worked
  CASE department
    WHEN 'Production' THEN 7200 + (CASE WHEN month IN (6,7,8) THEN 800 ELSE 0 END)
    WHEN 'Quality Control' THEN 1920
    WHEN 'Maintenance' THEN 2400
    WHEN 'Warehouse' THEN 3200 + (CASE WHEN month IN (11,12) THEN 1280 ELSE 0 END)
    WHEN 'Administration' THEN 2880
  END as hours_worked
FROM
  generate_series(2022, 2024) as year,
  generate_series(1, 12) as month,
  (VALUES ('Production'), ('Quality Control'), ('Maintenance'), ('Warehouse'), ('Administration')) as depts(department);

-- Vernon Brewery Labor Costs (smaller facility, ~60% of Guelph)
INSERT INTO labor_costs (facility, department, month, year, headcount, regular_wages, overtime_wages, benefits_cost, training_cost, total_labor_cost, hours_worked)
SELECT
  'Vernon Brewery' as facility,
  department,
  month,
  year,
  CASE department
    WHEN 'Production' THEN 28 + (CASE WHEN month IN (6,7,8) THEN 3 ELSE 0 END)
    WHEN 'Quality Control' THEN 7
    WHEN 'Maintenance' THEN 9
    WHEN 'Warehouse' THEN 12 + (CASE WHEN month IN (11,12) THEN 5 ELSE 0 END)
    WHEN 'Administration' THEN 10
  END as headcount,
  CASE department
    WHEN 'Production' THEN 88000 + (year - 2022) * 3000
    WHEN 'Quality Control' THEN 23000 + (year - 2022) * 900
    WHEN 'Maintenance' THEN 29000 + (year - 2022) * 1200
    WHEN 'Warehouse' THEN 35000 + (year - 2022) * 1500
    WHEN 'Administration' THEN 38000 + (year - 2022) * 1800
  END as regular_wages,
  CASE department
    WHEN 'Production' THEN 15000 * (CASE WHEN month IN (6,7,8,12) THEN 1.8 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Quality Control' THEN 3000 * (CASE WHEN month IN (6,7,8) THEN 1.5 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Maintenance' THEN 5000 * (CASE WHEN month IN (3,9) THEN 1.6 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Warehouse' THEN 7000 * (CASE WHEN month IN (11,12) THEN 2.0 ELSE 1.0 END) * (0.8 + random() * 0.4)
    WHEN 'Administration' THEN 1800 * (0.8 + random() * 0.4)
  END as overtime_wages,
  CASE department
    WHEN 'Production' THEN 25000
    WHEN 'Quality Control' THEN 6500
    WHEN 'Maintenance' THEN 8500
    WHEN 'Warehouse' THEN 10000
    WHEN 'Administration' THEN 11000
  END as benefits_cost,
  CASE
    WHEN month IN (1, 4, 7, 10) THEN
      CASE department
        WHEN 'Production' THEN 5000
        WHEN 'Quality Control' THEN 2500
        WHEN 'Maintenance' THEN 1800
        WHEN 'Warehouse' THEN 1500
        WHEN 'Administration' THEN 1200
      END
    ELSE
      CASE department
        WHEN 'Production' THEN 900
        WHEN 'Quality Control' THEN 500
        WHEN 'Maintenance' THEN 350
        WHEN 'Warehouse' THEN 300
        WHEN 'Administration' THEN 250
      END
  END as training_cost,
  0 as total_labor_cost,
  CASE department
    WHEN 'Production' THEN 4480 + (CASE WHEN month IN (6,7,8) THEN 480 ELSE 0 END)
    WHEN 'Quality Control' THEN 1120
    WHEN 'Maintenance' THEN 1440
    WHEN 'Warehouse' THEN 1920 + (CASE WHEN month IN (11,12) THEN 800 ELSE 0 END)
    WHEN 'Administration' THEN 1600
  END as hours_worked
FROM
  generate_series(2022, 2024) as year,
  generate_series(1, 12) as month,
  (VALUES ('Production'), ('Quality Control'), ('Maintenance'), ('Warehouse'), ('Administration')) as depts(department);

-- Update total_labor_cost (sum of all cost components)
UPDATE labor_costs
SET total_labor_cost = regular_wages + overtime_wages + benefits_cost + training_cost;

-- ============================================================
-- PHASE 4: SEED DISTRIBUTOR COSTS (36 months x distributors)
-- ============================================================

TRUNCATE TABLE distributor_costs RESTART IDENTITY CASCADE;

-- Get actual distributor IDs and generate costs
-- NOTE: Uses distributors.type column (not distributor_type)
INSERT INTO distributor_costs (distributor_id, month, year, logistics_cost, warehousing_cost, marketing_support, bad_debt_provision, total_channel_cost)
SELECT
  d.id as distributor_id,
  m.month,
  y.year,
  -- Logistics costs based on distributor type
  CASE d.type
    WHEN 'Retail' THEN 28000 + random() * 8000
    WHEN 'Wholesale' THEN 18000 + random() * 5000
    WHEN 'Restaurant' THEN 10000 + random() * 3000
    WHEN 'Export' THEN 40000 + random() * 10000
    ELSE 15000 + random() * 5000
  END * (CASE WHEN m.month IN (6,7,8,12) THEN 1.3 ELSE 1.0 END) as logistics_cost,
  -- Warehousing costs
  CASE d.type
    WHEN 'Retail' THEN 12000 + random() * 4000
    WHEN 'Wholesale' THEN 8000 + random() * 3000
    WHEN 'Restaurant' THEN 4000 + random() * 2000
    WHEN 'Export' THEN 15000 + random() * 5000
    ELSE 6000 + random() * 2000
  END as warehousing_cost,
  -- Marketing support
  CASE d.type
    WHEN 'Retail' THEN 8000 + random() * 4000
    WHEN 'Wholesale' THEN 5000 + random() * 2500
    WHEN 'Restaurant' THEN 6000 + random() * 3000
    WHEN 'Export' THEN 10000 + random() * 5000
    ELSE 4000 + random() * 2000
  END * (CASE WHEN m.month IN (5,6,12) THEN 1.5 ELSE 1.0 END) as marketing_support,
  -- Bad debt provision (typically 0.5-1.5% of revenue, estimated)
  CASE d.type
    WHEN 'Retail' THEN 2000 + random() * 1500
    WHEN 'Wholesale' THEN 1500 + random() * 1000
    WHEN 'Restaurant' THEN 2500 + random() * 2000
    WHEN 'Export' THEN 3000 + random() * 2000
    ELSE 1000 + random() * 500
  END as bad_debt_provision,
  0 as total_channel_cost -- Will calculate below
FROM
  distributors d
  CROSS JOIN generate_series(2022, 2024) as y(year)
  CROSS JOIN generate_series(1, 12) as m(month)
ON CONFLICT (distributor_id, month, year) DO NOTHING;

-- Update total_channel_cost
UPDATE distributor_costs
SET total_channel_cost = logistics_cost + warehousing_cost + marketing_support + bad_debt_provision;

-- ============================================================
-- PHASE 5: UPDATE QUALITY ISSUES WITH COST IMPACT
-- ============================================================

-- Update existing quality issues with realistic cost impacts
UPDATE quality_issues
SET
  cost_impact = CASE issue_type
    WHEN 'Contamination' THEN 25000 + random() * 20000
    WHEN 'Off-flavor' THEN 12000 + random() * 13000
    WHEN 'Clarity' THEN 8000 + random() * 7000
    WHEN 'Carbonation' THEN 5000 + random() * 5000
    WHEN 'pH Level' THEN 6000 + random() * 6000
    WHEN 'Temperature' THEN 4000 + random() * 4000
    ELSE 8000 + random() * 8000
  END,
  labor_hours_lost = CASE severity
    WHEN 'Critical' THEN 40 + random() * 40
    WHEN 'High' THEN 20 + random() * 20
    WHEN 'Medium' THEN 8 + random() * 12
    WHEN 'Low' THEN 2 + random() * 6
    ELSE 4 + random() * 8
  END,
  material_waste_cost = CASE issue_type
    WHEN 'Contamination' THEN 15000 + random() * 10000
    WHEN 'Off-flavor' THEN 8000 + random() * 7000
    WHEN 'Clarity' THEN 3000 + random() * 4000
    WHEN 'Carbonation' THEN 2000 + random() * 3000
    ELSE 4000 + random() * 4000
  END
WHERE cost_impact IS NULL;

-- ============================================================
-- PHASE 6: UPDATE EQUIPMENT WITH FINANCIAL DATA
-- ============================================================

-- Update equipment with realistic purchase costs and depreciation
-- NOTE: Uses equipment.type column (not equipment_type), values like 'Fermenter', 'Bright_Tank', 'Bottling_Line'
UPDATE equipment
SET
  purchase_cost = CASE type
    WHEN 'Fermenter' THEN 250000 + random() * 250000
    WHEN 'Bright_Tank' THEN 120000 + random() * 80000
    WHEN 'Bottling_Line' THEN 1000000 + random() * 500000
    WHEN 'Canning_Line' THEN 800000 + random() * 400000
    WHEN 'Keg_Line' THEN 400000 + random() * 200000
    WHEN 'Mash_Tun' THEN 180000 + random() * 70000
    WHEN 'Kettle' THEN 200000 + random() * 100000
    WHEN 'Lauter_Tun' THEN 150000 + random() * 50000
    WHEN 'Heat_Exchanger' THEN 80000 + random() * 40000
    WHEN 'CIP_System' THEN 120000 + random() * 60000
    WHEN 'Whirlpool' THEN 100000 + random() * 50000
    ELSE 100000 + random() * 100000
  END,
  useful_life_years = CASE type
    WHEN 'Fermenter' THEN 20
    WHEN 'Bright_Tank' THEN 20
    WHEN 'Bottling_Line' THEN 15
    WHEN 'Canning_Line' THEN 15
    WHEN 'Keg_Line' THEN 15
    WHEN 'Mash_Tun' THEN 25
    WHEN 'Kettle' THEN 25
    WHEN 'Lauter_Tun' THEN 25
    WHEN 'Heat_Exchanger' THEN 12
    WHEN 'CIP_System' THEN 10
    WHEN 'Whirlpool' THEN 20
    ELSE 15
  END,
  salvage_value = 0 -- Calculated after purchase_cost is set
WHERE purchase_cost IS NULL;

-- Update salvage value (typically 10% of purchase cost)
UPDATE equipment
SET salvage_value = purchase_cost * 0.10
WHERE salvage_value IS NULL OR salvage_value = 0;

-- Calculate annual depreciation (straight-line)
UPDATE equipment
SET annual_depreciation = (purchase_cost - salvage_value) / useful_life_years
WHERE annual_depreciation IS NULL;

-- Calculate accumulated depreciation based on years in service
-- NOTE: Uses purchase_date column (not installation_date)
UPDATE equipment
SET accumulated_depreciation =
  LEAST(
    annual_depreciation * EXTRACT(YEAR FROM AGE(CURRENT_DATE, purchase_date)),
    purchase_cost - salvage_value
  )
WHERE accumulated_depreciation IS NULL AND annual_depreciation IS NOT NULL;

-- Calculate net book value
UPDATE equipment
SET net_book_value = purchase_cost - accumulated_depreciation
WHERE net_book_value IS NULL;

-- Set maintenance budget (typically 3-5% of purchase cost)
UPDATE equipment
SET maintenance_budget_annual = purchase_cost * (0.03 + random() * 0.02)
WHERE maintenance_budget_annual IS NULL;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Verify operating expenses
SELECT
  facility,
  year,
  COUNT(*) as records,
  SUM(budgeted_amount)::numeric(14,2) as total_budgeted,
  SUM(actual_amount)::numeric(14,2) as total_actual,
  SUM(variance)::numeric(14,2) as total_variance
FROM operating_expenses
GROUP BY facility, year
ORDER BY facility, year;

-- Verify labor costs
SELECT
  facility,
  year,
  COUNT(*) as records,
  SUM(total_labor_cost)::numeric(14,2) as total_labor,
  SUM(headcount) / 12 as avg_headcount
FROM labor_costs
GROUP BY facility, year
ORDER BY facility, year;

-- Verify distributor costs
SELECT
  year,
  COUNT(*) as records,
  SUM(total_channel_cost)::numeric(14,2) as total_channel_costs
FROM distributor_costs
GROUP BY year
ORDER BY year;

-- Verify quality issue costs
SELECT
  COUNT(*) as issues_with_costs,
  SUM(cost_impact)::numeric(12,2) as total_cost_impact,
  AVG(cost_impact)::numeric(12,2) as avg_cost_per_issue
FROM quality_issues
WHERE cost_impact IS NOT NULL;

-- Verify equipment financials
SELECT
  COUNT(*) as equipment_count,
  SUM(purchase_cost)::numeric(14,2) as total_asset_value,
  SUM(accumulated_depreciation)::numeric(14,2) as total_depreciation,
  SUM(net_book_value)::numeric(14,2) as total_book_value,
  SUM(maintenance_budget_annual)::numeric(12,2) as total_maintenance_budget
FROM equipment
WHERE purchase_cost IS NOT NULL;

-- ============================================================
-- SAMPLE COO QUERIES (for testing)
-- ============================================================

-- Total labor costs by department (all facilities, 2024)
-- SELECT department, SUM(total_labor_cost) as total_labor
-- FROM labor_costs
-- WHERE year = 2024
-- GROUP BY department
-- ORDER BY total_labor DESC;

-- Operating expenses over/under budget by category (2024)
-- SELECT expense_category,
--        SUM(budgeted_amount) as budgeted,
--        SUM(actual_amount) as actual,
--        SUM(variance) as variance,
--        ROUND(SUM(variance) / SUM(budgeted_amount) * 100, 1) as variance_pct
-- FROM operating_expenses
-- WHERE year = 2024
-- GROUP BY expense_category
-- ORDER BY variance DESC;

-- Operating margin by facility
-- WITH revenue AS (
--   SELECT
--     CASE WHEN pl.facility LIKE '%Guelph%' THEN 'Guelph Brewery' ELSE 'Vernon Brewery' END as facility,
--     SUM(s.total_revenue) as total_revenue
--   FROM shipments s
--   JOIN production_batches pb ON s.batch_id = pb.id
--   JOIN production_lines pl ON pb.production_line_id = pl.id
--   GROUP BY 1
-- ),
-- costs AS (
--   SELECT facility, SUM(actual_amount) as total_opex
--   FROM operating_expenses
--   GROUP BY facility
-- )
-- SELECT r.facility, r.total_revenue, c.total_opex,
--        (r.total_revenue - c.total_opex) as operating_profit,
--        ROUND((r.total_revenue - c.total_opex) / r.total_revenue * 100, 1) as margin_pct
-- FROM revenue r
-- JOIN costs c ON r.facility = c.facility;

SELECT 'COO Financial Data Enhancement Complete!' as status;
