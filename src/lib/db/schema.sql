-- Sleeman BrewMind Database Schema
-- SQLite database for brewery operations intelligence

-- =============================================================================
-- CORE PRODUCTION TABLES
-- =============================================================================

-- Beer styles catalog
CREATE TABLE IF NOT EXISTS beer_styles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK(category IN ('Lager', 'Ale', 'Specialty', 'Seasonal')),
  target_abv REAL,
  target_ibu REAL,
  fermentation_days INTEGER,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Production lines/facilities
CREATE TABLE IF NOT EXISTS production_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  facility TEXT NOT NULL,
  capacity_liters REAL NOT NULL,
  status TEXT CHECK(status IN ('active', 'maintenance', 'offline')) DEFAULT 'active',
  last_maintenance_date DATE,
  efficiency_rating REAL DEFAULT 100.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Production batches
CREATE TABLE IF NOT EXISTS production_batches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_code TEXT UNIQUE NOT NULL,
  beer_style_id INTEGER REFERENCES beer_styles(id),
  production_line_id INTEGER REFERENCES production_lines(id),
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  target_volume_liters REAL NOT NULL,
  actual_volume_liters REAL,
  status TEXT CHECK(status IN ('planned', 'in_progress', 'fermenting', 'conditioning', 'completed', 'failed')) DEFAULT 'planned',
  efficiency_percentage REAL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- QUALITY CONTROL TABLES
-- =============================================================================

-- Quality tests performed on batches
CREATE TABLE IF NOT EXISTS quality_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_id INTEGER REFERENCES production_batches(id),
  test_type TEXT NOT NULL CHECK(test_type IN ('pH', 'ABV', 'specific_gravity', 'bitterness', 'color', 'clarity', 'taste', 'aroma', 'carbonation')),
  test_date DATETIME NOT NULL,
  expected_value REAL,
  actual_value REAL,
  passed BOOLEAN DEFAULT TRUE,
  technician TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Quality issues/defects
CREATE TABLE IF NOT EXISTS quality_issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_id INTEGER REFERENCES production_batches(id),
  issue_type TEXT NOT NULL CHECK(issue_type IN ('contamination', 'off_flavor', 'clarity', 'carbonation', 'color_deviation', 'aroma_defect', 'fermentation_stall', 'oxidation')),
  severity TEXT CHECK(severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  detected_date DATETIME NOT NULL,
  resolved_date DATETIME,
  root_cause TEXT,
  corrective_action TEXT,
  product_loss_liters REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INVENTORY & SUPPLY CHAIN TABLES
-- =============================================================================

-- Suppliers
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  category TEXT CHECK(category IN ('Malt', 'Hops', 'Yeast', 'Packaging', 'Equipment', 'Chemicals', 'Adjuncts')),
  contact_email TEXT,
  phone TEXT,
  address TEXT,
  lead_time_days INTEGER DEFAULT 7,
  reliability_score REAL DEFAULT 90.0,
  total_orders INTEGER DEFAULT 0,
  on_time_delivery_rate REAL DEFAULT 95.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Raw materials inventory
CREATE TABLE IF NOT EXISTS raw_materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('Malt', 'Hops', 'Yeast', 'Water_Treatment', 'Adjuncts', 'Fining_Agents', 'Packaging')),
  unit TEXT NOT NULL CHECK(unit IN ('kg', 'g', 'L', 'units', 'cases')),
  supplier_id INTEGER REFERENCES suppliers(id),
  current_stock REAL NOT NULL DEFAULT 0,
  reorder_level REAL NOT NULL,
  reorder_quantity REAL,
  cost_per_unit REAL NOT NULL,
  last_restocked DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Material usage per batch
CREATE TABLE IF NOT EXISTS material_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_id INTEGER REFERENCES production_batches(id),
  material_id INTEGER REFERENCES raw_materials(id),
  quantity_used REAL NOT NULL,
  cost REAL NOT NULL,
  usage_date DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- EQUIPMENT TABLES
