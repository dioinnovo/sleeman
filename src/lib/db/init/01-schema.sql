-- Sleeman BrewMind Database Schema
-- PostgreSQL database for brewery operations intelligence

-- =============================================================================
-- CORE PRODUCTION TABLES
-- =============================================================================

-- Beer styles catalog
CREATE TABLE IF NOT EXISTS beer_styles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL CHECK(category IN ('Lager', 'Ale', 'Specialty', 'Seasonal')),
  target_abv DECIMAL(4,2),
  target_ibu INTEGER,
  fermentation_days INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Production lines/facilities
CREATE TABLE IF NOT EXISTS production_lines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  facility VARCHAR(100) NOT NULL,
  capacity_liters DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) CHECK(status IN ('active', 'maintenance', 'offline')) DEFAULT 'active',
  last_maintenance_date DATE,
  efficiency_rating DECIMAL(5,2) DEFAULT 100.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Production batches
CREATE TABLE IF NOT EXISTS production_batches (
  id SERIAL PRIMARY KEY,
  batch_code VARCHAR(50) UNIQUE NOT NULL,
  beer_style_id INTEGER REFERENCES beer_styles(id),
  production_line_id INTEGER REFERENCES production_lines(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  target_volume_liters DECIMAL(12,2) NOT NULL,
  actual_volume_liters DECIMAL(12,2),
  status VARCHAR(20) CHECK(status IN ('planned', 'in_progress', 'fermenting', 'conditioning', 'completed', 'failed')) DEFAULT 'planned',
  efficiency_percentage DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- QUALITY CONTROL TABLES
-- =============================================================================

-- Quality tests performed on batches
CREATE TABLE IF NOT EXISTS quality_tests (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES production_batches(id),
  test_type VARCHAR(50) NOT NULL CHECK(test_type IN ('pH', 'ABV', 'specific_gravity', 'bitterness', 'color', 'clarity', 'taste', 'aroma', 'carbonation')),
  test_date TIMESTAMP NOT NULL,
  expected_value DECIMAL(10,4),
  actual_value DECIMAL(10,4),
  passed BOOLEAN DEFAULT TRUE,
  technician VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quality issues/defects
CREATE TABLE IF NOT EXISTS quality_issues (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES production_batches(id),
  issue_type VARCHAR(50) NOT NULL CHECK(issue_type IN ('contamination', 'off_flavor', 'clarity', 'carbonation', 'color_deviation', 'aroma_defect', 'fermentation_stall', 'oxidation')),
  severity VARCHAR(20) CHECK(severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  detected_date TIMESTAMP NOT NULL,
  resolved_date TIMESTAMP,
  root_cause TEXT,
  corrective_action TEXT,
  product_loss_liters DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INVENTORY & SUPPLY CHAIN TABLES
-- =============================================================================

-- Suppliers
CREATE TABLE IF NOT EXISTS suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL UNIQUE,
  category VARCHAR(50) CHECK(category IN ('Malt', 'Hops', 'Yeast', 'Packaging', 'Equipment', 'Chemicals', 'Adjuncts')),
  contact_email VARCHAR(200),
  phone VARCHAR(50),
  address TEXT,
  lead_time_days INTEGER DEFAULT 7,
  reliability_score DECIMAL(5,2) DEFAULT 90.0,
  total_orders INTEGER DEFAULT 0,
  on_time_delivery_rate DECIMAL(5,2) DEFAULT 95.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Raw materials inventory
CREATE TABLE IF NOT EXISTS raw_materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK(category IN ('Malt', 'Hops', 'Yeast', 'Water_Treatment', 'Adjuncts', 'Fining_Agents', 'Packaging')),
  unit VARCHAR(20) NOT NULL CHECK(unit IN ('kg', 'g', 'L', 'units', 'cases')),
  supplier_id INTEGER REFERENCES suppliers(id),
  current_stock DECIMAL(12,2) NOT NULL DEFAULT 0,
  reorder_level DECIMAL(12,2) NOT NULL,
  reorder_quantity DECIMAL(12,2),
  cost_per_unit DECIMAL(10,4) NOT NULL,
  last_restocked DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Material usage per batch
CREATE TABLE IF NOT EXISTS material_usage (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES production_batches(id),
  material_id INTEGER REFERENCES raw_materials(id),
  quantity_used DECIMAL(12,4) NOT NULL,
  cost DECIMAL(12,2) NOT NULL,
  usage_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- EQUIPMENT TABLES
-- =============================================================================

-- Equipment catalog
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK(type IN ('Fermenter', 'Bright_Tank', 'Mash_Tun', 'Lauter_Tun', 'Kettle', 'Whirlpool', 'Heat_Exchanger', 'Bottling_Line', 'Canning_Line', 'Keg_Line', 'CIP_System')),
  production_line_id INTEGER REFERENCES production_lines(id),
  capacity_liters DECIMAL(12,2),
  status VARCHAR(20) CHECK(status IN ('operational', 'maintenance', 'offline', 'cleaning')) DEFAULT 'operational',
  efficiency_rating DECIMAL(5,2) DEFAULT 95.0,
  purchase_date DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipment downtime tracking
CREATE TABLE IF NOT EXISTS equipment_downtime (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER REFERENCES equipment(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  reason VARCHAR(50) NOT NULL CHECK(reason IN ('scheduled_maintenance', 'breakdown', 'cleaning', 'changeover', 'lack_of_materials', 'quality_hold', 'operator_unavailable')),
  planned BOOLEAN DEFAULT FALSE,
  cost_impact DECIMAL(12,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- DISTRIBUTION TABLES
-- =============================================================================

-- Distributors
CREATE TABLE IF NOT EXISTS distributors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL UNIQUE,
  region VARCHAR(100) NOT NULL,
  type VARCHAR(50) CHECK(type IN ('Retail', 'Wholesale', 'Restaurant', 'Bar', 'Export')) DEFAULT 'Wholesale',
  contact_name VARCHAR(200),
  contact_email VARCHAR(200),
  phone VARCHAR(50),
  address TEXT,
  total_orders INTEGER DEFAULT 0,
  total_volume_liters DECIMAL(14,2) DEFAULT 0,
  revenue DECIMAL(14,2) DEFAULT 0,
  relationship_start_date DATE,
  credit_limit DECIMAL(12,2),
  payment_terms_days INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shipments to distributors
CREATE TABLE IF NOT EXISTS shipments (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES production_batches(id),
  distributor_id INTEGER REFERENCES distributors(id),
  order_date DATE NOT NULL,
  ship_date DATE,
  delivery_date DATE,
  volume_liters DECIMAL(12,2) NOT NULL,
  unit_price DECIMAL(10,4) NOT NULL,
  total_revenue DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) CHECK(status IN ('pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled')) DEFAULT 'pending',
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- COMPLIANCE & AUDIT TABLES
-- =============================================================================

-- Compliance audits
CREATE TABLE IF NOT EXISTS compliance_audits (
  id SERIAL PRIMARY KEY,
  audit_date DATE NOT NULL,
  auditor VARCHAR(200) NOT NULL,
  audit_type VARCHAR(50) CHECK(audit_type IN ('Internal', 'External', 'Regulatory', 'Food_Safety', 'Environmental', 'Quality_System')) NOT NULL,
  scope TEXT,
  findings_count INTEGER DEFAULT 0,
  critical_findings INTEGER DEFAULT 0,
  status VARCHAR(30) CHECK(status IN ('passed', 'passed_with_observations', 'failed', 'conditional')) DEFAULT 'passed',
  corrective_actions TEXT,
  next_audit_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- PRODUCT & REVENUE TABLES
-- =============================================================================

-- Products (packaged beer SKUs)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL UNIQUE,
  beer_style_id INTEGER REFERENCES beer_styles(id),
  package_type VARCHAR(50) CHECK(package_type IN ('Bottle_330ml', 'Bottle_500ml', 'Can_355ml', 'Can_473ml', 'Keg_20L', 'Keg_50L')) NOT NULL,
  units_per_case INTEGER,
  price_per_unit DECIMAL(10,4) NOT NULL,
  cost_per_unit DECIMAL(10,4) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Monthly revenue summary
CREATE TABLE IF NOT EXISTS monthly_revenue (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK(month BETWEEN 1 AND 12),
  product_id INTEGER REFERENCES products(id),
  units_sold INTEGER NOT NULL DEFAULT 0,
  revenue DECIMAL(14,2) NOT NULL DEFAULT 0,
  cost_of_goods DECIMAL(14,2) NOT NULL DEFAULT 0,
  gross_profit DECIMAL(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(year, month, product_id)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_batches_style ON production_batches(beer_style_id);
CREATE INDEX IF NOT EXISTS idx_batches_line ON production_batches(production_line_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON production_batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_date ON production_batches(start_date);
CREATE INDEX IF NOT EXISTS idx_quality_tests_batch ON quality_tests(batch_id);
CREATE INDEX IF NOT EXISTS idx_quality_tests_type ON quality_tests(test_type);
CREATE INDEX IF NOT EXISTS idx_quality_issues_batch ON quality_issues(batch_id);
CREATE INDEX IF NOT EXISTS idx_quality_issues_severity ON quality_issues(severity);
CREATE INDEX IF NOT EXISTS idx_material_usage_batch ON material_usage(batch_id);
CREATE INDEX IF NOT EXISTS idx_equipment_downtime_equip ON equipment_downtime(equipment_id);
CREATE INDEX IF NOT EXISTS idx_shipments_batch ON shipments(batch_id);
CREATE INDEX IF NOT EXISTS idx_shipments_distributor ON shipments(distributor_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_monthly_revenue_date ON monthly_revenue(year, month);
