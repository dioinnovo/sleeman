# ⛳ Ship Sticks Intelligence Platform - AI-Powered Golf Equipment Shipping

> **Quick Start**: Deploy and run the complete AI-powered golf equipment shipping and logistics platform in under 10 minutes

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## 🚀 Quick Deploy (Virtual Machine Ready)

### Prerequisites for VM Deployment
- **Linux VM** (Ubuntu 20.04+ recommended) with 4GB+ RAM
- **SSH access** to your virtual machine
- **Domain/IP** for external access (optional)

### 1. VM Setup (Ubuntu/Debian)

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt install git -y

# Verify installations
node --version    # Should show v20.x.x
npm --version     # Should show 10.x.x
git --version     # Should show git version 2.x.x
```

### 2. Clone and Setup Application

```bash
# Clone the Ship Sticks repository
git clone https://github.com/dioinnovo/shipsticks.git

# Navigate to project
cd shipsticks

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Start the application
npm run dev
```

### 3. Access the Application

**Local Access:**
- Open browser: `http://localhost:3000`
- Application automatically loads the Healthcare Dashboard

**Remote Access (VM with public IP):**
```bash
# Allow port 3000 through firewall
sudo ufw allow 3000

# Start with host binding for external access
npm run dev -- --hostname 0.0.0.0
```
- Access via: `http://YOUR_VM_IP:3000`

## 🎯 What You Get Out of the Box

### Core Features Available Immediately:
- **📋 Policy Analysis Dashboard** - Comprehensive insurance policy review
- **🤖 Arthur AI Assistant** - Intelligent policy interpretation and guidance
- **🏥 Provider Network Analysis** - Identify gaps and opportunities in healthcare networks
- **📊 Cost Analysis & Optimization** - Treatment opportunity cost calculations
- **🔄 Care Coordination Tools** - Streamline referrals and care pathways
- **📈 Analytics & Insights** - Data-driven healthcare optimization

### Pre-configured Integrations:
- ✅ **AI Policy Analysis** - Advanced NLP for policy interpretation
- ✅ **Provider Directory Integration** - Real-time provider network data
- ✅ **Claims Processing Intelligence** - Automated claims analysis
- ✅ **Prior Authorization Automation** - Streamline approval workflows
- ✅ **Performance Analytics** - Track network efficiency metrics
- ✅ **Secure Messaging** - HIPAA-compliant communication
- ✅ **Database** - PostgreSQL with Prisma ORM

## 🤖 Text-to-SQL Analytics Agent

The Ship Sticks platform includes an advanced AI-powered Text-to-SQL agent that transforms natural language questions into SQL queries, providing instant business insights.

### Key Features:
- **Natural Language Interface**: Ask questions in plain English
- **Lightning Fast**: 10-15 seconds for simple queries (85% faster than traditional methods)
- **15 Pre-Built Questions**: Quick access to common business queries
- **Automatic Optimization**: Smart routing between fast path and full agent
- **Schema Caching**: Eliminates redundant database lookups
- **100% Safe**: Read-only access with SQL injection prevention

### Quick Start:
```bash
# Navigate to SQL Analytics
http://localhost:3000/dashboard/analytics

# Try a Quick Question:
"Compare carrier on-time delivery performance"

# Or ask your own:
"Which routes have the highest failure rates and what is the cost impact?"
```

### Performance:
- **Simple Queries**: 10-15 seconds (Fast Path)
- **Complex Queries**: 45-60 seconds (Cached Schema)
- **Cache Hit Rate**: 90%+
- **Query Success Rate**: 98%+

### Documentation:
- **Technical Architecture**: [docs/SQL_AGENT_ARCHITECTURE.md](docs/SQL_AGENT_ARCHITECTURE.md)
- **Business Case & ROI**: [docs/SQL_AGENT_BUSINESS_CASE.md](docs/SQL_AGENT_BUSINESS_CASE.md)
- **Database Audit**: [DATABASE_AUDIT_REPORT.md](DATABASE_AUDIT_REPORT.md)

### Sample Questions:
1. What is our customer lifetime value by acquisition channel?
2. Compare carrier performance by success rate and profit margin
3. Which routes have the highest failure rates?
4. Show me conversion rates by customer segment
5. Analyze revenue trends by month
6. What are the top customer service issues?
7. Compare profit margins across service tiers
8. Which partner courses generate the most revenue?

**ROI:** 3,023% in Year 1 | **Payback:** 11.7 days | **Time Savings:** 99.9%

## 🛠️ Production Deployment

### Docker Deployment (Recommended for Production)

```bash
# Create Dockerfile (if not exists)
cat > Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
EOF

# Build and run with Docker
docker build -t arthur-health-app .
docker run -d -p 3000:3000 --name arthur-health-app arthur-health-app
```

### PM2 Process Manager (Alternative)

```bash
# Install PM2 globally
npm install -g pm2

# Build for production
npm run build

# Start with PM2
pm2 start npm --name "arthur-health-app" -- start

# Setup auto-restart on boot
pm2 startup
pm2 save
```

### Nginx Reverse Proxy (Optional)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/arthur-health << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/arthur-health /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📁 Project Structure

