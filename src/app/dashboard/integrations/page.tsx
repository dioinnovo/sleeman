'use client'

import { useState } from 'react'
import {
  Server, Database, Shield, Activity, CheckCircle,
  AlertCircle, Clock, ArrowRight, ArrowLeft, RefreshCw,
  Lock, Zap, Factory, Truck, Users, Building2,
  Beaker, BarChart3, Cloud, Settings, TrendingUp
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface Integration {
  id: string
  name: string
  type: 'erp' | 'dcs' | 'hr' | 'quality' | 'distribution' | 'analytics'
  status: 'connected' | 'pending' | 'error' | 'disabled'
  description: string
  vendor: string
  lastSync?: Date
  recordsSync?: number
  dataFlow: 'bidirectional' | 'inbound' | 'outbound'
  features: string[]
}

interface DataFlow {
  source: string
  destination: string
  volume: number
  type: string
  frequency: string
}

export default function BreweryIntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'erp' | 'dcs' | 'hr' | 'quality' | 'distribution'>('all')

  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Oracle ERP Cloud',
      type: 'erp',
      status: 'connected',
      description: 'Enterprise resource planning for financial management, procurement, and supply chain',
      vendor: 'Oracle Corporation',
      lastSync: new Date(),
      recordsSync: 45823,
      dataFlow: 'bidirectional',
      features: ['Financial Data', 'Purchase Orders', 'Inventory Levels', 'Supplier Management', 'Cost Tracking']
    },
    {
      id: '2',
      name: 'Rockwell PlantPAx DCS',
      type: 'dcs',
      status: 'connected',
      description: 'Distributed Control System for real-time brewing process automation and monitoring',
      vendor: 'Rockwell Automation',
      lastSync: new Date(),
      recordsSync: 128456,
      dataFlow: 'inbound',
      features: ['Temperature Control', 'Fermentation Monitoring', 'Batch Control', 'Equipment Status', 'Alarm Management']
    },
    {
      id: '3',
      name: 'Workday HCM',
      type: 'hr',
      status: 'connected',
      description: 'Human capital management for employee data, training records, and certifications',
      vendor: 'Workday Inc.',
      lastSync: new Date(),
      recordsSync: 1247,
      dataFlow: 'inbound',
      features: ['Employee Records', 'Training Completion', 'Certifications', 'Shift Scheduling', 'Safety Training']
    },
    {
      id: '4',
      name: 'LIMS Quality System',
      type: 'quality',
      status: 'connected',
      description: 'Laboratory Information Management System for quality testing and compliance tracking',
      vendor: 'LabWare',
      lastSync: new Date(),
      recordsSync: 8934,
      dataFlow: 'bidirectional',
      features: ['Test Results', 'Batch Analysis', 'Compliance Reports', 'Certificate of Analysis', 'Trend Analysis']
    },
    {
      id: '5',
      name: 'LCBO Retail Link',
      type: 'distribution',
      status: 'connected',
      description: 'Integration with Liquor Control Board of Ontario for sales data and inventory',
      vendor: 'LCBO',
      lastSync: new Date(),
      recordsSync: 23567,
      dataFlow: 'inbound',
      features: ['Sales Data', 'Store Inventory', 'Order Forecasting', 'Promotional Data', 'Returns']
    },
    {
      id: '6',
      name: 'SAP Transportation',
      type: 'distribution',
      status: 'connected',
      description: 'Transportation management for shipment tracking and logistics optimization',
      vendor: 'SAP SE',
      lastSync: new Date(),
      recordsSync: 5621,
      dataFlow: 'bidirectional',
      features: ['Shipment Tracking', 'Route Optimization', 'Carrier Management', 'Delivery Scheduling', 'Freight Costs']
    },
    {
      id: '7',
      name: 'Power BI Analytics',
      type: 'analytics',
      status: 'connected',
      description: 'Business intelligence and reporting platform for executive dashboards',
      vendor: 'Microsoft',
      lastSync: new Date(),
      recordsSync: 0,
      dataFlow: 'outbound',
      features: ['Executive Dashboards', 'KPI Tracking', 'Ad-hoc Reports', 'Data Visualization', 'Alerts']
    },
    {
      id: '8',
      name: 'Sapporo Integration Hub',
      type: 'erp',
      status: 'pending',
      description: 'Parent company integration for consolidated reporting and data sharing',
      vendor: 'Sapporo Breweries',
      dataFlow: 'bidirectional',
      features: ['Financial Consolidation', 'Brand Performance', 'Global KPIs', 'Best Practices']
    }
  ]

  const dataFlows: DataFlow[] = [
    { source: 'PlantPAx DCS', destination: 'BrewMind', volume: 12847, type: 'Production Data', frequency: 'Real-time' },
    { source: 'Oracle ERP', destination: 'BrewMind', volume: 8923, type: 'Financial Data', frequency: 'Hourly' },
    { source: 'LIMS', destination: 'Quality Dashboard', volume: 2456, type: 'Test Results', frequency: 'Real-time' },
    { source: 'LCBO Retail', destination: 'Distribution Analytics', volume: 15634, type: 'Sales Data', frequency: 'Daily' },
    { source: 'BrewMind', destination: 'Power BI', volume: 5000, type: 'Analytics', frequency: 'Hourly' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'disabled': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'erp': return Building2
      case 'dcs': return Factory
      case 'hr': return Users
      case 'quality': return Beaker
      case 'distribution': return Truck
      case 'analytics': return BarChart3
      default: return Server
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'erp': return 'ERP System'
      case 'dcs': return 'Process Control'
      case 'hr': return 'Human Resources'
      case 'quality': return 'Quality Management'
      case 'distribution': return 'Distribution'
      case 'analytics': return 'Analytics'
      default: return 'Integration'
    }
  }

  const filteredIntegrations = integrations.filter(integration =>
    selectedCategory === 'all' || integration.type === selectedCategory
  )

  const stats = {
    totalIntegrations: integrations.length,
    connectedSystems: integrations.filter(i => i.status === 'connected').length,
    totalRecords: integrations.reduce((acc, i) => acc + (i.recordsSync || 0), 0),
    dataPointsPerDay: 156000
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Integrations"
        description="Enterprise system connectivity and data synchronization"
        action={
          <button type="button" className="h-12 px-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors font-semibold">
            <Cloud size={20} />
            <span>Add Integration</span>
          </button>
        }
      />

      {/* Integration Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <Server className="text-primary" size={20} />
            <span className="text-xs text-primary font-semibold">Active</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalIntegrations}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Integrations</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-600 dark:text-green-500" size={20} />
            <span className="text-xs text-green-600 dark:text-green-500 font-semibold">{Math.round((stats.connectedSystems / stats.totalIntegrations) * 100)}%</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.connectedSystems}</p>
          <p className="text-xs text-muted-foreground mt-1">Connected Systems</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <Database className="text-purple-600 dark:text-purple-500" size={20} />
            <span className="text-xs text-green-600 dark:text-green-500 font-semibold">+12K/day</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{(stats.totalRecords / 1000).toFixed(0)}K</p>
          <p className="text-xs text-muted-foreground mt-1">Records Synced Today</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-amber-600 dark:text-amber-500" size={20} />
            <span className="text-xs text-green-600 dark:text-green-500 font-semibold">Real-time</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{(stats.dataPointsPerDay / 1000).toFixed(0)}K</p>
          <p className="text-xs text-muted-foreground mt-1">Data Points/Day</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'erp', 'dcs', 'hr', 'quality', 'distribution'].map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category as typeof selectedCategory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-accent border border-border'
              }`}
            >
              {category === 'all' ? 'All Systems' :
               category === 'erp' ? 'ERP Systems' :
               category === 'dcs' ? 'Process Control' :
               category === 'hr' ? 'HR Systems' :
               category === 'quality' ? 'Quality Systems' :
               'Distribution'}
            </button>
          ))}
        </div>
      </div>

      {/* Active Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration) => {
          const Icon = getTypeIcon(integration.type)

          return (
            <div key={integration.id} className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.vendor}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(integration.status)}`}>
                  {integration.status === 'connected' && <CheckCircle size={12} />}
                  {integration.status === 'error' && <AlertCircle size={12} />}
                  {integration.status === 'pending' && <Clock size={12} />}
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

              {/* Data Flow Indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Data Flow:</span>
                <div className="flex items-center gap-1">
                  {integration.dataFlow === 'bidirectional' ? (
                    <>
                      <ArrowLeft size={14} className="text-primary" />
                      <ArrowRight size={14} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">Bidirectional</span>
                    </>
                  ) : integration.dataFlow === 'inbound' ? (
                    <>
                      <ArrowLeft size={14} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">Inbound</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight size={14} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">Outbound</span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Synced Data:</p>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-background text-xs rounded text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sync Status */}
              {integration.status === 'connected' && integration.lastSync && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        Last sync: {formatTime(integration.lastSync)}
                      </span>
                      <span className="text-muted-foreground">
                        {integration.recordsSync?.toLocaleString()} records
                      </span>
                    </div>
                    <button type="button" className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                      <RefreshCw size={12} />
                      Sync Now
                    </button>
                  </div>
                </div>
              )}

              {integration.status === 'error' && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-600 dark:text-red-400">Connection failed - Check credentials</span>
                    <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium">
                      Reconnect
                    </button>
                  </div>
                </div>
              )}

              {integration.status === 'pending' && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-600 dark:text-amber-400">Configuration in progress</span>
                    <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium">
                      Configure
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Real-time Data Flow */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Real-time Data Flow
        </h2>

        <div className="space-y-3">
          {dataFlows.map((flow, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-sm font-medium text-foreground">{flow.source}</div>
                <ArrowRight className="text-primary" size={16} />
                <div className="text-sm font-medium text-foreground">{flow.destination}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{flow.type}</span>
                <span className="font-medium text-foreground">{flow.volume.toLocaleString()} records</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
                  {flow.frequency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Architecture */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          Integration Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Source Systems */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Source Systems</h3>
            <div className="space-y-2">
              {['Oracle ERP Cloud', 'PlantPAx DCS', 'Workday HCM', 'LIMS Quality'].map((system, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-background rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">{system}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BrewMind Hub */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/50">
              <div className="text-center">
                <Database className="text-primary mx-auto mb-1" size={28} />
                <span className="text-sm font-bold text-primary">BrewMind</span>
                <p className="text-xs text-muted-foreground">Data Hub</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">Real-time data aggregation</p>
              <p className="text-xs text-muted-foreground">AI-powered analytics</p>
            </div>
          </div>

          {/* Destination Systems */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Destinations</h3>
            <div className="space-y-2">
              {['Barley AI Assistant', 'Power BI Dashboards', 'Executive Reports', 'Sapporo Global'].map((system, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-background rounded-lg">
                  <ArrowRight size={14} className="text-primary" />
                  <span className="text-sm text-foreground">{system}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Security */}
      <div className="bg-gradient-to-r from-primary/20 to-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-primary" size={24} />
          <h2 className="text-xl font-bold text-foreground">Integration Security & Compliance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              SOC 2 Type II
            </h3>
            <p className="text-sm text-muted-foreground">All integrations meet enterprise security standards with comprehensive audit trails.</p>
          </div>

          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lock size={18} className="text-primary" />
              End-to-End Encryption
            </h3>
            <p className="text-sm text-muted-foreground">TLS 1.3 encryption for all data in transit, AES-256 for data at rest.</p>
          </div>

          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              24/7 Monitoring
            </h3>
            <p className="text-sm text-muted-foreground">Real-time health monitoring with automated alerts and failover capabilities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
