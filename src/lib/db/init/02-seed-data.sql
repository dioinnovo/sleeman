-- Sleeman BrewMind Seed Data
-- 12 months of realistic brewery operations data

-- =============================================================================
-- BEER STYLES (Sleeman Portfolio)
-- =============================================================================
INSERT INTO beer_styles (name, category, target_abv, target_ibu, fermentation_days, description) VALUES
('Sleeman Cream Ale', 'Ale', 5.0, 18, 14, 'Smooth, creamy ale with a clean finish'),
('Sleeman Original Draught', 'Lager', 5.0, 15, 21, 'Classic Canadian lager, crisp and refreshing'),
('Sleeman Honey Brown Lager', 'Lager', 5.2, 16, 21, 'Rich amber lager with natural honey notes'),
('Sleeman Clear 2.0', 'Lager', 4.0, 10, 18, 'Light, low-carb lager for health-conscious consumers'),
('Sleeman Silver Creek Lager', 'Lager', 5.0, 14, 21, 'Premium lager with subtle hop character'),
('Sapporo Premium Beer', 'Lager', 5.0, 20, 28, 'Imported Japanese rice lager, clean and crisp'),
('Okanagan Spring Pale Ale', 'Ale', 5.0, 35, 14, 'West Coast style pale ale with citrus hops'),
('Wild Rose IPA', 'Ale', 6.5, 60, 14, 'Bold IPA with tropical and pine hop notes');

-- =============================================================================
-- PRODUCTION LINES
-- =============================================================================
-- Note: Brewery industry uses hectoliters (hL) as standard unit. 1 hL = 100 liters
INSERT INTO production_lines (name, facility, capacity_hectoliters, status, last_maintenance_date, efficiency_rating) VALUES
('Guelph Line A', 'Guelph Brewery', 500, 'active', '2024-10-15', 94.5),
('Guelph Line B', 'Guelph Brewery', 500, 'active', '2024-09-20', 92.8),
('Guelph Line C', 'Guelph Brewery', 350, 'active', '2024-11-01', 96.2),
('Vernon Line 1', 'Vernon Brewery', 250, 'active', '2024-10-28', 91.5),
('Vernon Line 2', 'Vernon Brewery', 250, 'maintenance', '2024-11-25', 88.3);

-- =============================================================================
-- SUPPLIERS
-- =============================================================================
INSERT INTO suppliers (name, category, contact_email, phone, lead_time_days, reliability_score, total_orders, on_time_delivery_rate) VALUES
('Canada Malting Co.', 'Malt', 'orders@canadamalting.com', '1-800-555-0101', 5, 96.5, 245, 98.2),
('Rahr Malting', 'Malt', 'sales@rahr.com', '1-800-555-0102', 7, 94.2, 180, 95.5),
('Yakima Chief Hops', 'Hops', 'orders@yakimachief.com', '1-800-555-0103', 10, 97.8, 120, 99.1),
('Hopsteiner', 'Hops', 'info@hopsteiner.com', '1-800-555-0104', 12, 93.5, 95, 94.8),
('Lallemand Brewing', 'Yeast', 'brewing@lallemand.com', '1-800-555-0105', 3, 99.2, 310, 99.5),
('White Labs', 'Yeast', 'orders@whitelabs.com', '1-800-555-0106', 4, 98.1, 275, 98.8),
('Ball Corporation', 'Packaging', 'sales@ball.com', '1-800-555-0107', 14, 91.5, 85, 92.3),
('Ardagh Glass', 'Packaging', 'orders@ardaghgroup.com', '1-800-555-0108', 14, 89.8, 72, 90.5),
('ChemStation', 'Chemicals', 'orders@chemstation.com', '1-800-555-0109', 5, 95.5, 156, 96.2),
('Eaton Sales', 'Equipment', 'sales@eatonsales.com', '1-800-555-0110', 21, 88.5, 28, 89.5);

-- =============================================================================
-- RAW MATERIALS
-- =============================================================================
INSERT INTO raw_materials (name, category, unit, supplier_id, current_stock, reorder_level, reorder_quantity, cost_per_unit, last_restocked) VALUES
('2-Row Pale Malt', 'Malt', 'kg', 1, 45000, 10000, 25000, 0.85, '2024-11-20'),
('Munich Malt', 'Malt', 'kg', 1, 12000, 3000, 10000, 1.10, '2024-11-15'),
('Crystal 60L Malt', 'Malt', 'kg', 2, 8500, 2000, 5000, 1.25, '2024-11-10'),
('Wheat Malt', 'Malt', 'kg', 2, 6000, 1500, 4000, 0.95, '2024-11-18'),
('Cascade Hops', 'Hops', 'kg', 3, 850, 200, 500, 22.50, '2024-11-22'),
('Centennial Hops', 'Hops', 'kg', 3, 420, 100, 300, 24.00, '2024-11-22'),
('Saaz Hops', 'Hops', 'kg', 4, 380, 100, 250, 28.50, '2024-11-05'),
('Citra Hops', 'Hops', 'kg', 3, 180, 50, 150, 42.00, '2024-11-22'),
('Safale US-05 Yeast', 'Yeast', 'kg', 5, 125, 30, 50, 85.00, '2024-11-25'),
('Saflager W-34/70', 'Yeast', 'kg', 5, 180, 40, 60, 78.00, '2024-11-25'),
('Irish Moss', 'Fining_Agents', 'kg', 9, 45, 10, 25, 35.00, '2024-10-15'),
('Gypsum', 'Water_Treatment', 'kg', 9, 120, 25, 50, 8.50, '2024-10-20'),
('355ml Cans', 'Packaging', 'cases', 7, 15000, 5000, 10000, 45.00, '2024-11-28'),
('330ml Bottles', 'Packaging', 'cases', 8, 8500, 3000, 6000, 52.00, '2024-11-25');