```
arthur-health-intelligence/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Main application dashboards
│   │   ├── assistant/            # Arthur AI Assistant interface
│   │   ├── care-coordination/    # Care coordination workflows
│   │   ├── compliance/           # Compliance monitoring
│   │   ├── integrations/         # Third-party integrations
│   │   ├── referrals/            # Referral management
│   │   └── reports/              # Analytics and reports
│   ├── api/                      # API endpoints
│   └── page.tsx                  # Landing page
├── components/                   # Reusable UI components
├── lib/                          # Utilities and integrations
├── docs/                         # Documentation
│   └── INSTALLATION.md           # Detailed setup guide
├── prisma/                       # Database schema and migrations
└── .env.local                    # Environment configuration
```

## 🔧 Configuration

### Environment Variables (Pre-configured for demo)

The application comes with a ready-to-use `.env.local` file containing:

```env
# AI Services (Configure with your keys)
ANTHROPIC_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key

# Arthur Health CareNexus Integration
ARTHUR_API_ENDPOINT=https://api.arthur.health/v1
ARTHUR_API_KEY=your_api_key

# Database (PostgreSQL for production)
DATABASE_URL="postgresql://user:password@localhost:5432/arthur_health"

# Application Settings
NEXT_PUBLIC_DEMO_MODE=true
NODE_ENV=development
```

### For Production - Update These:

```bash
# Edit environment file
nano .env.local

# Update these values:
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_DEMO_MODE=false
```

## 🧪 Testing the Deployment

### 1. Application Health Check
```bash
# Test if application is running
curl http://localhost:3000/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

### 2. Database Connection
```bash
# Open Prisma Studio to view data
npx prisma studio
# Opens http://localhost:5555 with database interface
```

### 3. Feature Testing
- **Policy Analysis**: Upload and analyze insurance policies
- **Arthur AI Assistant**: Test policy interpretation queries
- **Provider Network**: Explore network gaps and opportunities
- **Care Coordination**: Test referral workflows
- **Report Generation**: Generate analytics reports

## 🐛 Quick Troubleshooting

### Application Won't Start
```bash
# Check Node.js version
node --version  # Must be 20+

# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset database
npx prisma migrate reset
npx prisma migrate dev --name fresh_start
```

### Port Issues
```bash
# Find process using port 3000
sudo lsof -ti:3000

# Kill process
sudo kill -9 $(sudo lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

### Permission Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

## 📖 Documentation

- **[Complete Installation Guide](docs/INSTALLATION.md)** - Detailed setup instructions
- **[API Documentation](docs/API.md)** - API endpoints and usage
- **[Integration Guide](docs/INTEGRATIONS.md)** - Third-party service integration
- **[Arthur Health Website](https://arthur.health)** - Learn more about Arthur Health

## 🔐 Security & Compliance

### HIPAA Compliance:
- ✅ End-to-end encryption for PHI
- ✅ Audit logging for all data access
- ✅ Role-based access control (RBAC)
- ✅ Secure API authentication
- ✅ Data encryption at rest

### Production Security Checklist:
- [ ] Configure production API keys in `.env.local`
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up HIPAA-compliant infrastructure
- [ ] Configure audit logging
- [ ] Implement backup strategies
- [ ] Set up monitoring and alerting

## 🎯 Key Use Cases

### Healthcare Providers
- Understand patient insurance coverage instantly
- Identify prior authorization requirements
- Optimize treatment plans based on coverage
- Reduce claim denials and rejections

### Healthcare Networks
- Analyze network adequacy and gaps
- Optimize provider referral patterns
- Track network performance metrics
- Improve care coordination efficiency

### Payers & Insurance Companies
- Streamline policy interpretation for providers
- Reduce prior authorization processing time
- Improve provider satisfaction scores
- Decrease administrative burden

### Care Coordinators
- Automate referral management
- Track patient care journeys
- Ensure network compliance
- Optimize care pathways

## 📊 Performance Metrics

**Expected Performance:**
- **Policy Analysis**: < 5 seconds per document
- **AI Response Time**: < 2 seconds average
- **Database Queries**: < 100ms average
- **Page Load Times**: < 2 seconds

**Resource Requirements:**
- **Development**: 2GB RAM, 1 CPU core
- **Production**: 8GB RAM, 4 CPU cores
- **Storage**: 20GB minimum (including ML models)

## 🆘 Support

### Quick Help
- **Documentation**: Check `docs/` directory for guides
- **Logs**: Check browser console and terminal output
- **Database**: Use `npx prisma studio` to inspect data

### Contact
- **Website**: [https://arthur.health](https://arthur.health)
- **Support Email**: support@arthur.health
- **Technical Issues**: Create issue in GitHub repository

---

## 📋 Quick Commands Reference

```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with turbo mode (faster)

# Production
npm run build           # Build for production
npm start              # Start production server

# Database
npx prisma studio      # Open database interface
npx prisma migrate dev # Apply database changes

# Testing
npm run test           # Run test suite
npm run test:e2e       # Run end-to-end tests

# Utilities
npm run lint           # Check code quality
npm run format         # Format code
```

**🚀 Ready to transform healthcare operations? Deploy the Arthur Health Intelligence Platform and experience the power of AI-driven healthcare coordination!**

---

*Built with ❤️ by Arthur Health - Empowering high-value, coordinated healthcare through data-driven insights*