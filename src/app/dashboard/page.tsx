'use client'

import { useState } from 'react'
import {
  TrendingUp, DollarSign, Users, FileText, Clock, AlertTriangle,
  Calendar, BarChart3, Activity, Zap, Target, Shield,
  ArrowUp, ArrowDown, Building2, Home, Droplets,
  Beer, Factory, Beaker, Truck, Gauge, AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

// Production volume data (last 12 months)
const productionData = [
  { month: 'Jan', volume: 42000 },
  { month: 'Feb', volume: 38500 },
  { month: 'Mar', volume: 45200 },
  { month: 'Apr', volume: 48000 },
  { month: 'May', volume: 52000 },
  { month: 'Jun', volume: 55000 },
  { month: 'Jul', volume: 58500 },
  { month: 'Aug', volume: 54000 },
  { month: 'Sep', volume: 49500 },
  { month: 'Oct', volume: 46000 },
  { month: 'Nov', volume: 44500 },
  { month: 'Dec', volume: 45000 },
]

// Quality metrics trend data
const qualityTrendData = [
  { month: 'Jan', passRate: 96.2, target: 95 },
  { month: 'Feb', passRate: 96.8, target: 95 },
  { month: 'Mar', passRate: 97.1, target: 95 },
  { month: 'Apr', passRate: 96.5, target: 95 },
  { month: 'May', passRate: 97.4, target: 95 },
  { month: 'Jun', passRate: 97.8, target: 95 },
  { month: 'Jul', passRate: 97.2, target: 95 },
  { month: 'Aug', passRate: 97.6, target: 95 },
  { month: 'Sep', passRate: 97.9, target: 95 },
  { month: 'Oct', passRate: 97.5, target: 95 },
  { month: 'Nov', passRate: 97.8, target: 95 },
  { month: 'Dec', passRate: 97.2, target: 95 },
]

// Beer style distribution data - Sleeman Blue palette
const beerStyleData = [
  { name: 'Original Draught', value: 28, color: '#1863DC' },
  { name: 'Honey Brown', value: 21, color: '#3B82F6' },
  { name: 'Cream Ale', value: 17, color: '#60A5FA' },
  { name: 'Sleeman Clear', value: 13, color: '#93C5FD' },
  { name: 'IPA', value: 10, color: '#1E40AF' },
  { name: 'Other', value: 11, color: '#1E3A8A' },
]

// Top products by revenue
const topProductsData = [
  { name: 'Original Draught', revenue: 4250000 },
  { name: 'Honey Brown Lager', revenue: 3180000 },
  { name: 'Cream Ale', revenue: 2890000 },
  { name: 'Sleeman Clear 2.0', revenue: 2450000 },
  { name: 'India Pale Ale', revenue: 1820000 },
]

export default function DashboardPage() {
  const [stats] = useState({
    totalProductionVolume: 578500,
    qualityPassRate: 97.2,
    equipmentUtilization: 87,
    revenueMTD: 2450000,
    activeProductionLines: 4,
    pendingQualityIssues: 3,
    activeBatches: 24,
    distributorCount: 18
  })

  const [recentActivity] = useState([
    { id: 1, type: 'batch_started', title: `New Batch Started - Honey Brown Lager #2024-1247`, time: '5 minutes ago', status: 'new' },
    { id: 2, type: 'quality_passed', title: `Quality Test Passed - Cream Ale Batch #2024-1189`, time: '1 hour ago', status: 'success' },
    { id: 3, type: 'fermentation_complete', title: `Fermentation Complete - Sleeman Clear #2024-1156`, time: '2 hours ago', status: 'info' },
    { id: 4, type: 'alert_triggered', title: `Temperature Alert - Fermenter Tank 3`, time: '3 hours ago', status: 'warning' },
    { id: 5, type: 'report_uploaded', title: 'Monthly LCBO Compliance Report Uploaded', time: '4 hours ago', status: 'info' }
  ])

  const scheduledBatches = [
    { id: 1, property: 'Sleeman Original Draught - Line 1', time: 'Today 2:00 PM', type: 'Primary Fermentation', status: 'confirmed' },
    { id: 2, property: 'Honey Brown Lager - Line 2', time: 'Today 3:30 PM', type: 'Quality Testing', status: 'confirmed' },
    { id: 3, property: 'Cream Ale - Line 3', time: 'Tomorrow 10:00 AM', type: 'Bottling', status: 'pending' },
    { id: 4, property: 'Sleeman Clear 2.0 - Line 1', time: 'Tomorrow 2:00 PM', type: 'Kegging', status: 'confirmed' }
  ]

  // 6 KPI cards as per requirements
  const kpiCards = [
    {
      title: 'Total Production Volume',
      value: `${(stats.totalProductionVolume / 1000).toFixed(1)}k HL`,
      change: '+12.5%',
      trend: 'up',
      icon: Factory,
      description: 'YTD Hectoliters'
    },
    {
      title: 'Quality Pass Rate',
      value: `${stats.qualityPassRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      description: 'All batches tested'
    },
    {
      title: 'Equipment Utilization',
      value: `${stats.equipmentUtilization}%`,
      change: '+5.3%',
      trend: 'up',
      icon: Gauge,
      description: 'Production capacity'
    },
    {
      title: 'Revenue MTD',
      value: `$${(stats.revenueMTD / 1000000).toFixed(2)}M`,
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      description: 'Month to date'
    },
    {
      title: 'Active Production Lines',
      value: stats.activeProductionLines.toString(),
      change: 'of 5 total',
      trend: 'neutral',
      icon: Activity,
      description: 'Currently running'
    },
    {
      title: 'Pending Quality Issues',
      value: stats.pendingQualityIssues.toString(),
      change: '-2 from last week',
      trend: 'down',
      icon: AlertCircle,
      description: 'Requires attention'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <PageHeader
        title="Sleeman BrewMind Dashboard"
        description="Welcome to BrewMind! Here's your brewery operations overview."
      />

      {/* Content wrapper with consistent horizontal padding matching PageHeader */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* KPI Cards - 6 cards in responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-5 hover:border-primary/50 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-background">
                <kpi.icon className="text-primary" size={20} />
              </div>
              {kpi.trend !== 'neutral' && (
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  kpi.title === 'Pending Quality Issues' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {kpi.change}
                </div>
              )}
              {kpi.trend === 'neutral' && (
                <span className="text-xs text-muted-foreground">{kpi.change}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{kpi.title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{kpi.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Production Volume Chart */}
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Production Volume (12 Months)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3C3426" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1812', border: '1px solid #2C2416', borderRadius: '8px' }}
                  labelStyle={{ color: '#1863DC' }}
                  formatter={(value: number) => [`${value.toLocaleString()} HL`, 'Volume']}
                />
                <Bar dataKey="volume" fill="#1863DC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Trend Chart */}
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quality Metrics Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3C3426" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={[94, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1812', border: '1px solid #2C2416', borderRadius: '8px' }}
                  labelStyle={{ color: '#1863DC' }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Line type="monotone" dataKey="passRate" stroke="#1863DC" strokeWidth={2} dot={{ fill: '#1863DC' }} name="Pass Rate" />
                <Line type="monotone" dataKey="target" stroke="#22C55E" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Beer Style Distribution */}
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Beer Style Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={beerStyleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={{ stroke: '#9CA3AF' }}
                >
                  {beerStyleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1812', border: '1px solid #2C2416', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products by Revenue */}
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Products by Revenue</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#3C3426" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value/1000000}M`} />
                <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={11} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1812', border: '1px solid #2C2416', borderRadius: '8px' }}
                  labelStyle={{ color: '#1863DC' }}
                  formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Scheduled Batches */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Scheduled Production</h2>
          <Link href="/dashboard/care-sessions" className="text-primary text-sm hover:text-primary/80 transition">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {scheduledBatches.map((batch) => (
            <div key={batch.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition bg-background hover:shadow-md">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-foreground leading-tight mb-1">{batch.property}</h3>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                    batch.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{batch.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs text-foreground/80 font-medium">{batch.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Recent Activity</h2>
          <Link href="/dashboard/activity" className="text-primary text-sm hover:text-primary/80 transition">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition">
              <div className={`p-2 rounded-lg ${
                activity.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/50' :
                activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/50' :
                activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                'bg-muted'
              }`}>
                {activity.type === 'batch_started' && <Beer className="text-blue-600 dark:text-blue-400" size={20} />}
                {activity.type === 'quality_passed' && <Target className="text-green-600 dark:text-green-400" size={20} />}
                {activity.type === 'fermentation_complete' && <Beaker className="text-muted-foreground" size={20} />}
                {activity.type === 'alert_triggered' && <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={20} />}
                {activity.type === 'report_uploaded' && <FileText className="text-muted-foreground" size={20} />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beer Styles & Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Beer Style Production (HL)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Beer, value: '845', label: 'Original Draught', color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
              { icon: Droplets, value: '623', label: 'Honey Brown', color: 'text-yellow-600 dark:text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
              { icon: Beer, value: '512', label: 'Cream Ale', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
              { icon: Droplets, value: '398', label: 'Sleeman Clear', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/30' },
              { icon: Beer, value: '287', label: 'India Pale Ale', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
              { icon: Beer, value: '234', label: 'Silver Creek', color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-200 dark:bg-stone-800/50' },
              { icon: Beaker, value: '156', label: 'Fine Porter', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
              { icon: Beer, value: '89', label: 'Seasonal', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col items-center p-3 ${item.bg} rounded-lg hover:opacity-80 transition`}>
                <item.icon className={`${item.color} w-6 h-6 mb-2`} />
                <span className="text-xl font-bold text-foreground">{item.value}</span>
                <span className="text-xs text-muted-foreground text-center mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Distribution Channels</h2>
          <div className="space-y-4">
            {[
              { icon: Building2, label: 'LCBO (Ontario)', value: 45, color: 'bg-purple-500' },
              { icon: Truck, label: 'BC Liquor Stores', value: 25, color: 'bg-cyan-500' },
              { icon: Home, label: 'Regional Distributors', value: 20, color: 'bg-green-500' },
              { icon: Beer, label: 'Brewery Direct', value: 10, color: 'bg-primary' },
            ].map((channel, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <channel.icon className="text-muted-foreground w-5 h-5" />
                    <span className="font-medium text-sm text-foreground/90">{channel.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{channel.value}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className={`${channel.color} h-2 rounded-full`} style={{ width: `${channel.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