-- =============================================================================
-- EQUIPMENT
-- =============================================================================
-- Note: Equipment capacity in hectoliters (hL). 1 hL = 100 liters
INSERT INTO equipment (name, type, production_line_id, capacity_hectoliters, status, efficiency_rating, purchase_date, last_maintenance, next_maintenance) VALUES
('Fermenter F1-A', 'Fermenter', 1, 500, 'operational', 96.5, '2018-03-15', '2024-10-15', '2025-01-15'),
('Fermenter F2-A', 'Fermenter', 1, 500, 'operational', 95.2, '2018-03-15', '2024-10-15', '2025-01-15'),
('Fermenter F1-B', 'Fermenter', 2, 500, 'operational', 94.8, '2019-06-20', '2024-09-20', '2024-12-20'),
('Fermenter F2-B', 'Fermenter', 2, 500, 'cleaning', 93.5, '2019-06-20', '2024-09-20', '2024-12-20'),
('Bright Tank BT1-A', 'Bright_Tank', 1, 1000, 'operational', 97.2, '2018-03-15', '2024-11-01', '2025-02-01'),
('Bright Tank BT1-B', 'Bright_Tank', 2, 1000, 'operational', 96.8, '2019-06-20', '2024-11-01', '2025-02-01'),
('Mash Tun MT-1', 'Mash_Tun', 1, 600, 'operational', 98.1, '2017-01-10', '2024-08-15', '2025-02-15'),
('Mash Tun MT-2', 'Mash_Tun', 2, 600, 'operational', 97.5, '2019-06-20', '2024-09-01', '2025-03-01'),
('Brew Kettle BK-1', 'Kettle', 1, 550, 'operational', 96.8, '2017-01-10', '2024-10-01', '2025-01-01'),
('Brew Kettle BK-2', 'Kettle', 2, 550, 'maintenance', 91.2, '2019-06-20', '2024-11-28', '2025-02-28'),
('Bottling Line BL-1', 'Bottling_Line', 1, NULL, 'operational', 92.5, '2020-05-10', '2024-11-15', '2025-02-15'),
('Canning Line CL-1', 'Canning_Line', 1, NULL, 'operational', 94.8, '2021-08-20', '2024-11-20', '2025-02-20'),
('Canning Line CL-2', 'Canning_Line', 2, NULL, 'operational', 93.2, '2022-03-15', '2024-10-28', '2025-01-28'),
('CIP System CIP-1', 'CIP_System', 1, NULL, 'operational', 99.1, '2018-03-15', '2024-11-01', '2025-02-01'),
('Heat Exchanger HX-1', 'Heat_Exchanger', 1, NULL, 'operational', 97.8, '2018-03-15', '2024-10-15', '2025-01-15');

-- =============================================================================
-- DISTRIBUTORS
-- =============================================================================
-- Note: Volume in hectoliters (hL). 1 hL = 100 liters
INSERT INTO distributors (name, region, type, contact_name, contact_email, total_orders, total_volume_hectoliters, revenue, relationship_start_date, credit_limit, payment_terms_days) VALUES
('LCBO Ontario', 'Ontario', 'Retail', 'Sarah Chen', 'schen@lcbo.com', 520, 28500, 8550000, '2015-01-15', 500000, 30),
('BC Liquor Stores', 'British Columbia', 'Retail', 'Mike Thompson', 'mthompson@bcldb.com', 380, 19200, 5760000, '2016-03-20', 400000, 30),
('SAQ Quebec', 'Quebec', 'Retail', 'Jean-Pierre Dubois', 'jpdubois@saq.com', 290, 14500, 4350000, '2017-06-10', 350000, 45),
('Alberta Gaming', 'Alberta', 'Retail', 'James Wilson', 'jwilson@aglc.ca', 245, 11800, 3540000, '2018-02-28', 300000, 30),
('Costco Canada', 'National', 'Wholesale', 'Linda Park', 'lpark@costco.ca', 180, 9800, 2450000, '2019-04-15', 250000, 15),
('Metro Inc.', 'Ontario/Quebec', 'Retail', 'Robert Martin', 'rmartin@metro.ca', 156, 6200, 1860000, '2020-01-10', 200000, 30),
('Sobeys', 'National', 'Retail', 'Karen White', 'kwhite@sobeys.com', 142, 5800, 1740000, '2019-08-22', 180000, 30),
('The Keg Steakhouse', 'National', 'Restaurant', 'David Brown', 'dbrown@thekeg.com', 95, 2850, 997500, '2018-05-15', 100000, 30),
('Boston Pizza', 'National', 'Restaurant', 'Amy Lee', 'alee@bostonpizza.com', 88, 2640, 924000, '2019-11-20', 90000, 30),
('Moxies', 'National', 'Restaurant', 'Chris Taylor', 'ctaylor@moxies.com', 72, 2160, 756000, '2020-03-15', 80000, 30),
('Craft Beer Market', 'Western Canada', 'Bar', 'Steve Rogers', 'srogers@craftbeermarket.ca', 68, 1360, 544000, '2021-01-10', 50000, 15),
('Bier Markt', 'Ontario', 'Bar', 'Michelle Adams', 'madams@biermarkt.com', 55, 1100, 440000, '2021-06-20', 45000, 15),
('Export Japan', 'International', 'Export', 'Yuki Tanaka', 'ytanaka@exportjp.com', 28, 4200, 1680000, '2020-09-15', 200000, 60),
('Export USA', 'International', 'Export', 'John Smith', 'jsmith@usaimport.com', 35, 5250, 1837500, '2019-07-10', 250000, 45);

