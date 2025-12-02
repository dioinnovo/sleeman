# Database Management Guide

This document provides guidance for managing PostgreSQL databases in the Sleeman BrewMind project, including common issues and their resolutions.

## Table of Contents
- [Current Database Configuration](#current-database-configuration)
- [Common Issues and Resolutions](#common-issues-and-resolutions)
- [Database Lifecycle Management](#database-lifecycle-management)
- [Troubleshooting Checklist](#troubleshooting-checklist)
- [Best Practices](#best-practices)

---

## Current Database Configuration

### Production Database (BrewMind)
- **Container Name**: `sleeman-brewmind-db`
- **Port**: `5433` (maps to internal 5432)
- **Database**: `brewmind`
- **User**: `brewmind`
- **Password**: `brewmind_demo_2024`
- **Connection String**: `postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind`

### Environment Variable
```bash
# In .env.local
DATABASE_URL="postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind"
```

---

## Common Issues and Resolutions

### Issue 1: Wrong Database Connection (Port 5432 vs 5433)

**Symptoms:**
- Queries fail with `relation "table_name" does not exist`
- Server logs show wrong DATABASE_URL (e.g., `postgresql://localhost:5432/shipsticks`)
- LLM generates SQL for wrong schema

**Root Cause:**
Multiple PostgreSQL instances running on different ports:
- Port 5432: Old/legacy database (Homebrew PostgreSQL, previous demos)
- Port 5433: Current BrewMind Docker database

**Resolution:**
1. Stop all PostgreSQL processes on port 5432:
   ```bash
   # Stop Homebrew PostgreSQL service
   brew services stop postgresql@14

   # Or kill directly
   lsof -ti:5432 | xargs kill -9
   ```

2. Verify only the correct database is running:
   ```bash
   # Should show sleeman-brewmind-db on port 5433
   docker ps --filter "name=sleeman" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

   # Should return empty (no process on 5432)
   lsof -i :5432 -t
   ```

3. Restart Next.js server to pick up correct environment:
   ```bash
   pkill -f "next dev"
   pnpm run dev
   ```

---

### Issue 2: Shell Environment Variable Override

**Symptoms:**
- `.env.local` has correct DATABASE_URL but server uses different value
- Server logs show old database URL despite correct `.env.local`

**Root Cause:**
Shell environment variable `DATABASE_URL` was set in the terminal, which takes precedence over `.env.local` file.

**Resolution:**
1. Unset the shell environment variable:
   ```bash
   unset DATABASE_URL
   ```

2. Verify it's unset:
   ```bash
   echo $DATABASE_URL  # Should be empty
   ```

3. Restart Next.js server:
   ```bash
   pkill -f "next dev"
   pnpm run dev
   ```

**Prevention:**
- Never export DATABASE_URL in shell profiles (`.bashrc`, `.zshrc`)
- Always use `.env.local` for database configuration
- When switching between projects, always restart terminal sessions

---

### Issue 3: Orphaned PostgreSQL Processes

**Symptoms:**
- Multiple PostgreSQL instances running
- Port conflicts when starting new databases
- Wasted system resources

**Root Cause:**
Previous demos or development sessions left PostgreSQL running:
- Homebrew PostgreSQL service auto-started
- Docker containers not stopped after demos
- Background processes not properly terminated

**Resolution:**
1. Find all PostgreSQL processes:
   ```bash
   ps aux | grep -E "postgres|postgresql" | grep -v grep
   ```

2. Stop Homebrew PostgreSQL:
   ```bash
   brew services stop postgresql@14
   # or for all versions
   brew services stop postgresql
   ```

3. Stop orphaned Docker containers:
   ```bash
   docker stop $(docker ps -q --filter "ancestor=postgres")
   ```

4. Verify cleanup:
   ```bash
   lsof -i :5432  # Should be empty
   lsof -i :5433  # Should show only sleeman-brewmind-db if running
   ```

---

## Database Lifecycle Management

### Starting the Demo Environment

```bash
# 1. Ensure no conflicting processes
brew services stop postgresql@14 2>/dev/null
lsof -ti:5432 | xargs kill -9 2>/dev/null

# 2. Start BrewMind database
docker-compose up -d sleeman-brewmind-db

# 3. Wait for healthy status
docker ps --filter "name=sleeman-brewmind-db" --format "{{.Status}}"

# 4. Start Next.js (ensure no DATABASE_URL in shell)
unset DATABASE_URL
pnpm run dev
```

### Stopping the Demo Environment

**CRITICAL: Always run these commands when finishing a demo session:**

```bash
# 1. Stop Next.js server
pkill -f "next dev"

# 2. Stop Docker database
docker stop sleeman-brewmind-db

# 3. Verify all stopped
lsof -i :3000  # Should be empty
lsof -i :5433  # Should be empty
docker ps      # Should not show sleeman-brewmind-db
```

### Complete Cleanup Script

Create this as `scripts/cleanup-demo.sh`:

```bash
#!/bin/bash
echo "🧹 Cleaning up demo environment..."

# Stop Next.js
echo "Stopping Next.js..."
pkill -f "next dev" 2>/dev/null

# Stop all project Docker containers
echo "Stopping Docker containers..."
docker stop sleeman-brewmind-db 2>/dev/null

# Stop any Homebrew PostgreSQL
echo "Stopping Homebrew PostgreSQL..."
brew services stop postgresql@14 2>/dev/null
brew services stop postgresql 2>/dev/null

# Kill any orphaned postgres processes on common ports
echo "Cleaning up orphaned processes..."
lsof -ti:5432 | xargs kill -9 2>/dev/null
lsof -ti:5433 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "✅ Cleanup complete!"
echo ""
echo "Verification:"
echo "  Port 3000: $(lsof -i :3000 -t 2>/dev/null || echo 'free')"
echo "  Port 5432: $(lsof -i :5432 -t 2>/dev/null || echo 'free')"
echo "  Port 5433: $(lsof -i :5433 -t 2>/dev/null || echo 'free')"
```

---

## Troubleshooting Checklist

When the SQL agent fails with database errors, follow this checklist:

### Step 1: Verify Docker Container
```bash
docker ps --filter "name=sleeman-brewmind-db"
```
- ✅ Should show container running on port 5433
- ❌ If not running: `docker-compose up -d sleeman-brewmind-db`

### Step 2: Check for Port Conflicts
```bash
lsof -i :5432
lsof -i :5433
```
- ✅ Port 5432 should be empty
- ✅ Port 5433 should show only Docker
- ❌ If 5432 has processes: Stop them (see Issue 1)

### Step 3: Verify Environment Variables
```bash
echo $DATABASE_URL
cat .env.local | grep DATABASE_URL
```
- ✅ Shell should be empty
- ✅ `.env.local` should have `postgresql://brewmind:...@localhost:5433/brewmind`
- ❌ If shell has value: `unset DATABASE_URL`

### Step 4: Test Database Connection
```bash
docker exec sleeman-brewmind-db psql -U brewmind -d brewmind -c "SELECT COUNT(*) FROM beer_styles;"
```
- ✅ Should return `8`
- ❌ If fails: Check container health

### Step 5: Restart Services
```bash
pkill -f "next dev"
unset DATABASE_URL
pnpm run dev
```

### Step 6: Verify API Health
```bash
curl -s http://localhost:3000/api/sql-agent | jq '.configuration'
```
- ✅ Should show `database: true, azureOpenAI: true, ready: true`

---

## Best Practices

### For AI Coding Agents

1. **Before modifying database configuration:**
   - Read this document first
   - Check current running processes: `docker ps` and `lsof -i :5432,:5433`
   - Never assume the database URL - always verify from `.env.local`

2. **When encountering "relation does not exist" errors:**
   - This almost always means wrong database connection
   - Check port 5432 for orphaned processes
   - Verify `DATABASE_URL` is not set in shell environment

3. **After making changes to database connection:**
   - Always restart Next.js server
   - Verify connection in server logs (look for `DATABASE_URL: postgresql://brewmind:***@localhost:5433/brewmind`)
   - Test with simple query before proceeding

4. **When finishing work:**
   - Run cleanup script or manual cleanup
   - Do not leave Docker containers running unnecessarily

### For Developers

1. **Never add DATABASE_URL to shell profiles**
   - Don't add to `.bashrc`, `.zshrc`, or similar
   - Use `.env.local` exclusively

2. **Use port 5433 for this project**
   - Port 5432 is reserved for system PostgreSQL
   - All Docker databases use non-standard ports

3. **Create demo-specific cleanup habits**
   - Stop containers when not in use
   - Run cleanup script at end of day

4. **Document any new databases**
   - Update this file with new database configurations
   - Include port, credentials, and container name

---

## Quick Reference

| Item | Value |
|------|-------|
| Docker Container | `sleeman-brewmind-db` |
| Port | `5433` |
| Database | `brewmind` |
| User | `brewmind` |
| Password | `brewmind_demo_2024` |
| Connection String | `postgresql://brewmind:brewmind_demo_2024@localhost:5433/brewmind` |
| Tables | 15 brewery tables |
| Data | 12 months of synthetic brewery data |

### Essential Commands

```bash
# Start database
docker-compose up -d sleeman-brewmind-db

# Stop database
docker stop sleeman-brewmind-db

# Check status
docker ps --filter "name=sleeman"

# Test connection
docker exec sleeman-brewmind-db psql -U brewmind -d brewmind -c "\\dt"

# Full cleanup
./scripts/cleanup-demo.sh
```

---

*Last Updated: December 2024*
*Document created after resolving database connection issues where orphaned PostgreSQL processes on port 5432 caused the SQL agent to connect to the wrong database.*
