'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <head>
        <title>Error - Sleeman BrewMind</title>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          padding: '16px'
        }}>
          <div style={{ maxWidth: '448px', width: '100%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
              Something went wrong!
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>
              {error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                backgroundColor: '#C8A960',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