-- =============================================================================
-- PRODUCTS (SKUs)
-- =============================================================================
INSERT INTO products (name, beer_style_id, package_type, units_per_case, price_per_unit, cost_per_unit, active) VALUES
('Sleeman Cream Ale 355ml Can 24pk', 1, 'Can_355ml', 24, 2.15, 0.85, true),
('Sleeman Cream Ale 330ml Bottle 12pk', 1, 'Bottle_330ml', 12, 2.45, 0.92, true),
('Sleeman Original 355ml Can 24pk', 2, 'Can_355ml', 24, 2.10, 0.82, true),
('Sleeman Original 500ml Bottle 6pk', 2, 'Bottle_500ml', 6, 3.25, 1.15, true),
('Sleeman Honey Brown 355ml Can 24pk', 3, 'Can_355ml', 24, 2.25, 0.88, true),
('Sleeman Honey Brown 330ml Bottle 12pk', 3, 'Bottle_330ml', 12, 2.55, 0.95, true),
('Sleeman Clear 2.0 355ml Can 12pk', 4, 'Can_355ml', 12, 2.00, 0.78, true),
('Sleeman Silver Creek 355ml Can 24pk', 5, 'Can_355ml', 24, 2.20, 0.86, true),
('Sapporo Premium 355ml Can 24pk', 6, 'Can_355ml', 24, 2.85, 1.25, true),
('Sapporo Premium 330ml Bottle 6pk', 6, 'Bottle_330ml', 6, 3.45, 1.45, true),
('Okanagan Spring Pale Ale 355ml Can 6pk', 7, 'Can_355ml', 6, 2.65, 1.05, true),
('Wild Rose IPA 473ml Can 4pk', 8, 'Can_473ml', 4, 3.85, 1.55, true),
('Sleeman Cream Ale Keg 50L', 1, 'Keg_50L', 1, 185.00, 72.00, true),
('Sleeman Original Keg 50L', 2, 'Keg_50L', 1, 180.00, 70.00, true),
('Sapporo Premium Keg 20L', 6, 'Keg_20L', 1, 125.00, 55.00, true);

-- =============================================================================
-- PRODUCTION BATCHES (Last 12 months - relative to current date)
-- =============================================================================
-- Generate batches for each of the past 12 months
-- Note: Volume in hectoliters (hL). Typical batch sizes: 200-500 hL
DO $$
DECLARE
  v_months_ago INTEGER;
  v_batch_num INTEGER;
  v_style_id INTEGER;
  v_line_id INTEGER;
  v_start_date TIMESTAMP;
  v_end_date TIMESTAMP;
  v_target_vol DECIMAL;
  v_actual_vol DECIMAL;
  v_efficiency DECIMAL;
  v_status VARCHAR(20);
  v_base_date DATE;
BEGIN
  -- Generate batches going back 12 months from today
  FOR v_months_ago IN 0..11 LOOP
    v_base_date := (CURRENT_DATE - (v_months_ago || ' months')::INTERVAL)::DATE;

    -- Generate 35-50 batches per month
    FOR v_batch_num IN 1..42 LOOP
      v_style_id := 1 + (v_batch_num % 8);
      v_line_id := 1 + (v_batch_num % 5);
      v_start_date := v_base_date + ((v_batch_num % 28) || ' days')::INTERVAL + ((6 + (v_batch_num % 12)) || ' hours')::INTERVAL;
      -- Target volume in hectoliters (200-500 hL typical batch size)
      v_target_vol := 200 + (random() * 300)::INTEGER;
      v_efficiency := 85 + (random() * 15);
      v_actual_vol := v_target_vol * (v_efficiency / 100);

      -- Current month has some in-progress batches
      v_status := CASE
        WHEN v_months_ago > 0 THEN 'completed'
        WHEN v_months_ago = 0 AND v_batch_num > 35 THEN 'conditioning'
        WHEN v_months_ago = 0 AND v_batch_num > 30 THEN 'fermenting'
        WHEN v_months_ago = 0 AND v_batch_num > 25 THEN 'in_progress'
        ELSE 'completed'
      END;
      v_end_date := CASE WHEN v_status = 'completed' THEN v_start_date + (14 + (v_style_id % 14)) * INTERVAL '1 day' ELSE NULL END;

      INSERT INTO production_batches (batch_code, beer_style_id, production_line_id, start_date, end_date, target_volume_hectoliters, actual_volume_hectoliters, status, efficiency_percentage)
      VALUES (
        'SLM-' || EXTRACT(YEAR FROM v_base_date) || '-' || LPAD(EXTRACT(MONTH FROM v_base_date)::TEXT, 2, '0') || '-' || LPAD(v_batch_num::TEXT, 3, '0'),
        v_style_id,
        v_line_id,
        v_start_date,
        v_end_date,
        v_target_vol,
        CASE WHEN v_status = 'completed' THEN v_actual_vol ELSE NULL END,
        v_status,
        CASE WHEN v_status = 'completed' THEN v_efficiency ELSE NULL END
      );
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- QUALITY TESTS
-- =============================================================================
DO $$
DECLARE
  v_batch RECORD;
  v_test_types TEXT[] := ARRAY['pH', 'ABV', 'specific_gravity', 'bitterness', 'clarity', 'taste'];
  v_test_type TEXT;
  v_expected DECIMAL;
  v_actual DECIMAL;
  v_passed BOOLEAN;
