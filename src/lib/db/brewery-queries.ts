import { query } from './connection'

export interface QueryResult {
  columns: string[]
  rows: Record<string, unknown>[]
  rowCount: number
  executionTime: number
  sql: string
}

/**
 * Predefined brewery analytics queries
 * These map to the quick questions in the Barley AI interface
 */
export const BREWERY_QUERIES = {
  // ==========================================================================
  // PRODUCTION & OPERATIONS
  // ==========================================================================

  production_volume_by_style: `
    SELECT
      bs.name as beer_style,
      TO_CHAR(pb.start_date, 'YYYY-MM') as month,
      COUNT(*) as batch_count,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC, 0) as total_volume_liters,
      ROUND(AVG(pb.efficiency_percentage)::NUMERIC, 1) as avg_efficiency
    FROM production_batches pb
    JOIN beer_styles bs ON pb.beer_style_id = bs.id
    WHERE pb.status = 'completed'
      AND pb.start_date >= NOW() - INTERVAL '12 months'
    GROUP BY bs.name, TO_CHAR(pb.start_date, 'YYYY-MM')
    ORDER BY month DESC, total_volume_liters DESC
  `,

  fermentation_efficiency_by_line: `
    SELECT
      pl.name as production_line,
      pl.facility,
      COUNT(pb.id) as total_batches,
      ROUND(AVG(pb.efficiency_percentage)::NUMERIC, 1) as avg_efficiency,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC, 0) as total_volume,
      pl.efficiency_rating as line_rating
    FROM production_lines pl
    LEFT JOIN production_batches pb ON pl.id = pb.production_line_id
      AND pb.status = 'completed'
    GROUP BY pl.id, pl.name, pl.facility, pl.efficiency_rating
    ORDER BY avg_efficiency DESC NULLS LAST
  `,

  production_line_downtime: `
    SELECT
      pl.name as production_line,
      pl.facility,
      COUNT(ed.id) as downtime_events,
      ROUND(SUM(EXTRACT(EPOCH FROM (ed.end_time - ed.start_time)) / 3600)::NUMERIC, 1) as total_downtime_hours,
      ROUND(SUM(ed.cost_impact)::NUMERIC, 2) as total_cost_impact,
      COUNT(CASE WHEN ed.planned = false THEN 1 END) as unplanned_events
    FROM production_lines pl
    JOIN equipment e ON pl.id = e.production_line_id
    JOIN equipment_downtime ed ON e.id = ed.equipment_id
    WHERE ed.start_time >= NOW() - INTERVAL '12 months'
    GROUP BY pl.id, pl.name, pl.facility
    ORDER BY total_downtime_hours DESC
  `,

  monthly_production_trends: `
    SELECT
      TO_CHAR(pb.start_date, 'YYYY-MM') as month,
      COUNT(*) as batches,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC, 0) as total_volume,
      ROUND(AVG(pb.efficiency_percentage)::NUMERIC, 1) as avg_efficiency,
      COUNT(CASE WHEN pb.status = 'failed' THEN 1 END) as failed_batches
    FROM production_batches pb
    WHERE pb.start_date >= NOW() - INTERVAL '12 months'
    GROUP BY TO_CHAR(pb.start_date, 'YYYY-MM')
    ORDER BY month DESC
  `,

  todays_production_summary: `
    SELECT
      'Today''s Production' as metric,
      (SELECT COUNT(*) FROM production_batches WHERE DATE(start_date) = CURRENT_DATE) as batches_started,
      (SELECT COUNT(*) FROM production_batches WHERE status = 'in_progress') as batches_in_progress,
      (SELECT COUNT(*) FROM production_batches WHERE status = 'fermenting') as batches_fermenting,
      (SELECT COUNT(*) FROM production_batches WHERE status = 'conditioning') as batches_conditioning,
      (SELECT ROUND(SUM(actual_volume_liters)::NUMERIC, 0) FROM production_batches WHERE DATE(end_date) = CURRENT_DATE) as volume_completed_today
  `,

  // ==========================================================================
  // QUALITY CONTROL
  // ==========================================================================

  quality_issues_by_batch: `
    SELECT
      pb.batch_code,
      bs.name as beer_style,
      qi.issue_type,
      qi.severity,
      qi.detected_date,
      qi.resolved_date,
      ROUND(qi.product_loss_liters::NUMERIC, 0) as product_loss_liters,
      qi.root_cause,
      qi.corrective_action
    FROM quality_issues qi
    JOIN production_batches pb ON qi.batch_id = pb.id
    JOIN beer_styles bs ON pb.beer_style_id = bs.id
    ORDER BY qi.detected_date DESC
    LIMIT 50
  `,

  batch_failure_rates: `
    SELECT
      bs.name as beer_style,
      COUNT(*) as total_batches,
      COUNT(CASE WHEN pb.status = 'failed' THEN 1 END) as failed_batches,
      ROUND(100.0 * COUNT(CASE WHEN pb.status = 'failed' THEN 1 END) / COUNT(*)::NUMERIC, 2) as failure_rate,
      (SELECT COUNT(*) FROM quality_issues qi WHERE qi.batch_id IN (SELECT id FROM production_batches WHERE beer_style_id = bs.id)) as quality_issues
    FROM production_batches pb
    JOIN beer_styles bs ON pb.beer_style_id = bs.id
    GROUP BY bs.id, bs.name
    ORDER BY failure_rate DESC
  `,

  quality_test_variance: `
    SELECT
      qt.test_type,
      COUNT(*) as total_tests,
      ROUND(AVG(qt.actual_value)::NUMERIC, 3) as avg_actual,
      ROUND(AVG(qt.expected_value)::NUMERIC, 3) as avg_expected,
      ROUND(AVG(ABS(qt.actual_value - qt.expected_value))::NUMERIC, 3) as avg_variance,
      ROUND(100.0 * COUNT(CASE WHEN qt.passed THEN 1 END) / COUNT(*)::NUMERIC, 1) as pass_rate
    FROM quality_tests qt
    GROUP BY qt.test_type
    ORDER BY pass_rate ASC
  `,

  common_quality_issues: `
    SELECT
      qi.issue_type,
      qi.severity,
      COUNT(*) as occurrence_count,
      ROUND(AVG(EXTRACT(EPOCH FROM (qi.resolved_date - qi.detected_date)) / 3600)::NUMERIC, 1) as avg_resolution_hours,
      ROUND(SUM(qi.product_loss_liters)::NUMERIC, 0) as total_product_loss
    FROM quality_issues qi
    WHERE qi.resolved_date IS NOT NULL
    GROUP BY qi.issue_type, qi.severity
    ORDER BY occurrence_count DESC
  `,

  highest_quality_batches: `
    SELECT
      pb.batch_code,
      bs.name as beer_style,
      pb.start_date,
      ROUND(pb.efficiency_percentage::NUMERIC, 1) as efficiency,
      COUNT(qt.id) as tests_performed,
      ROUND(100.0 * COUNT(CASE WHEN qt.passed THEN 1 END) / NULLIF(COUNT(qt.id), 0)::NUMERIC, 1) as pass_rate,
      0 as quality_issues
    FROM production_batches pb
    JOIN beer_styles bs ON pb.beer_style_id = bs.id
    LEFT JOIN quality_tests qt ON pb.id = qt.batch_id
    LEFT JOIN quality_issues qi ON pb.id = qi.batch_id
    WHERE pb.status = 'completed' AND qi.id IS NULL
    GROUP BY pb.id, pb.batch_code, bs.name, pb.start_date, pb.efficiency_percentage
    HAVING COUNT(CASE WHEN qt.passed THEN 1 END) = COUNT(qt.id)
    ORDER BY pb.efficiency_percentage DESC NULLS LAST
    LIMIT 20
  `,

  // ==========================================================================
  // INVENTORY & SUPPLY CHAIN
  // ==========================================================================

  material_usage_trends: `
    SELECT
      rm.name as material,
      rm.category,
      ROUND(SUM(mu.quantity_used)::NUMERIC, 2) as total_used,
      rm.unit,
      ROUND(SUM(mu.cost)::NUMERIC, 2) as total_cost,
      ROUND(AVG(mu.cost / NULLIF(mu.quantity_used, 0))::NUMERIC, 4) as avg_unit_cost,
      rm.current_stock,
      rm.reorder_level
    FROM material_usage mu
    JOIN raw_materials rm ON mu.material_id = rm.id
    WHERE mu.usage_date >= NOW() - INTERVAL '12 months'
    GROUP BY rm.id, rm.name, rm.category, rm.unit, rm.current_stock, rm.reorder_level
    ORDER BY total_cost DESC
  `,

  supplier_reliability: `
    SELECT
      s.name as supplier,
      s.category,
      s.reliability_score,
      s.on_time_delivery_rate,
      s.total_orders,
      s.lead_time_days,
      COUNT(rm.id) as materials_supplied
    FROM suppliers s
    LEFT JOIN raw_materials rm ON s.id = rm.supplier_id
    GROUP BY s.id, s.name, s.category, s.reliability_score, s.on_time_delivery_rate, s.total_orders, s.lead_time_days
    ORDER BY s.reliability_score DESC
  `,

  inventory_reorder_alerts: `
    SELECT
      rm.name as material,
      rm.category,
      rm.current_stock,
      rm.reorder_level,
      (rm.reorder_level - rm.current_stock) as shortfall,
      rm.unit,
      s.name as supplier,
      s.lead_time_days,
      rm.cost_per_unit,
      rm.reorder_quantity
    FROM raw_materials rm
    LEFT JOIN suppliers s ON rm.supplier_id = s.id
    WHERE rm.current_stock < rm.reorder_level
    ORDER BY shortfall DESC
  `,

  // ==========================================================================
  // DISTRIBUTORS & REVENUE
  // ==========================================================================

  top_distributors: `
    SELECT
      d.name as distributor,
      d.region,
      d.type,
      d.total_orders,
      ROUND(d.total_volume_liters::NUMERIC, 0) as total_volume_liters,
      ROUND(d.revenue::NUMERIC, 2) as total_revenue,
      ROUND((d.revenue / NULLIF(d.total_volume_liters, 0))::NUMERIC, 2) as revenue_per_liter,
      d.relationship_start_date
    FROM distributors d
    WHERE d.total_orders > 0
    ORDER BY d.revenue DESC
    LIMIT 10
  `,

  top_products_by_revenue: `
    SELECT
      p.name as product,
      bs.name as beer_style,
      p.package_type,
      SUM(mr.units_sold) as total_units_sold,
      ROUND(SUM(mr.revenue)::NUMERIC, 2) as total_revenue,
      ROUND(SUM(mr.gross_profit)::NUMERIC, 2) as total_profit,
      ROUND((SUM(mr.gross_profit) / NULLIF(SUM(mr.revenue), 0) * 100)::NUMERIC, 1) as profit_margin_pct
    FROM products p
    JOIN beer_styles bs ON p.beer_style_id = bs.id
    JOIN monthly_revenue mr ON p.id = mr.product_id
    WHERE mr.year >= EXTRACT(YEAR FROM NOW()) - 1
    GROUP BY p.id, p.name, bs.name, p.package_type
    ORDER BY total_revenue DESC
    LIMIT 10
  `,

  revenue_by_product_category: `
    SELECT
      bs.category as beer_category,
      COUNT(DISTINCT p.id) as product_count,
      SUM(mr.units_sold) as total_units,
      ROUND(SUM(mr.revenue)::NUMERIC, 2) as total_revenue,
      ROUND(SUM(mr.gross_profit)::NUMERIC, 2) as gross_profit,
      ROUND((SUM(mr.gross_profit) / NULLIF(SUM(mr.revenue), 0) * 100)::NUMERIC, 1) as margin_pct
    FROM beer_styles bs
    JOIN products p ON bs.id = p.beer_style_id
    JOIN monthly_revenue mr ON p.id = mr.product_id
    WHERE mr.year >= EXTRACT(YEAR FROM NOW()) - 1
    GROUP BY bs.category
    ORDER BY total_revenue DESC
  `,

  seasonal_demand_patterns: `
    SELECT
      mr.month,
      TO_CHAR(TO_DATE(mr.month::TEXT, 'MM'), 'Month') as month_name,
      SUM(mr.units_sold) as total_units,
      ROUND(SUM(mr.revenue)::NUMERIC, 2) as total_revenue,
      ROUND(AVG(mr.revenue)::NUMERIC, 2) as avg_product_revenue,
      COUNT(DISTINCT mr.product_id) as active_products
    FROM monthly_revenue mr
    WHERE mr.year >= EXTRACT(YEAR FROM NOW()) - 1
    GROUP BY mr.month
    ORDER BY mr.month
  `,

  profitable_product_lines: `
    SELECT
      bs.name as beer_style,
      COUNT(DISTINCT p.id) as products,
      SUM(mr.units_sold) as units_sold,
      ROUND(SUM(mr.revenue)::NUMERIC, 2) as revenue,
      ROUND(SUM(mr.cost_of_goods)::NUMERIC, 2) as cogs,
      ROUND(SUM(mr.gross_profit)::NUMERIC, 2) as gross_profit,
      ROUND((SUM(mr.gross_profit) / NULLIF(SUM(mr.revenue), 0) * 100)::NUMERIC, 1) as profit_margin
    FROM beer_styles bs
    JOIN products p ON bs.id = p.beer_style_id
    JOIN monthly_revenue mr ON p.id = mr.product_id
    WHERE mr.year >= EXTRACT(YEAR FROM NOW()) - 1
    GROUP BY bs.id, bs.name
    ORDER BY gross_profit DESC
  `,

  // ==========================================================================
  // EQUIPMENT & CAPACITY
  // ==========================================================================

  capacity_utilization: `
    SELECT
      pl.name as production_line,
      pl.facility,
      pl.capacity_liters as line_capacity,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC, 0) as actual_production,
      ROUND((SUM(pb.actual_volume_liters) / (pl.capacity_liters * 365) * 100)::NUMERIC, 1) as utilization_pct,
      COUNT(pb.id) as batches_completed
    FROM production_lines pl
    LEFT JOIN production_batches pb ON pl.id = pb.production_line_id
      AND pb.status = 'completed'
      AND pb.start_date >= NOW() - INTERVAL '1 year'
    GROUP BY pl.id, pl.name, pl.facility, pl.capacity_liters
    ORDER BY utilization_pct DESC NULLS LAST
  `,

  equipment_performance: `
    SELECT
      e.name as equipment,
      e.type,
      pl.name as production_line,
      e.status,
      e.efficiency_rating,
      COUNT(ed.id) as downtime_events,
      ROUND(SUM(EXTRACT(EPOCH FROM (ed.end_time - ed.start_time)) / 3600)::NUMERIC, 1) as total_downtime_hours,
      e.last_maintenance,
      e.next_maintenance
    FROM equipment e
    JOIN production_lines pl ON e.production_line_id = pl.id
    LEFT JOIN equipment_downtime ed ON e.id = ed.equipment_id
      AND ed.start_time >= NOW() - INTERVAL '12 months'
    GROUP BY e.id, e.name, e.type, pl.name, e.status, e.efficiency_rating, e.last_maintenance, e.next_maintenance
    ORDER BY total_downtime_hours DESC NULLS LAST
  `,

  // ==========================================================================
  // COST ANALYSIS
  // ==========================================================================

  cost_per_hectoliter: `
    SELECT
      pl.name as production_line,
      pl.facility,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC / 100, 0) as hectoliters_produced,
      ROUND(SUM(mu.cost)::NUMERIC, 2) as total_material_cost,
      ROUND((SUM(mu.cost) / NULLIF(SUM(pb.actual_volume_liters) / 100, 0))::NUMERIC, 2) as cost_per_hectoliter
    FROM production_lines pl
    JOIN production_batches pb ON pl.id = pb.production_line_id
    JOIN material_usage mu ON pb.id = mu.batch_id
    WHERE pb.status = 'completed'
      AND pb.start_date >= NOW() - INTERVAL '12 months'
    GROUP BY pl.id, pl.name, pl.facility
    ORDER BY cost_per_hectoliter ASC
  `,

  waste_rates_by_line: `
    SELECT
      pl.name as production_line,
      COUNT(pb.id) as total_batches,
      ROUND(SUM(pb.target_volume_liters)::NUMERIC, 0) as target_volume,
      ROUND(SUM(pb.actual_volume_liters)::NUMERIC, 0) as actual_volume,
      ROUND(SUM(pb.target_volume_liters - COALESCE(pb.actual_volume_liters, 0))::NUMERIC, 0) as volume_loss,
      ROUND(((SUM(pb.target_volume_liters) - SUM(COALESCE(pb.actual_volume_liters, 0))) / NULLIF(SUM(pb.target_volume_liters), 0) * 100)::NUMERIC, 2) as waste_rate_pct,
      ROUND(SUM(qi.product_loss_liters)::NUMERIC, 0) as quality_loss
    FROM production_lines pl
    JOIN production_batches pb ON pl.id = pb.production_line_id
    LEFT JOIN quality_issues qi ON pb.id = qi.batch_id
    WHERE pb.status = 'completed'
      AND pb.start_date >= NOW() - INTERVAL '12 months'
    GROUP BY pl.id, pl.name
    ORDER BY waste_rate_pct DESC
  `,

  // ==========================================================================
  // FERMENTATION ANALYSIS
  // ==========================================================================

  avg_fermentation_by_style: `
    SELECT
      bs.name as beer_style,
      bs.fermentation_days as target_days,
      ROUND(AVG(EXTRACT(EPOCH FROM (pb.end_date - pb.start_date)) / 86400)::NUMERIC, 1) as actual_avg_days,
      COUNT(*) as batches_analyzed,
      ROUND(AVG(pb.efficiency_percentage)::NUMERIC, 1) as avg_efficiency
    FROM beer_styles bs
    JOIN production_batches pb ON bs.id = pb.beer_style_id
    WHERE pb.status = 'completed' AND pb.end_date IS NOT NULL
    GROUP BY bs.id, bs.name, bs.fermentation_days
    ORDER BY bs.name
  `,
} as const

