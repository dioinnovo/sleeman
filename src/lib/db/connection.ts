import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'

// PostgreSQL connection pool
let pool: Pool | null = null

/**
 * Get or create the PostgreSQL connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.BREWMIND_DB_HOST || 'localhost',
      port: parseInt(process.env.BREWMIND_DB_PORT || '5433'),
      database: process.env.BREWMIND_DB_NAME || 'brewmind',
      user: process.env.BREWMIND_DB_USER || 'brewmind',
      password: process.env.BREWMIND_DB_PASSWORD || 'brewmind_demo_2024',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }
  return pool
}

/**
 * Execute a SQL query with parameters
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const pool = getPool()
  const start = Date.now()

  try {
    const result = await pool.query<T>(sql, params)
    const duration = Date.now() - start

    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { sql: sql.substring(0, 100), duration, rows: result.rowCount })
    }

    return result
  } catch (error) {
    console.error('Database query error:', { sql: sql.substring(0, 100), error })
    throw error
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool()
  return pool.connect()
}

/**
 * Execute multiple statements in a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getClient()

  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

/**
 * Check database connection health
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as connected')
    return result.rows.length > 0
  } catch {
    return false
  }
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}

// Export types for consumers
export type { Pool, PoolClient, QueryResult }