BEGIN
  FOR v_batch IN SELECT id, start_date, beer_style_id FROM production_batches WHERE status = 'completed' LOOP
    FOREACH v_test_type IN ARRAY v_test_types LOOP
      v_expected := CASE v_test_type
        WHEN 'pH' THEN 4.2
        WHEN 'ABV' THEN 5.0 + (v_batch.beer_style_id * 0.1)
        WHEN 'specific_gravity' THEN 1.012
        WHEN 'bitterness' THEN 15 + (v_batch.beer_style_id * 5)
        WHEN 'clarity' THEN 95.0
        WHEN 'taste' THEN 8.5
      END;
      v_actual := v_expected * (0.95 + random() * 0.1);
      v_passed := abs(v_actual - v_expected) / v_expected < 0.05;

      INSERT INTO quality_tests (batch_id, test_type, test_date, expected_value, actual_value, passed, technician)
      VALUES (
        v_batch.id,
        v_test_type,
        v_batch.start_date + INTERVAL '7 days',
        v_expected,
        v_actual,
        v_passed,
        (ARRAY['John Smith', 'Maria Garcia', 'David Chen', 'Sarah Wilson'])[1 + (random() * 3)::INTEGER]
      );
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- QUALITY ISSUES (Generate some issues for realism)
-- =============================================================================
-- Note: Product loss in hectoliters (hL). Typical loss: 5-25 hL per issue
DO $$
DECLARE
  v_batch RECORD;
  v_issue_types TEXT[] := ARRAY['off_flavor', 'clarity', 'carbonation', 'fermentation_stall'];
  v_severities TEXT[] := ARRAY['low', 'medium', 'high'];
BEGIN
  -- Add issues to ~5% of batches
  FOR v_batch IN SELECT id, start_date FROM production_batches WHERE status = 'completed' AND random() < 0.05 LOOP
    INSERT INTO quality_issues (batch_id, issue_type, severity, detected_date, resolved_date, root_cause, corrective_action, product_loss_hectoliters)
    VALUES (
      v_batch.id,
      v_issue_types[1 + (random() * 3)::INTEGER],
      v_severities[1 + (random() * 2)::INTEGER],
      v_batch.start_date + INTERVAL '5 days',
      v_batch.start_date + INTERVAL '8 days',
      'Process deviation during fermentation',
      'Adjusted temperature controls and retrained operators',
      5 + (random() * 20)::INTEGER
    );
  END LOOP;
END $$;

-- =============================================================================
-- MATERIAL USAGE
-- =============================================================================
-- Note: Using hectoliters for volume. Material rates per hectoliter:
-- Malt: ~20 kg/hL, Hops: ~0.2 kg/hL, Yeast: ~0.01 kg/hL
DO $$
DECLARE
  v_batch RECORD;
  v_material RECORD;
  v_qty DECIMAL;
BEGIN
  FOR v_batch IN SELECT id, start_date, target_volume_hectoliters FROM production_batches LOOP
    -- Malt usage (approx 20kg per hectoliter)
    FOR v_material IN SELECT id, cost_per_unit FROM raw_materials WHERE category = 'Malt' LIMIT 2 LOOP
      v_qty := (v_batch.target_volume_hectoliters * 20) * (0.3 + random() * 0.4);
      INSERT INTO material_usage (batch_id, material_id, quantity_used, cost, usage_date)
      VALUES (v_batch.id, v_material.id, v_qty, v_qty * v_material.cost_per_unit, v_batch.start_date);
    END LOOP;

    -- Hops usage (approx 0.2kg per hectoliter)
    FOR v_material IN SELECT id, cost_per_unit FROM raw_materials WHERE category = 'Hops' LIMIT 2 LOOP
      v_qty := v_batch.target_volume_hectoliters * 0.2 * (0.8 + random() * 0.4);
      INSERT INTO material_usage (batch_id, material_id, quantity_used, cost, usage_date)
      VALUES (v_batch.id, v_material.id, v_qty, v_qty * v_material.cost_per_unit, v_batch.start_date);
    END LOOP;

    -- Yeast usage (approx 0.01kg per hectoliter)
    FOR v_material IN SELECT id, cost_per_unit FROM raw_materials WHERE category = 'Yeast' LIMIT 1 LOOP
      v_qty := v_batch.target_volume_hectoliters * 0.01;
      INSERT INTO material_usage (batch_id, material_id, quantity_used, cost, usage_date)
      VALUES (v_batch.id, v_material.id, v_qty, v_qty * v_material.cost_per_unit, v_batch.start_date);
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- EQUIPMENT DOWNTIME (relative to current date)
-- =============================================================================
DO $$
DECLARE
  v_equip RECORD;
  v_months_ago INTEGER;
  v_start TIMESTAMP;
  v_duration INTEGER;
  v_base_date DATE;
