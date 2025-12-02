'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp, DollarSign, Users, FileText, Clock, AlertTriangle,
  Calendar, BarChart3, Activity, Zap, Target, Shield,
  ArrowUp, ArrowDown, Building2, Home, Droplets, Flame,
  CloudRain, Palette, Briefcase, Brain, Beer, Factory, Beaker, Truck
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeBatches: 24,
    monthlyProduction: 45000,
    qualityScore: 97.2,
    efficiencyRate: 94,
    avgFermentationDays: 14,
    distributorCount: 18
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'case_created', title: `New Batch Started - Honey Brown Lager #2024-1247`, time: '5 minutes ago', status: 'new' },
    { id: 2, type: 'care_plan_approved', title: `Quality Test Passed - Cream Ale Batch #2024-1189`, time: '1 hour ago', status: 'success' },
    { id: 3, type: 'assessment_complete', title: `Fermentation Complete - Sleeman Clear #2024-1156`, time: '2 hours ago', status: 'info' },
    { id: 4, type: 'alert_triggered', title: `Temperature Alert - Fermenter Tank 3`, time: '3 hours ago', status: 'warning' },
    { id: 5, type: 'document_uploaded', title: 'Monthly Compliance Report Uploaded', time: '4 hours ago', status: 'info' }
  ])

  const scheduledBatches = [
    { id: 1, property: 'Sleeman Original Draught - Line 1', time: 'Today 2:00 PM', type: 'Primary Fermentation', status: 'confirmed' },
    { id: 2, property: 'Honey Brown Lager - Line 2', time: 'Today 3:30 PM', type: 'Quality Testing', status: 'confirmed' },
    { id: 3, property: 'Cream Ale - Line 3', time: 'Tomorrow 10:00 AM', type: 'Bottling', status: 'pending' },
    { id: 4, property: 'Sleeman Clear 2.0 - Line 1', time: 'Tomorrow 2:00 PM', type: 'Kegging', status: 'confirmed' }
  ]

  const kpiCards = [
    {
      title: 'Active Batches',
      value: stats.activeBatches.toLocaleString(),
      change: '+8%',
      trend: 'up',
      icon: Beer,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      title: 'Monthly Production (HL)',
      value: stats.monthlyProduction.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Factory,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Quality Score',
      value: `${stats.qualityScore}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Efficiency Rate',
      value: `${stats.efficiencyRate}%`,
      change: '+5%',
      trend: 'up',
      icon: Zap,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <PageHeader
        title="Sleeman BrewMind Dashboard"
        description="Welcome to BrewMind! Here's your brewery operations overview."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {kpiCards.map((kpi, index) => (
          <div
            key={kpi.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 p-3 sm:p-6 hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{kpi.title}</p>
                <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">{kpi.value}</p>
                <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                  {kpi.trend === 'up' ? (
                    <ArrowUp className="text-green-500" size={14} />
                  ) : (
                    <ArrowDown className={kpi.title === 'Cost-per-Shipment' ? 'text-green-500' : 'text-red-500'} size={14} />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-500' :
                    kpi.title === 'Cost-per-Shipment' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg ${kpi.lightColor} mt-2 sm:mt-0`}>
                <kpi.icon className={kpi.textColor} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Batches */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Scheduled Production</h2>
          <Link href="/dashboard/care-sessions" className="text-arthur-blue text-sm hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {scheduledBatches.map((batch) => (
            <div key={batch.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-arthur-blue transition bg-white dark:bg-gray-800 hover:shadow-md">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-tight mb-1">{batch.property}</h3>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                    batch.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{batch.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{batch.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity - Full Width */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          <Link href="/dashboard/activity" className="text-arthur-blue text-sm hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <div className={`p-2 rounded-lg ${
                activity.status === 'new' ? 'bg-blue-100' :
                activity.status === 'success' ? 'bg-green-100' :
                activity.status === 'warning' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                {activity.type === 'case_created' && <Users className="text-arthur-blue" size={20} />}
                {activity.type === 'care_plan_approved' && <DollarSign className="text-green-600" size={20} />}
                {activity.type === 'assessment_complete' && <Shield className="text-gray-600 dark:text-gray-400" size={20} />}
                {activity.type === 'alert_triggered' && <AlertTriangle className="text-yellow-600" size={20} />}
                {activity.type === 'document_uploaded' && <FileText className="text-gray-600 dark:text-gray-400" size={20} />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beer Styles & Production */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Beer Style Production</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-gray-700 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-800 transition">
              <Beer className="text-amber-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">845</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Original Draught</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-800 transition">
              <Droplets className="text-yellow-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">623</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Honey Brown</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-gray-700 rounded-lg hover:bg-orange-100 dark:hover:bg-gray-800 transition">
              <Beer className="text-orange-500 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">512</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Cream Ale</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-sky-50 dark:bg-gray-700 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-800 transition">
              <Droplets className="text-sky-500 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">398</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Sleeman Clear</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-800 transition">
              <Beer className="text-red-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">287</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">India Pale Ale</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-stone-50 dark:bg-gray-700 rounded-lg hover:bg-stone-100 dark:hover:bg-gray-800 transition">
              <Beer className="text-stone-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">234</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Silver Creek</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-gray-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-gray-800 transition">
              <Beaker className="text-emerald-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">156</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Fine Porter</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition">
              <Beer className="text-purple-600 w-8 h-8 mb-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">89</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Seasonal</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Distribution Channels</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Building2 className="text-purple-500 w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">LCBO (Ontario)</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">45%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Truck className="text-cyan-500 w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">BC Liquor Stores</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Home className="text-green-500 w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">Regional Distributors</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">20%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Beer className="text-amber-500 w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">Brewery Direct</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">10%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}