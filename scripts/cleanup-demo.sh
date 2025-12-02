#!/bin/bash
#
# Sleeman BrewMind Demo Cleanup Script
# Run this script when finishing a demo session to free up system resources
#
# Usage: ./scripts/cleanup-demo.sh
#

set -e

echo "🧹 Cleaning up Sleeman BrewMind demo environment..."
echo ""

# Stop Next.js development server
echo "📦 Stopping Next.js server..."
pkill -f "next dev" 2>/dev/null && echo "   ✅ Next.js stopped" || echo "   ⚪ Next.js was not running"

# Stop the BrewMind Docker database
echo "🐳 Stopping Docker database..."
docker stop sleeman-brewmind-db 2>/dev/null && echo "   ✅ sleeman-brewmind-db stopped" || echo "   ⚪ sleeman-brewmind-db was not running"

# Stop any Homebrew PostgreSQL services (common source of port 5432 conflicts)
echo "🍺 Stopping Homebrew PostgreSQL..."
brew services stop postgresql@14 2>/dev/null && echo "   ✅ postgresql@14 stopped" || echo "   ⚪ postgresql@14 was not running"
brew services stop postgresql@15 2>/dev/null && echo "   ✅ postgresql@15 stopped" || echo "   ⚪ postgresql@15 was not running"
brew services stop postgresql@16 2>/dev/null && echo "   ✅ postgresql@16 stopped" || echo "   ⚪ postgresql@16 was not running"
brew services stop postgresql 2>/dev/null && echo "   ✅ postgresql stopped" || echo "   ⚪ postgresql was not running"

# Kill any orphaned postgres processes on common ports
echo "🔪 Cleaning up orphaned processes..."
if lsof -ti:5432 > /dev/null 2>&1; then
    lsof -ti:5432 | xargs kill -9 2>/dev/null
    echo "   ✅ Killed processes on port 5432"
else
    echo "   ⚪ Port 5432 was already free"
fi

if lsof -ti:5433 > /dev/null 2>&1; then
    lsof -ti:5433 | xargs kill -9 2>/dev/null
    echo "   ✅ Killed processes on port 5433"
else
    echo "   ⚪ Port 5433 was already free"
fi

if lsof -ti:3000 > /dev/null 2>&1; then
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    echo "   ✅ Killed processes on port 3000"
else
    echo "   ⚪ Port 3000 was already free"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Cleanup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Verification:"
echo "   Port 3000 (Next.js):  $(lsof -i :3000 -t 2>/dev/null || echo '✅ free')"
echo "   Port 5432 (Legacy):   $(lsof -i :5432 -t 2>/dev/null || echo '✅ free')"
echo "   Port 5433 (BrewMind): $(lsof -i :5433 -t 2>/dev/null || echo '✅ free')"
echo ""
echo "🐳 Docker containers:"
docker ps --format "   {{.Names}}: {{.Status}}" 2>/dev/null || echo "   No containers running"
echo ""
echo "💡 To restart the demo, run:"
echo "   docker-compose up -d sleeman-brewmind-db && pnpm run dev"
echo ""