BEGIN
  FOR v_equip IN SELECT id FROM equipment LOOP
    FOR v_months_ago IN 0..11 LOOP
      v_base_date := (CURRENT_DATE - (v_months_ago || ' months')::INTERVAL)::DATE;

      -- Planned maintenance once per quarter
      IF EXTRACT(MONTH FROM v_base_date) IN (3, 6, 9, 12) THEN
        v_start := v_base_date + INTERVAL '15 days' + INTERVAL '6 hours';
        INSERT INTO equipment_downtime (equipment_id, start_time, end_time, reason, planned, cost_impact)
        VALUES (v_equip.id, v_start, v_start + INTERVAL '8 hours', 'scheduled_maintenance', true, 500 + (random() * 1000)::INTEGER);
      END IF;

      -- Random unplanned downtime (20% chance per month)
      IF random() < 0.2 THEN
        v_start := v_base_date + ((1 + (random() * 27)::INTEGER) || ' days')::INTERVAL + ((8 + (random() * 8)::INTEGER) || ' hours')::INTERVAL;
        v_duration := 2 + (random() * 10)::INTEGER;
        INSERT INTO equipment_downtime (equipment_id, start_time, end_time, reason, planned, cost_impact)
        VALUES (
          v_equip.id,
          v_start,
          v_start + (v_duration * INTERVAL '1 hour'),
          (ARRAY['breakdown', 'cleaning', 'changeover', 'quality_hold'])[1 + (random() * 3)::INTEGER],
          false,
          v_duration * 150 + (random() * 500)::INTEGER
        );
      END IF;
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- SHIPMENTS
-- =============================================================================
-- Note: Volume in hectoliters. Pricing per hectoliter (industry standard)
DO $$
DECLARE
  v_batch RECORD;
  v_distributor RECORD;
  v_ship_date DATE;
  v_volume DECIMAL;
  v_unit_price DECIMAL;
BEGIN
  FOR v_batch IN SELECT id, end_date, actual_volume_hectoliters FROM production_batches WHERE status = 'completed' AND actual_volume_hectoliters IS NOT NULL LOOP
    -- Ship to 1-3 distributors per batch
    FOR v_distributor IN SELECT id, type FROM distributors ORDER BY random() LIMIT (1 + (random() * 2)::INTEGER) LOOP
      v_ship_date := (v_batch.end_date + INTERVAL '3 days')::DATE;
      v_volume := v_batch.actual_volume_hectoliters * (0.3 + random() * 0.4);
      -- Price per hectoliter (industry standard)
      v_unit_price := CASE v_distributor.type
        WHEN 'Export' THEN 450.00
        WHEN 'Restaurant' THEN 380.00
        WHEN 'Bar' THEN 350.00
        ELSE 300.00
      END;

      INSERT INTO shipments (batch_id, distributor_id, order_date, ship_date, delivery_date, volume_hectoliters, unit_price, total_revenue, status)
      VALUES (
        v_batch.id,
        v_distributor.id,
        v_ship_date - 5,
        v_ship_date,
        v_ship_date + 3,
        v_volume,
        v_unit_price,
        v_volume * v_unit_price,
        'delivered'
      );
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- MONTHLY REVENUE (relative to current date)
-- =============================================================================
DO $$
DECLARE
  v_months_ago INTEGER;
  v_target_month INTEGER;
  v_target_year INTEGER;
  v_product RECORD;
  v_units INTEGER;
  v_revenue DECIMAL;
  v_cost DECIMAL;
  v_base_date DATE;
BEGIN
  FOR v_months_ago IN 0..11 LOOP
    v_base_date := (CURRENT_DATE - (v_months_ago || ' months')::INTERVAL)::DATE;
    v_target_year := EXTRACT(YEAR FROM v_base_date)::INTEGER;
    v_target_month := EXTRACT(MONTH FROM v_base_date)::INTEGER;

    FOR v_product IN SELECT id, price_per_unit, cost_per_unit FROM products LOOP
      v_units := 5000 + (random() * 25000)::INTEGER;
      -- Seasonal adjustment
      IF v_target_month IN (6, 7, 8) THEN v_units := (v_units * 1.4)::INTEGER; END IF;
      IF v_target_month IN (1, 2) THEN v_units := (v_units * 0.7)::INTEGER; END IF;

      v_revenue := v_units * v_product.price_per_unit;
      v_cost := v_units * v_product.cost_per_unit;

      INSERT INTO monthly_revenue (year, month, product_id, units_sold, revenue, cost_of_goods, gross_profit)
      VALUES (v_target_year, v_target_month, v_product.id, v_units, v_revenue, v_cost, v_revenue - v_cost);
    END LOOP;
  END LOOP;