-- =============================================================================

-- Equipment catalog
CREATE TABLE IF NOT EXISTS equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('Fermenter', 'Bright_Tank', 'Mash_Tun', 'Lauter_Tun', 'Kettle', 'Whirlpool', 'Heat_Exchanger', 'Bottling_Line', 'Canning_Line', 'Keg_Line', 'CIP_System')),
  production_line_id INTEGER REFERENCES production_lines(id),
  capacity_liters REAL,
  status TEXT CHECK(status IN ('operational', 'maintenance', 'offline', 'cleaning')) DEFAULT 'operational',
  efficiency_rating REAL DEFAULT 95.0,
  purchase_date DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Equipment downtime tracking
CREATE TABLE IF NOT EXISTS equipment_downtime (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipment_id INTEGER REFERENCES equipment(id),
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  reason TEXT NOT NULL CHECK(reason IN ('scheduled_maintenance', 'breakdown', 'cleaning', 'changeover', 'lack_of_materials', 'quality_hold', 'operator_unavailable')),
  planned BOOLEAN DEFAULT FALSE,
  cost_impact REAL DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- DISTRIBUTION TABLES
-- =============================================================================

-- Distributors
CREATE TABLE IF NOT EXISTS distributors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  type TEXT CHECK(type IN ('Retail', 'Wholesale', 'Restaurant', 'Bar', 'Export')) DEFAULT 'Wholesale',
  contact_name TEXT,
  contact_email TEXT,
  phone TEXT,
  address TEXT,
  total_orders INTEGER DEFAULT 0,
  total_volume_liters REAL DEFAULT 0,
  revenue REAL DEFAULT 0,
  relationship_start_date DATE,
  credit_limit REAL,
  payment_terms_days INTEGER DEFAULT 30,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Shipments to distributors
CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_id INTEGER REFERENCES production_batches(id),
  distributor_id INTEGER REFERENCES distributors(id),
  order_date DATE NOT NULL,
  ship_date DATE,
  delivery_date DATE,
  volume_liters REAL NOT NULL,
  unit_price REAL NOT NULL,
  total_revenue REAL NOT NULL,
  status TEXT CHECK(status IN ('pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled')) DEFAULT 'pending',
  tracking_number TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- COMPLIANCE & AUDIT TABLES
-- =============================================================================

-- Compliance audits
CREATE TABLE IF NOT EXISTS compliance_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  audit_date DATE NOT NULL,
  auditor TEXT NOT NULL,
  audit_type TEXT CHECK(audit_type IN ('Internal', 'External', 'Regulatory', 'Food_Safety', 'Environmental', 'Quality_System')) NOT NULL,
  scope TEXT,
  findings_count INTEGER DEFAULT 0,
  critical_findings INTEGER DEFAULT 0,
  status TEXT CHECK(status IN ('passed', 'passed_with_observations', 'failed', 'conditional')) DEFAULT 'passed',
  corrective_actions TEXT,
  next_audit_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- PRODUCT & REVENUE TABLES
-- =============================================================================

-- Products (packaged beer SKUs)
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  beer_style_id INTEGER REFERENCES beer_styles(id),
  package_type TEXT CHECK(package_type IN ('Bottle_330ml', 'Bottle_500ml', 'Can_355ml', 'Can_473ml', 'Keg_20L', 'Keg_50L')) NOT NULL,
  units_per_case INTEGER,
  price_per_unit REAL NOT NULL,
  cost_per_unit REAL NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Monthly revenue summary
CREATE TABLE IF NOT EXISTS monthly_revenue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK(month BETWEEN 1 AND 12),
  product_id INTEGER REFERENCES products(id),
  units_sold INTEGER NOT NULL DEFAULT 0,
  revenue REAL NOT NULL DEFAULT 0,
  cost_of_goods REAL NOT NULL DEFAULT 0,
  gross_profit REAL NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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
