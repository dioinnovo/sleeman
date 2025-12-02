import { NextRequest, NextResponse } from 'next/server'
import {
  executeBreweryQuery,
  mapQuestionToQuery,
  BREWERY_QUERIES,
  type QueryKey
} from '@/lib/db/brewery-queries'
import { checkConnection } from '@/lib/db/connection'

export const dynamic = 'force-dynamic'

/**
 * POST /api/brewery/query
 *
 * Execute a brewery analytics query
 *
 * Body:
 * - queryKey: (optional) Direct query key from BREWERY_QUERIES
 * - question: (optional) Natural language question to map to a query
 * - customSql: (optional) Custom SQL for advanced queries (future use)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { queryKey, question } = body

    // Check database connection
    const isConnected = await checkConnection()
    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database connection failed',
          message: 'Please ensure the BrewMind database is running (docker-compose up -d)',
        },
        { status: 503 }
      )
    }

    // Determine which query to execute
    let resolvedQueryKey: QueryKey | null = null

    if (queryKey && queryKey in BREWERY_QUERIES) {
      resolvedQueryKey = queryKey as QueryKey
    } else if (question) {
      resolvedQueryKey = mapQuestionToQuery(question)
    }

    if (!resolvedQueryKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unknown query',
          message: question
            ? `Could not map question to a known query: "${question}"`
            : 'Please provide a valid queryKey or question',
          availableQueries: Object.keys(BREWERY_QUERIES),
        },
        { status: 400 }
      )
    }

    // Execute the query
    const result = await executeBreweryQuery(resolvedQueryKey)

    return NextResponse.json({
      success: true,
      queryKey: resolvedQueryKey,
      question: question || null,
      data: result,
    })
  } catch (error) {
    console.error('Brewery query error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Query execution failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/brewery/query
 *
 * List all available brewery queries
 */
export async function GET() {
  const queries = Object.entries(BREWERY_QUERIES).map(([key, sql]) => ({
    key,
    description: getQueryDescription(key),
    sql: sql.trim().substring(0, 200) + '...',
  }))

  return NextResponse.json({
    success: true,
    queries,
    count: queries.length,
  })
}

/**
 * Get human-readable description for a query key
 */
function getQueryDescription(key: string): string {
  const descriptions: Record<string, string> = {
    production_volume_by_style: 'Production volume breakdown by beer style over 12 months',
    fermentation_efficiency_by_line: 'Fermentation efficiency comparison across production lines',
    production_line_downtime: 'Production line downtime events and cost impact',
    monthly_production_trends: 'Monthly production trends and batch statistics',
    todays_production_summary: "Today's production status and metrics",
    quality_issues_by_batch: 'Quality issues with batch details and resolution',
    batch_failure_rates: 'Batch failure rates by beer style',
    quality_test_variance: 'Quality test variance from expected values',
    common_quality_issues: 'Most common quality issues and resolution times',
    highest_quality_batches: 'Top performing batches by quality metrics',
    material_usage_trends: 'Raw material usage trends and costs',
    supplier_reliability: 'Supplier reliability scores and delivery rates',
    inventory_reorder_alerts: 'Materials below reorder level',
    top_distributors: 'Top distributors by volume and revenue',
    top_products_by_revenue: 'Best selling products by revenue',
    revenue_by_product_category: 'Revenue breakdown by beer category',
    seasonal_demand_patterns: 'Seasonal demand patterns throughout the year',
    profitable_product_lines: 'Most profitable product lines by margin',
    capacity_utilization: 'Production line capacity utilization',
    equipment_performance: 'Equipment performance and maintenance status',
    cost_per_hectoliter: 'Production cost per hectoliter by line',
    waste_rates_by_line: 'Waste rates and volume loss by production line',
    avg_fermentation_by_style: 'Average fermentation time by beer style',
  }

  return descriptions[key] || 'No description available'
}