END $$;

-- =============================================================================
-- COMPLIANCE AUDITS
-- =============================================================================
INSERT INTO compliance_audits (audit_date, auditor, audit_type, scope, findings_count, critical_findings, status, next_audit_date) VALUES
('2024-02-15', 'Canadian Food Inspection Agency', 'Regulatory', 'Food safety compliance', 2, 0, 'passed_with_observations', '2025-02-15'),
('2024-03-20', 'Internal QA Team', 'Internal', 'Quality management system', 5, 0, 'passed', '2024-09-20'),
('2024-05-10', 'SGS Canada', 'External', 'ISO 22000 certification', 3, 0, 'passed', '2025-05-10'),
('2024-06-25', 'Environment Canada', 'Environmental', 'Wastewater and emissions', 1, 0, 'passed', '2025-06-25'),
('2024-09-15', 'Internal QA Team', 'Internal', 'Quarterly quality review', 4, 0, 'passed', '2024-12-15'),
('2024-11-08', 'SQF Institute', 'Food_Safety', 'SQF Level 3 recertification', 2, 0, 'passed', '2025-11-08');

-- Update distributor totals based on shipments (hectoliters)
UPDATE distributors d SET
  total_orders = (SELECT COUNT(*) FROM shipments s WHERE s.distributor_id = d.id),
  total_volume_hectoliters = (SELECT COALESCE(SUM(volume_hectoliters), 0) FROM shipments s WHERE s.distributor_id = d.id),
  revenue = (SELECT COALESCE(SUM(total_revenue), 0) FROM shipments s WHERE s.distributor_id = d.id);