export type QueryKey = keyof typeof BREWERY_QUERIES

/**
 * Execute a predefined brewery query
 */
export async function executeBreweryQuery(queryKey: QueryKey): Promise<QueryResult> {
  const sql = BREWERY_QUERIES[queryKey]
  const startTime = Date.now()

  try {
    const result = await query(sql)
    const executionTime = Date.now() - startTime

    return {
      columns: result.fields.map(f => f.name),
      rows: result.rows as Record<string, unknown>[],
      rowCount: result.rowCount || 0,
      executionTime,
      sql,
    }
  } catch (error) {
    console.error(`Error executing query ${queryKey}:`, error)
    throw error
  }
}

/**
 * Map natural language questions to query keys
 */
export function mapQuestionToQuery(question: string): QueryKey | null {
  const questionLower = question.toLowerCase()

  // Production & Operations
  if (questionLower.includes('production volume') && questionLower.includes('style')) {
    return 'production_volume_by_style'
  }
  if (questionLower.includes('fermentation') && questionLower.includes('efficiency')) {
    return 'fermentation_efficiency_by_line'
  }
  if (questionLower.includes('downtime') && (questionLower.includes('cost') || questionLower.includes('impact'))) {
    return 'production_line_downtime'
  }
  if (questionLower.includes('monthly') && (questionLower.includes('trend') || questionLower.includes('production'))) {
    return 'monthly_production_trends'
  }
  if (questionLower.includes('today') && questionLower.includes('summary')) {
    return 'todays_production_summary'
  }

  // Quality Control
  if (questionLower.includes('common') && questionLower.includes('quality') && questionLower.includes('issue')) {
    return 'common_quality_issues'
  }
  if (questionLower.includes('quality') && questionLower.includes('issue') && questionLower.includes('resolution')) {
    return 'common_quality_issues'
  }
  if (questionLower.includes('failure') && questionLower.includes('rate')) {
    return 'batch_failure_rates'
  }
  if (questionLower.includes('quality') && questionLower.includes('batch')) {
    return 'quality_issues_by_batch'
  }
  if ((questionLower.includes('test') && questionLower.includes('variance')) ||
      (questionLower.includes('quality') && questionLower.includes('variance'))) {
    return 'quality_test_variance'
  }
  if ((questionLower.includes('highest') && questionLower.includes('quality')) ||
      (questionLower.includes('best') && questionLower.includes('quality'))) {
    return 'highest_quality_batches'
  }

  // Inventory & Supply Chain
  if (questionLower.includes('material') && (questionLower.includes('usage') || questionLower.includes('trend') || questionLower.includes('cost'))) {
    return 'material_usage_trends'
  }
  if (questionLower.includes('supplier') && (questionLower.includes('reliab') || questionLower.includes('delivery'))) {
    return 'supplier_reliability'
  }
  if (questionLower.includes('reorder') ||
      questionLower.includes('below reorder') ||
      (questionLower.includes('inventory') && questionLower.includes('low')) ||
      (questionLower.includes('material') && questionLower.includes('level'))) {
    return 'inventory_reorder_alerts'
  }

  // Distributors & Revenue
  if (questionLower.includes('distributor')) {
    return 'top_distributors'
  }
  if ((questionLower.includes('top') && questionLower.includes('product') && questionLower.includes('revenue')) ||
      (questionLower.includes('best') && questionLower.includes('product'))) {
    return 'top_products_by_revenue'
  }
  if (questionLower.includes('revenue') && questionLower.includes('category')) {
    return 'revenue_by_product_category'
  }
  if (questionLower.includes('seasonal') && questionLower.includes('demand')) {
    return 'seasonal_demand_patterns'
  }
  if (questionLower.includes('profitable') || (questionLower.includes('profit') && questionLower.includes('margin'))) {
    return 'profitable_product_lines'
  }

  // Equipment & Capacity
  if (questionLower.includes('capacity') && (questionLower.includes('utiliz') || questionLower.includes('line'))) {
    return 'capacity_utilization'
  }
  if (questionLower.includes('equipment') && (questionLower.includes('perform') || questionLower.includes('maintenance'))) {
    return 'equipment_performance'
  }

  // Cost Analysis
  if (questionLower.includes('cost') && questionLower.includes('hectoliter')) {
    return 'cost_per_hectoliter'
  }
  if (questionLower.includes('waste') && (questionLower.includes('rate') || questionLower.includes('line'))) {
    return 'waste_rates_by_line'
  }

  // Fermentation
  if (questionLower.includes('fermentation') && (questionLower.includes('time') || questionLower.includes('days'))) {
    return 'avg_fermentation_by_style'
  }

  return null
}
