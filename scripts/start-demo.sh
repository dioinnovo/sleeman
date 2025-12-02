#!/bin/bash
#
# Sleeman BrewMind Demo Start Script
# Run this script to start the demo environment cleanly
#
# Usage: ./scripts/start-demo.sh
#

set -e

echo "🚀 Starting Sleeman BrewMind demo environment..."
echo ""

# Step 1: Clean up any conflicting processes
echo "🧹 Step 1: Cleaning up conflicting processes..."

# Stop Homebrew PostgreSQL to prevent port 5432 conflicts
brew services stop postgresql@14 2>/dev/null || true
brew services stop postgresql@15 2>/dev/null || true
brew services stop postgresql@16 2>/dev/null || true
brew services stop postgresql 2>/dev/null || true

# Kill any orphaned postgres on port 5432
lsof -ti:5432 | xargs kill -9 2>/dev/null || true
echo "   ✅ Port 5432 cleared"

# Step 2: Unset shell DATABASE_URL to prevent override
echo "🔧 Step 2: Ensuring clean environment..."
unset DATABASE_URL
echo "   ✅ DATABASE_URL unset from shell"

# Step 3: Start Docker database
echo "🐳 Step 3: Starting BrewMind database..."
docker-compose up -d sleeman-brewmind-db

# Wait for database to be healthy
echo "   ⏳ Waiting for database to be ready..."
for i in {1..30}; do
    if docker exec sleeman-brewmind-db pg_isready -U brewmind > /dev/null 2>&1; then
        echo "   ✅ Database is ready!"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo "   ❌ Database failed to start within 30 seconds"
        exit 1
    fi
done

# Step 4: Start Next.js
echo "📦 Step 4: Starting Next.js development server..."
pkill -f "next dev" 2>/dev/null || true
sleep 1

# Start Next.js in background
pnpm run dev &
NEXTJS_PID=$!

# Wait for Next.js to be ready
echo "   ⏳ Waiting for Next.js to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "   ✅ Next.js is ready!"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo "   ⚠️  Next.js may still be starting..."
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Demo environment is ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Application: http://localhost:3000"
echo "🤖 SQL Agent:   http://localhost:3000/api/sql-agent"
echo "📊 Dashboard:   http://localhost:3000/dashboard"
echo ""
echo "🐳 Docker Status:"
docker ps --filter "name=sleeman" --format "   {{.Names}}: {{.Status}}"
echo ""
echo "💡 When finished, run: ./scripts/cleanup-demo.sh"
echo ""