-- =============================================================================
-- SALES TRANSACTIONS (Detailed revenue data for Excel export)
-- =============================================================================
-- Generate 600+ detailed sales transactions across all Canadian provinces
DO $$
DECLARE
  v_months_ago INTEGER;
  v_base_date DATE;
  v_trans_date DATE;
  v_product RECORD;
  v_province_data RECORD;
  v_store_data RECORD;
  v_units INTEGER;
  v_cases DECIMAL;
  v_hectoliters DECIMAL;
  v_gross_rev DECIMAL;
  v_discount DECIMAL;
  v_net_rev DECIMAL;
  v_cogs DECIMAL;
  v_profit DECIMAL;
  v_margin DECIMAL;
  v_fiscal_year INTEGER;
  v_fiscal_quarter INTEGER;
  v_fiscal_period INTEGER;
  v_week_num INTEGER;
  v_is_promo BOOLEAN;
  v_promo_name VARCHAR(100);
  v_sales_rep VARCHAR(100);
  v_day_offset INTEGER;
  v_store_idx INTEGER;

  -- Province and liquor board data
  v_provinces TEXT[][] := ARRAY[
    ARRAY['Ontario', 'LCBO', 'Retail'],
    ARRAY['Ontario', 'LCBO', 'Retail'],
    ARRAY['Ontario', 'LCBO', 'Retail'],
    ARRAY['Ontario', 'The Beer Store', 'Retail'],
    ARRAY['Ontario', 'The Beer Store', 'Retail'],
    ARRAY['Ontario', 'Grocery (Ontario)', 'Grocery'],
    ARRAY['British Columbia', 'BC Liquor Distribution Branch', 'Retail'],
    ARRAY['British Columbia', 'BC Liquor Distribution Branch', 'Retail'],
    ARRAY['British Columbia', 'BC Private Liquor Stores', 'Retail'],
    ARRAY['British Columbia', 'BC Grocery', 'Grocery'],
    ARRAY['Quebec', 'SAQ', 'Retail'],
    ARRAY['Quebec', 'SAQ', 'Retail'],
    ARRAY['Quebec', 'Depanneurs (Quebec)', 'Convenience'],
    ARRAY['Alberta', 'AGLC Licensed Retailers', 'Retail'],
    ARRAY['Alberta', 'AGLC Licensed Retailers', 'Retail'],
    ARRAY['Alberta', 'Liquor Depot', 'Retail'],
    ARRAY['Saskatchewan', 'SLGA', 'Retail'],
    ARRAY['Saskatchewan', 'SLGA Private Stores', 'Retail'],
    ARRAY['Manitoba', 'MLCC', 'Retail'],
    ARRAY['Manitoba', 'MLCC', 'Retail'],
    ARRAY['Nova Scotia', 'NSLC', 'Retail'],
    ARRAY['New Brunswick', 'ANBL', 'Retail'],
    ARRAY['Newfoundland', 'NLC', 'Retail'],
    ARRAY['Prince Edward Island', 'PEILCC', 'Retail']
  ];

  -- Store names by province/board
  v_ontario_lcbo TEXT[] := ARRAY['LCBO Queen St W', 'LCBO Summerhill', 'LCBO Yonge & Eglinton', 'LCBO Bayview Village', 'LCBO Square One', 'LCBO Ottawa Rideau', 'LCBO Kingston', 'LCBO London', 'LCBO Hamilton', 'LCBO Mississauga', 'LCBO Brampton', 'LCBO Markham', 'LCBO Vaughan', 'LCBO Burlington', 'LCBO Waterloo'];
  v_ontario_beer_store TEXT[] := ARRAY['Beer Store Dundas', 'Beer Store Bloor', 'Beer Store Scarborough', 'Beer Store North York', 'Beer Store Ajax', 'Beer Store Whitby', 'Beer Store Oshawa', 'Beer Store Barrie', 'Beer Store Windsor'];
  v_ontario_grocery TEXT[] := ARRAY['Loblaws Queen W', 'Metro Yonge', 'Sobeys Mississauga', 'Farm Boy Ottawa', 'Fortinos Hamilton', 'No Frills Scarborough', 'Real Canadian Superstore'];
  v_bc_bcldb TEXT[] := ARRAY['BC Liquor Robson St', 'BC Liquor Cambie', 'BC Liquor Granville', 'BC Liquor Victoria', 'BC Liquor Kelowna', 'BC Liquor Surrey', 'BC Liquor Burnaby', 'BC Liquor Richmond', 'BC Liquor Coquitlam'];
  v_bc_private TEXT[] := ARRAY['Legacy Liquor Store', 'Firefly Fine Wines', 'Kitsilano Wine Cellar', 'Cascadia Liquor', 'West Coast Liquor'];
  v_quebec_saq TEXT[] := ARRAY['SAQ Selection Montreal', 'SAQ Depot Laval', 'SAQ Signature Quebec City', 'SAQ Express Gatineau', 'SAQ Classique Sherbrooke', 'SAQ Selection Trois-Rivieres', 'SAQ Longueuil'];
  v_alberta_stores TEXT[] := ARRAY['Wine and Beyond Edmonton', 'Liquor Depot Calgary', 'Solo Liquor Red Deer', 'Olympia Liquor', 'Crowfoot Wine & Spirits', 'Willow Park Wines', 'Kensington Wine Market'];
  v_sask_stores TEXT[] := ARRAY['Saskatoon Co-op Liquor', 'Regina Liquor Store', 'Shoppers Drug Mart Prince Albert', 'Moose Jaw Liquor'];
  v_manitoba_mlcc TEXT[] := ARRAY['MLCC Portage Ave', 'MLCC St Vital', 'MLCC Brandon', 'MLCC Steinbach', 'MLCC Winnipeg Grant Park'];
  v_atlantic_stores TEXT[] := ARRAY['NSLC Halifax', 'NSLC Dartmouth', 'ANBL Fredericton', 'ANBL Moncton', 'NLC St Johns', 'NLC Corner Brook', 'PEILCC Charlottetown'];

  v_store_types TEXT[] := ARRAY['Flagship', 'Urban', 'Suburban', 'Rural', 'Express', 'Warehouse'];
  v_sales_reps TEXT[] := ARRAY['Michael Chen', 'Sarah Thompson', 'David Rodriguez', 'Jennifer Williams', 'Robert Kim', 'Amanda Foster', 'James Mitchell', 'Emily Davis', 'Christopher Lee', 'Jessica Martin'];
  v_promos TEXT[] := ARRAY['Summer BBQ Season', 'Hockey Night Special', 'Long Weekend Promo', 'Back to School', 'Holiday Season', 'Spring Launch', 'Canada Day Sale', 'Thanksgiving Feature', 'Winter Warmer', 'Victoria Day Weekend'];

