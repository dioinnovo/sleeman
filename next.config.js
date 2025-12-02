/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  // Skip type checking during build (speeds up build and avoids certain React 19 edge cases)
  typescript: {
    // This is needed for Next.js 16 + React 19 global-error compatibility
    ignoreBuildErrors: false,
  },
  // Skip static generation for error pages to avoid React 19 context issues
  output: 'standalone',
  // Configure Turbopack for Next.js 16+ (default build tool)
  turbopack: {
    // Resolve aliases work similarly to webpack
    resolveAlias: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scottradjusting.com',
      },
      {
        protocol: 'https',
        hostname: 'amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Server external packages (not bundled)
  // Includes heavy AI/ML packages and unused TypeORM database drivers
  serverExternalPackages: [
    'onnxruntime-node',
    'chromadb',
    '@prisma/client',
    '@tensorflow/tfjs-node',
    '@huggingface/transformers',
    'sharp',
    'canvas',
    'puppeteer',
    'playwright',
    // Unused TypeORM drivers (we only use PostgreSQL via pg package)
    'mysql',
    'mysql2',
    'mssql',
    'sql.js',
    'sqlite3',
    'better-sqlite3',
    'oracledb',
    'react-native-sqlite-storage',
    'mongodb',
    'redis',
    'ioredis',
    'typeorm-aurora-data-api-driver',
  ],
}

module.exports = nextConfig