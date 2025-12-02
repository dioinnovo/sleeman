'use client'

import { useState } from 'react'
import {
  FileText, Download, Calendar, BarChart3, TrendingUp,
  Beaker, Truck, Factory, DollarSign, CheckCircle,
  Clock, Filter, Search, FileSpreadsheet, FilePieChart
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface Report {
  id: string
  name: string
  category: 'production' | 'quality' | 'distribution' | 'financial'
  description: string
  lastGenerated: Date
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  status: 'ready' | 'generating' | 'scheduled'
  format: 'pdf' | 'excel' | 'both'
}

interface ScheduledReport {
  id: string
  name: string
  nextRun: Date
  recipients: string[]
  format: 'pdf' | 'excel'
}

export default function BreweryReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'production' | 'quality' | 'distribution' | 'financial'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const reports: Report[] = [
    // Production Reports
    {
      id: 'prod-1',
      name: 'Monthly Production Summary',
      category: 'production',
      description: 'Total production volume by beer style, line efficiency, and batch completion rates',
      lastGenerated: new Date(),
      frequency: 'monthly',
      status: 'ready',
      format: 'both'
    },
    {
      id: 'prod-2',
      name: 'Production Line Efficiency',
      category: 'production',
      description: 'Efficiency metrics for Guelph and Vernon facilities, downtime analysis, and OEE scores',
      lastGenerated: new Date(),
      frequency: 'weekly',
      status: 'ready',
      format: 'excel'
    },
    {
      id: 'prod-3',
      name: 'Beer Style Performance',
      category: 'production',
      description: 'Production volume, yield rates, and batch success by beer style (Honey Brown, Clear, etc.)',
      lastGenerated: new Date(Date.now() - 86400000),
      frequency: 'monthly',
      status: 'ready',
      format: 'pdf'
    },
    {
      id: 'prod-4',
      name: 'Raw Materials Consumption',
      category: 'production',
      description: 'Malt, hops, yeast, and water usage tracking with variance analysis',
      lastGenerated: new Date(),
      frequency: 'weekly',
      status: 'ready',
      format: 'excel'
    },
    // Quality Reports
    {
      id: 'qual-1',
      name: 'Quality Control Dashboard',
      category: 'quality',
      description: 'Test pass rates, defect trends, and quality issue resolution metrics',
      lastGenerated: new Date(),
      frequency: 'daily',
      status: 'ready',
      format: 'pdf'
    },
    {
      id: 'qual-2',
      name: 'HACCP Compliance Report',
      category: 'quality',
      description: 'Critical control point monitoring, corrective actions, and audit readiness',
      lastGenerated: new Date(Date.now() - 172800000),
      frequency: 'monthly',
      status: 'ready',
      format: 'pdf'
    },
    {
      id: 'qual-3',
      name: 'Laboratory Analysis Summary',
      category: 'quality',
      description: 'Alcohol content, pH, gravity, color, and bitterness test results by batch',
      lastGenerated: new Date(),
      frequency: 'weekly',
      status: 'generating',
      format: 'excel'
    },
    {
      id: 'qual-4',
      name: 'LCBO Regulatory Compliance',
      category: 'quality',
      description: 'Labeling compliance, alcohol verification, and regulatory submission status',
      lastGenerated: new Date(Date.now() - 604800000),
      frequency: 'quarterly',
      status: 'ready',
      format: 'pdf'
    },
    // Distribution Reports
    {
      id: 'dist-1',
      name: 'Distribution Performance',
      category: 'distribution',
      description: 'Shipment volumes, on-time delivery rates, and distributor performance rankings',
      lastGenerated: new Date(),
      frequency: 'weekly',
      status: 'ready',
      format: 'both'
    },
    {
      id: 'dist-2',
      name: 'Regional Sales Analysis',
      category: 'distribution',
      description: 'Sales breakdown by Ontario, Quebec, Western Canada, Atlantic, and Export markets',
      lastGenerated: new Date(),
      frequency: 'monthly',
      status: 'ready',
      format: 'excel'
    },
    {
      id: 'dist-3',
      name: 'Inventory Status Report',
      category: 'distribution',
      description: 'Warehouse stock levels, reorder alerts, and product availability by location',
      lastGenerated: new Date(),
      frequency: 'daily',
      status: 'ready',
      format: 'excel'
    },
    // Financial Reports
    {
      id: 'fin-1',
      name: 'Revenue by Product',
      category: 'financial',
      description: 'Monthly revenue breakdown by beer style and SKU with year-over-year comparison',
      lastGenerated: new Date(),
      frequency: 'monthly',
      status: 'ready',
      format: 'both'
    },
    {
      id: 'fin-2',
      name: 'Cost per Hectoliter Analysis',
      category: 'financial',
      description: 'Production cost breakdown including materials, labor, and overhead per hectoliter',
      lastGenerated: new Date(Date.now() - 259200000),
      frequency: 'monthly',
      status: 'scheduled',
      format: 'excel'
    },
    {
      id: 'fin-3',
      name: 'Supplier Cost Report',
      category: 'financial',
      description: 'Material costs by supplier, price trends, and contract renewal analysis',
      lastGenerated: new Date(Date.now() - 604800000),
      frequency: 'quarterly',
      status: 'ready',
      format: 'pdf'
    }
  ]

  const scheduledReports: ScheduledReport[] = [
    {
      id: 'sched-1',
      name: 'Weekly Production Summary',
      nextRun: new Date(Date.now() + 172800000),
      recipients: ['jennifer@sleeman.ca', 'operations@sleeman.ca'],
      format: 'pdf'
    },
    {
      id: 'sched-2',
      name: 'Monthly Quality Dashboard',
      nextRun: new Date(Date.now() + 604800000),
      recipients: ['quality@sleeman.ca', 'brian@sleeman.ca'],
      format: 'pdf'
    },
    {
      id: 'sched-3',
      name: 'Executive Revenue Summary',
      nextRun: new Date(Date.now() + 2592000000),
      recipients: ['executive@sleeman.ca'],
      format: 'excel'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'production': return Factory
      case 'quality': return Beaker
      case 'distribution': return Truck
      case 'financial': return DollarSign
      default: return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'production': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'quality': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'distribution': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'financial': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle size={12} />
            Ready
          </span>
        )
      case 'generating':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <Clock size={12} className="animate-spin" />
            Generating
          </span>
        )
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <Calendar size={12} />
            Scheduled
          </span>
        )
      default:
        return null
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = {
    totalReports: reports.length,
    readyToDownload: reports.filter(r => r.status === 'ready').length,
    generatingNow: reports.filter(r => r.status === 'generating').length,
    scheduledDeliveries: scheduledReports.length
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 bg-sleeman-dark min-h-screen p-6">
      <PageHeader
        title="Brewery Reports"
        description="Production, quality, distribution, and financial analytics"
        action={
          <button className="h-12 px-6 bg-sleeman-gold text-sleeman-dark rounded-full hover:bg-sleeman-gold-light flex items-center justify-center gap-2 transition-colors font-semibold">
            <Calendar size={20} />
            <span>Schedule Report</span>
          </button>
        }
      />

      {/* Report Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-sleeman-gold" size={20} />
            <span className="text-xs text-sleeman-gold font-semibold">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stats.totalReports}</p>
          <p className="text-xs text-gray-400 mt-1">Available Reports</p>
        </div>

        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-xs text-green-500 font-semibold">Ready</span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stats.readyToDownload}</p>
          <p className="text-xs text-gray-400 mt-1">Ready to Download</p>
        </div>

        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-blue-500" size={20} />
            <span className="text-xs text-blue-500 font-semibold">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stats.generatingNow}</p>
          <p className="text-xs text-gray-400 mt-1">Generating Now</p>
        </div>

        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-amber-500" size={20} />
            <span className="text-xs text-amber-500 font-semibold">Scheduled</span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stats.scheduledDeliveries}</p>
          <p className="text-xs text-gray-400 mt-1">Scheduled Deliveries</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-sleeman-dark border border-sleeman-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-sleeman-gold/50 text-gray-100 placeholder-gray-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'production', 'quality', 'distribution', 'financial'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as typeof selectedCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-sleeman-gold text-sleeman-dark'
                    : 'bg-sleeman-dark text-gray-300 hover:bg-sleeman-dark/80 border border-sleeman-brown'
                }`}
              >
                {category === 'all' ? 'All Reports' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredReports.map((report) => {
          const CategoryIcon = getCategoryIcon(report.category)

          return (
            <div key={report.id} className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(report.category)}`}>
                    <CategoryIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">{report.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">{report.category} Report</p>
                  </div>
                </div>
                {getStatusBadge(report.status)}
              </div>

              <p className="text-sm text-gray-400 mb-4">{report.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Last generated: {formatDate(report.lastGenerated)}
                </span>
                <span className="capitalize px-2 py-1 bg-sleeman-dark rounded">
                  {report.frequency}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-sleeman-dark">
                <div className="flex items-center gap-2">
                  {(report.format === 'pdf' || report.format === 'both') && (
                    <button
                      className="flex items-center gap-1 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
                      disabled={report.status !== 'ready'}
                    >
                      <FilePieChart size={14} />
                      PDF
                    </button>
                  )}
                  {(report.format === 'excel' || report.format === 'both') && (
                    <button
                      className="flex items-center gap-1 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm"
                      disabled={report.status !== 'ready'}
                    >
                      <FileSpreadsheet size={14} />
                      Excel
                    </button>
                  )}
                </div>
                <button
                  className="flex items-center gap-1 px-3 py-2 bg-sleeman-gold/20 text-sleeman-gold rounded-lg hover:bg-sleeman-gold/30 transition-colors text-sm font-medium"
                  disabled={report.status !== 'ready'}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown overflow-hidden">
        <div className="px-6 py-4 border-b border-sleeman-dark">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <Calendar className="text-sleeman-gold" size={20} />
            Scheduled Report Deliveries
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sleeman-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Next Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sleeman-dark">
              {scheduledReports.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-sleeman-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-100">{schedule.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300">{formatDate(schedule.nextRun)}</p>
                    <p className="text-xs text-gray-500">{formatTime(schedule.nextRun)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {schedule.recipients.map((email, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-sleeman-dark rounded text-gray-400">
                          {email}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      schedule.format === 'pdf'
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-green-600/20 text-green-400'
                    }`}>
                      {schedule.format === 'pdf' ? <FilePieChart size={12} /> : <FileSpreadsheet size={12} />}
                      {schedule.format.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sleeman-gold hover:text-sleeman-gold-light text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Report Generation */}
      <div className="bg-gradient-to-r from-sleeman-gold/20 to-sleeman-brown rounded-xl shadow-lg shadow-black/20 p-6 border border-sleeman-gold/30">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-sleeman-gold" size={24} />
          <h2 className="text-xl font-bold text-gray-100">Quick Report Generation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sleeman-dark/50 backdrop-blur rounded-lg p-4 border border-sleeman-brown">
            <h3 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
              <BarChart3 size={18} className="text-sleeman-gold" />
              Executive Summary
            </h3>
            <p className="text-sm text-gray-400 mb-3">Generate a comprehensive overview of brewery operations for leadership review.</p>
            <button className="w-full py-2 bg-sleeman-gold text-sleeman-dark rounded-lg font-semibold hover:bg-sleeman-gold-light transition-colors">
              Generate Now
            </button>
          </div>

          <div className="bg-sleeman-dark/50 backdrop-blur rounded-lg p-4 border border-sleeman-brown">
            <h3 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
              <Beaker size={18} className="text-sleeman-gold" />
              Quality Audit Package
            </h3>
            <p className="text-sm text-gray-400 mb-3">Compile all quality documentation for regulatory compliance audits.</p>
            <button className="w-full py-2 bg-sleeman-gold text-sleeman-dark rounded-lg font-semibold hover:bg-sleeman-gold-light transition-colors">
              Generate Now
            </button>
          </div>

          <div className="bg-sleeman-dark/50 backdrop-blur rounded-lg p-4 border border-sleeman-brown">
            <h3 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
              <DollarSign size={18} className="text-sleeman-gold" />
              Monthly Performance
            </h3>
            <p className="text-sm text-gray-400 mb-3">Full month-end report with production, quality, and financial metrics.</p>
            <button className="w-full py-2 bg-sleeman-gold text-sleeman-dark rounded-lg font-semibold hover:bg-sleeman-gold-light transition-colors">
              Generate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