BEGIN
  -- Generate transactions for the past 12 months
  FOR v_months_ago IN 0..11 LOOP
    v_base_date := (CURRENT_DATE - (v_months_ago || ' months')::INTERVAL)::DATE;
    v_fiscal_year := EXTRACT(YEAR FROM v_base_date)::INTEGER;
    v_fiscal_quarter := ((EXTRACT(MONTH FROM v_base_date)::INTEGER - 1) / 3) + 1;
    v_fiscal_period := EXTRACT(MONTH FROM v_base_date)::INTEGER;

    -- Generate 50-60 transactions per month (600+ total)
    FOR v_day_offset IN 1..55 LOOP
      v_trans_date := v_base_date - ((v_day_offset % 28) || ' days')::INTERVAL;
      v_week_num := EXTRACT(WEEK FROM v_trans_date)::INTEGER;

      -- Pick a province/board combination
      v_store_idx := 1 + (v_day_offset % 24);

      -- Determine store based on province
      DECLARE
        v_prov TEXT := v_provinces[v_store_idx][1];
        v_board TEXT := v_provinces[v_store_idx][2];
        v_channel TEXT := v_provinces[v_store_idx][3];
        v_store TEXT;
        v_store_num TEXT;
        v_store_type TEXT;
      BEGIN
        -- Select store name based on province and board
        v_store := CASE
          WHEN v_board = 'LCBO' THEN v_ontario_lcbo[1 + (v_day_offset % array_length(v_ontario_lcbo, 1))]
          WHEN v_board = 'The Beer Store' THEN v_ontario_beer_store[1 + (v_day_offset % array_length(v_ontario_beer_store, 1))]
          WHEN v_board LIKE 'Grocery%' THEN v_ontario_grocery[1 + (v_day_offset % array_length(v_ontario_grocery, 1))]
          WHEN v_board = 'BC Liquor Distribution Branch' THEN v_bc_bcldb[1 + (v_day_offset % array_length(v_bc_bcldb, 1))]
          WHEN v_board = 'BC Private Liquor Stores' THEN v_bc_private[1 + (v_day_offset % array_length(v_bc_private, 1))]
          WHEN v_board LIKE 'BC Grocery%' THEN 'Save-On-Foods Vancouver'
          WHEN v_board = 'SAQ' THEN v_quebec_saq[1 + (v_day_offset % array_length(v_quebec_saq, 1))]
          WHEN v_board LIKE 'Depanneurs%' THEN 'Couche-Tard Montreal'
          WHEN v_board LIKE 'AGLC%' OR v_board = 'Liquor Depot' THEN v_alberta_stores[1 + (v_day_offset % array_length(v_alberta_stores, 1))]
          WHEN v_board LIKE 'SLGA%' THEN v_sask_stores[1 + (v_day_offset % array_length(v_sask_stores, 1))]
          WHEN v_board = 'MLCC' THEN v_manitoba_mlcc[1 + (v_day_offset % array_length(v_manitoba_mlcc, 1))]
          ELSE v_atlantic_stores[1 + (v_day_offset % array_length(v_atlantic_stores, 1))]
        END;

        v_store_num := LPAD((1000 + (v_day_offset * 7) % 9000)::TEXT, 4, '0');
        v_store_type := v_store_types[1 + (v_day_offset % array_length(v_store_types, 1))];

        -- Select product
        FOR v_product IN SELECT id, beer_style_id, price_per_unit, cost_per_unit, units_per_case FROM products WHERE active = true ORDER BY random() LIMIT 1 LOOP
          -- Calculate units based on store type and season
          v_units := CASE v_store_type
            WHEN 'Flagship' THEN 150 + (random() * 350)::INTEGER
            WHEN 'Warehouse' THEN 200 + (random() * 400)::INTEGER
            WHEN 'Urban' THEN 100 + (random() * 200)::INTEGER
            WHEN 'Suburban' THEN 80 + (random() * 150)::INTEGER
            ELSE 40 + (random() * 100)::INTEGER
          END;

          -- Seasonal adjustment
          IF v_fiscal_period IN (6, 7, 8) THEN v_units := (v_units * 1.4)::INTEGER; END IF;
          IF v_fiscal_period IN (1, 2) THEN v_units := (v_units * 0.7)::INTEGER; END IF;

          -- Province volume adjustment (Ontario is largest market)
          IF v_prov = 'Ontario' THEN v_units := (v_units * 1.3)::INTEGER; END IF;
          IF v_prov = 'British Columbia' THEN v_units := (v_units * 1.1)::INTEGER; END IF;

          v_cases := v_units::DECIMAL / COALESCE(v_product.units_per_case, 24);
          -- Calculate hectoliters (355ml cans, 24 per case = 8.52L per case = 0.0852 hL)
          v_hectoliters := v_cases * 0.0852;

          v_gross_rev := v_units * v_product.price_per_unit;

          -- Promotional discount (20% of transactions)
          v_is_promo := random() < 0.2;
          IF v_is_promo THEN
            v_discount := v_gross_rev * (0.05 + random() * 0.1);
            v_promo_name := v_promos[1 + (v_day_offset % array_length(v_promos, 1))];
          ELSE
            v_discount := 0;
            v_promo_name := NULL;
          END IF;

          v_net_rev := v_gross_rev - v_discount;
          v_cogs := v_units * v_product.cost_per_unit;
          v_profit := v_net_rev - v_cogs;
          v_margin := CASE WHEN v_net_rev > 0 THEN (v_profit / v_net_rev) * 100 ELSE 0 END;

          v_sales_rep := v_sales_reps[1 + (v_day_offset % array_length(v_sales_reps, 1))];

          INSERT INTO sales_transactions (
            transaction_date, province, liquor_board, store_name, store_number, store_type, channel,
            product_id, beer_style_id, units_sold, cases_sold, hectoliters_sold, unit_price,
            gross_revenue, discounts, net_revenue, cost_of_goods, gross_profit, margin_percentage,
            fiscal_year, fiscal_quarter, fiscal_period, week_number,
            is_promotional, promotion_name, sales_rep
          ) VALUES (
            v_trans_date, v_prov, v_board, v_store, v_store_num, v_store_type, v_channel,
            v_product.id, v_product.beer_style_id, v_units, v_cases, v_hectoliters, v_product.price_per_unit,
            v_gross_rev, v_discount, v_net_rev, v_cogs, v_profit, v_margin,
            v_fiscal_year, v_fiscal_quarter, v_fiscal_period, v_week_num,
            v_is_promo, v_promo_name, v_sales_rep
          );
        END LOOP;
      END;
    END LOOP;
  END LOOP;
END $$;
