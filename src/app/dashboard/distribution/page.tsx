'use client'

import { useState } from 'react'
import {
  Truck, Package, TrendingUp, Users, MapPin, DollarSign,
  Clock, CheckCircle, AlertTriangle, BarChart3, Warehouse,
  ArrowRight, Building2, RefreshCw, Eye, Download,
  ArrowUp
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface Distributor {
  id: string
  name: string
  region: string
  type: 'Retail' | 'Wholesale' | 'Restaurant' | 'Bar' | 'Export'
  totalOrders: number
  totalVolume: number
  revenue: number
  onTimeDeliveryRate: number
  lastOrderDate: Date
  status: 'active' | 'pending' | 'inactive'
}

interface Shipment {
  id: string
  trackingNumber: string
  distributor: string
  product: string
  volumeHL: number
  orderDate: Date
  shipDate: Date | null
  deliveryDate: Date | null
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned'
  revenue: number
}

interface RegionalData {
  region: string
  distributors: number
  volumeHL: number
  revenue: number
  growth: number
}

export default function DistributionPage() {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'ontario' | 'quebec' | 'western' | 'atlantic'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all')

  const distributors: Distributor[] = [
    {
      id: '1',
      name: 'LCBO Central Warehouse',
      region: 'Ontario',
      type: 'Retail',
      totalOrders: 487,
      totalVolume: 24350,
      revenue: 4870000,
      onTimeDeliveryRate: 97.8,
      lastOrderDate: new Date('2024-12-01'),
      status: 'active'
    },
    {
      id: '2',
      name: 'SAQ Distribution',
      region: 'Quebec',
      type: 'Retail',
      totalOrders: 312,
      totalVolume: 15600,
      revenue: 3120000,
      onTimeDeliveryRate: 96.5,
      lastOrderDate: new Date('2024-11-29'),
      status: 'active'
    },
    {
      id: '3',
      name: 'BC Liquor Distribution',
      region: 'British Columbia',
      type: 'Wholesale',
      totalOrders: 189,
      totalVolume: 9450,
      revenue: 1890000,
      onTimeDeliveryRate: 94.2,
      lastOrderDate: new Date('2024-11-28'),
      status: 'active'
    },
    {
      id: '4',
      name: 'Alberta Gaming Liquor',
      region: 'Alberta',
      type: 'Wholesale',
      totalOrders: 156,
      totalVolume: 7800,
      revenue: 1560000,
      onTimeDeliveryRate: 95.1,
      lastOrderDate: new Date('2024-11-30'),
      status: 'active'
    },
    {
      id: '5',
      name: 'Maritime Beverage Co.',
      region: 'Nova Scotia',
      type: 'Wholesale',
      totalOrders: 98,
      totalVolume: 4900,
      revenue: 980000,
      onTimeDeliveryRate: 93.8,
      lastOrderDate: new Date('2024-11-27'),
      status: 'active'
    },
    {
      id: '6',
      name: 'Golden Mile Restaurant Group',
      region: 'Ontario',
      type: 'Restaurant',
      totalOrders: 67,
      totalVolume: 1340,
      revenue: 335000,
      onTimeDeliveryRate: 98.5,
      lastOrderDate: new Date('2024-11-25'),
      status: 'active'
    },
    {
      id: '7',
      name: 'Prairie Pub Network',
      region: 'Manitoba',
      type: 'Bar',
      totalOrders: 45,
      totalVolume: 900,
      revenue: 225000,
      onTimeDeliveryRate: 91.2,
      lastOrderDate: new Date('2024-11-20'),
      status: 'active'
    },
    {
      id: '8',
      name: 'US Northeast Import Co.',
      region: 'Export',
      type: 'Export',
      totalOrders: 34,
      totalVolume: 3400,
      revenue: 850000,
      onTimeDeliveryRate: 89.5,
      lastOrderDate: new Date('2024-11-15'),
      status: 'pending'
    }
  ]

  const recentShipments: Shipment[] = [
    {
      id: 'SHP-2024-1847',
      trackingNumber: 'SLM2024001847',
      distributor: 'LCBO Central Warehouse',
      product: 'Sleeman Original Draught',
      volumeHL: 450,
      orderDate: new Date('2024-11-28'),
      shipDate: new Date('2024-11-30'),
      deliveryDate: new Date('2024-12-02'),
      status: 'delivered',
      revenue: 90000
    },
    {
      id: 'SHP-2024-1848',
      trackingNumber: 'SLM2024001848',
      distributor: 'SAQ Distribution',
      product: 'Sleeman Honey Brown',
      volumeHL: 320,
      orderDate: new Date('2024-11-29'),
      shipDate: new Date('2024-12-01'),
      deliveryDate: null,
      status: 'shipped',
      revenue: 64000
    },
    {
      id: 'SHP-2024-1849',
      trackingNumber: 'SLM2024001849',
      distributor: 'BC Liquor Distribution',
      product: 'Sleeman Clear 2.0',
      volumeHL: 280,
      orderDate: new Date('2024-11-30'),
      shipDate: null,
      deliveryDate: null,
      status: 'confirmed',
      revenue: 56000
    },
    {
      id: 'SHP-2024-1850',
      trackingNumber: 'SLM2024001850',
      distributor: 'Alberta Gaming Liquor',
      product: 'Sleeman Cream Ale',
      volumeHL: 200,
      orderDate: new Date('2024-12-01'),
      shipDate: null,
      deliveryDate: null,
      status: 'pending',
      revenue: 40000
    },
    {
      id: 'SHP-2024-1851',
      trackingNumber: 'SLM2024001851',
      distributor: 'Maritime Beverage Co.',
      product: 'Sleeman Original Draught',
      volumeHL: 150,
      orderDate: new Date('2024-12-01'),
      shipDate: null,
      deliveryDate: null,
      status: 'pending',
      revenue: 30000
    }
  ]

  const regionalData: RegionalData[] = [
    { region: 'Ontario', distributors: 8, volumeHL: 25690, revenue: 5205000, growth: 12.3 },
    { region: 'Quebec', distributors: 5, volumeHL: 15600, revenue: 3120000, growth: 8.7 },
    { region: 'Western Canada', distributors: 6, volumeHL: 18150, revenue: 3675000, growth: 15.2 },
    { region: 'Atlantic', distributors: 4, volumeHL: 4900, revenue: 980000, growth: 5.4 },
    { region: 'Export', distributors: 2, volumeHL: 3400, revenue: 850000, growth: 22.8 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-900/50 text-green-400'
      case 'shipped': return 'bg-blue-900/50 text-blue-400'
      case 'confirmed': return 'bg-purple-900/50 text-purple-400'
      case 'pending': return 'bg-yellow-900/50 text-yellow-400'
      case 'returned': return 'bg-red-900/50 text-red-400'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle
      case 'shipped': return Truck
      case 'confirmed': return Package
      case 'pending': return Clock
      case 'returned': return AlertTriangle
      default: return Package
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Retail': return 'bg-blue-900/50 text-blue-400'
      case 'Wholesale': return 'bg-green-900/50 text-green-400'
      case 'Restaurant': return 'bg-purple-900/50 text-purple-400'
      case 'Bar': return 'bg-amber-900/50 text-amber-400'
      case 'Export': return 'bg-indigo-900/50 text-indigo-400'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  // Calculate totals
  const totalVolume = distributors.reduce((acc, d) => acc + d.totalVolume, 0)
  const totalRevenue = distributors.reduce((acc, d) => acc + d.revenue, 0)
  const avgOnTimeDelivery = Math.round(distributors.reduce((acc, d) => acc + d.onTimeDeliveryRate, 0) / distributors.length * 10) / 10
  const activeDistributors = distributors.filter(d => d.status === 'active').length

  const pendingShipments = recentShipments.filter(s => s.status === 'pending').length
  const inTransitShipments = recentShipments.filter(s => s.status === 'shipped').length

  const filteredDistributors = distributors.filter(d => {
    if (selectedRegion === 'all') return true
    if (selectedRegion === 'ontario') return d.region === 'Ontario'
    if (selectedRegion === 'quebec') return d.region === 'Quebec'
    if (selectedRegion === 'western') return ['British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan'].includes(d.region)
    if (selectedRegion === 'atlantic') return ['Nova Scotia', 'New Brunswick', 'PEI', 'Newfoundland'].includes(d.region)
    return true
  })

  const filteredShipments = recentShipments.filter(s => {
    if (selectedStatus === 'all') return true
    return s.status === selectedStatus
  })

  // KPI Cards data with proper vertical hierarchy
  const kpiCards = [
    {
      title: 'Active Distributors',
      value: activeDistributors.toString(),
      change: '+2 this quarter',
      trend: 'up' as const,
      icon: Users,
      description: 'Partner network'
    },
    {
      title: 'Volume YTD',
      value: `${(totalVolume / 1000).toFixed(1)}k HL`,
      change: '+18.3%',
      trend: 'up' as const,
      icon: Package,
      description: 'Hectoliters shipped'
    },
    {
      title: 'Revenue YTD',
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      change: '+15.2%',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Total distribution'
    },
    {
      title: 'On-Time Delivery',
      value: `${avgOnTimeDelivery}%`,
      change: '+2.1% vs target',
      trend: 'up' as const,
      icon: Truck,
      description: 'Average rate'
    },
    {
      title: 'Pending Orders',
      value: pendingShipments.toString(),
      change: 'Awaiting shipment',
      trend: 'neutral' as const,
      icon: Clock,
      description: 'To be processed'
    },
    {
      title: 'In Transit',
      value: inTransitShipments.toString(),
      change: 'Active shipments',
      trend: 'neutral' as const,
      icon: RefreshCw,
      description: 'Currently shipping'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <PageHeader
        title="Distribution Management"
        description="Distributor network, shipments, and regional delivery analytics"
        action={
          <button className="h-12 px-6 bg-sleeman-gold text-sleeman-dark rounded-full hover:bg-sleeman-gold-light flex items-center justify-center gap-2 transition-colors font-semibold">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        }
      />

      {/* KPI Cards - Proper vertical layout with breathing room */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-4 sm:p-5 hover:border-sleeman-gold/50 transition"
          >
            {/* Icon + Trend Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-sleeman-dark">
                <kpi.icon className="text-sleeman-gold" size={20} />
              </div>
              {kpi.trend !== 'neutral' && (
                <div className="flex items-center gap-1 text-xs font-medium text-green-400">
                  <ArrowUp size={12} />
                </div>
              )}
            </div>

            {/* Title */}
            <p className="text-xs text-gray-400 mb-1 truncate" title={kpi.title}>{kpi.title}</p>

            {/* Primary Value - LARGEST */}
            <p className="text-2xl sm:text-3xl font-bold text-gray-100 whitespace-nowrap">{kpi.value}</p>

            {/* Change/Context */}
            <p className={`text-xs mt-1 ${kpi.trend === 'up' ? 'text-green-400' : 'text-gray-500'}`}>
              {kpi.change}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
          </div>
        ))}
      </div>

      {/* Regional Performance */}
      <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-sleeman-gold" />
          Regional Distribution Performance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {regionalData.map((region) => (
            <div
              key={region.region}
              className="p-4 bg-sleeman-dark border border-sleeman-brown rounded-lg hover:border-sleeman-gold/50 transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-gray-100 mb-4 text-base">{region.region}</h3>

              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Distributors</span>
                  <span className="text-lg font-bold text-gray-100">{region.distributors}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Volume</span>
                  <span className="text-lg font-bold text-gray-100">{(region.volumeHL / 1000).toFixed(1)}k HL</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Revenue</span>
                  <span className="text-lg font-bold text-gray-100">${(region.revenue / 1000000).toFixed(1)}M</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Growth</span>
                  <span className={`text-lg font-bold flex items-center gap-1 ${region.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {region.growth > 0 && <ArrowUp size={14} />}
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout - Distributors & Shipments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Top Distributors */}
        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-sleeman-dark flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              <Building2 size={20} className="text-sleeman-gold" />
              Top Distributors
            </h2>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as typeof selectedRegion)}
              aria-label="Filter by region"
              className="text-sm border border-sleeman-dark rounded-lg px-3 py-2 bg-sleeman-dark text-gray-100 focus:border-sleeman-gold focus:outline-none cursor-pointer"
            >
              <option value="all">All Regions</option>
              <option value="ontario">Ontario</option>
              <option value="quebec">Quebec</option>
              <option value="western">Western Canada</option>
              <option value="atlantic">Atlantic</option>
            </select>
          </div>

          <div className="divide-y divide-sleeman-dark max-h-[480px] overflow-y-auto">
            {filteredDistributors.slice(0, 6).map((distributor) => (
              <div key={distributor.id} className="p-4 hover:bg-sleeman-dark/50 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-100 truncate" title={distributor.name}>
                      {distributor.name}
                    </h3>
                    <p className="text-sm text-gray-400">{distributor.region}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTypeColor(distributor.type)}`}>
                    {distributor.type}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Orders</p>
                    <p className="text-sm font-bold text-gray-100">{distributor.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Volume</p>
                    <p className="text-sm font-bold text-gray-100">{(distributor.totalVolume / 1000).toFixed(1)}k HL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Revenue</p>
                    <p className="text-sm font-bold text-gray-100">${(distributor.revenue / 1000000).toFixed(2)}M</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-sleeman-dark">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">On-time:</span>
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${
                      distributor.onTimeDeliveryRate >= 95 ? 'text-green-400' :
                      distributor.onTimeDeliveryRate >= 90 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {distributor.onTimeDeliveryRate >= 95 && <ArrowUp size={10} />}
                      {distributor.onTimeDeliveryRate}%
                    </span>
                  </div>
                  <button className="text-sleeman-gold hover:text-sleeman-gold-light text-sm font-medium flex items-center gap-1 transition-colors">
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shipments */}
        <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-sleeman-dark flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              <Truck size={20} className="text-sleeman-gold" />
              Recent Shipments
            </h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              aria-label="Filter by shipment status"
              className="text-sm border border-sleeman-dark rounded-lg px-3 py-2 bg-sleeman-dark text-gray-100 focus:border-sleeman-gold focus:outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <div className="divide-y divide-sleeman-dark max-h-[480px] overflow-y-auto">
            {filteredShipments.map((shipment) => {
              const StatusIcon = getStatusIcon(shipment.status)

              return (
                <div key={shipment.id} className="p-4 hover:bg-sleeman-dark/50 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-100 truncate" title={shipment.product}>
                        {shipment.product}
                      </h3>
                      <p className="text-sm text-gray-400 truncate" title={shipment.distributor}>
                        {shipment.distributor}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap ${getStatusColor(shipment.status)}`}>
                      <StatusIcon size={12} />
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Volume</p>
                      <p className="text-sm font-bold text-gray-100">{shipment.volumeHL} HL</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Order Date</p>
                      <p className="text-sm font-bold text-gray-100">{shipment.orderDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Revenue</p>
                      <p className="text-sm font-bold text-gray-100">${(shipment.revenue / 1000).toFixed(0)}k</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-sleeman-dark">
                    <span className="text-xs text-gray-500 font-mono">
                      {shipment.trackingNumber}
                    </span>
                    <button className="text-sleeman-gold hover:text-sleeman-gold-light text-sm font-medium flex items-center gap-1 transition-colors">
                      <Eye size={14} />
                      Track
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Delivery Performance Summary */}
      <div className="bg-gradient-to-r from-sleeman-dark to-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={24} className="text-sleeman-gold" />
          <h2 className="text-xl font-bold text-gray-100">Delivery Performance Overview</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-sleeman-dark/50 backdrop-blur rounded-xl p-5 border border-sleeman-brown">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={18} className="text-green-400" />
              <h3 className="font-semibold text-gray-100">Delivered This Week</h3>
            </div>
            <p className="text-4xl font-bold text-gray-100">47</p>
            <p className="text-sm text-gray-400 mt-2">Shipments completed</p>
          </div>

          <div className="bg-sleeman-dark/50 backdrop-blur rounded-xl p-5 border border-sleeman-brown">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={18} className="text-blue-400" />
              <h3 className="font-semibold text-gray-100">In Transit</h3>
            </div>
            <p className="text-4xl font-bold text-gray-100">12</p>
            <p className="text-sm text-gray-400 mt-2">Active shipments</p>
          </div>

          <div className="bg-sleeman-dark/50 backdrop-blur rounded-xl p-5 border border-sleeman-brown">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-purple-400" />
              <h3 className="font-semibold text-gray-100">Avg Transit Time</h3>
            </div>
            <p className="text-4xl font-bold text-gray-100">2.4<span className="text-xl ml-1">days</span></p>
            <p className="text-sm text-gray-400 mt-2">Door to door</p>
          </div>

          <div className="bg-sleeman-dark/50 backdrop-blur rounded-xl p-5 border border-sleeman-brown">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-sleeman-gold" />
              <h3 className="font-semibold text-gray-100">Month vs Last</h3>
            </div>
            <p className="text-4xl font-bold text-green-400 flex items-center">
              <ArrowUp size={28} className="mr-1" />
              18.3%
            </p>
            <p className="text-sm text-gray-400 mt-2">Volume increase</p>
          </div>
        </div>
      </div>

      {/* Warehouse Inventory Status */}
      <div className="bg-sleeman-brown rounded-xl shadow-lg shadow-black/20 border border-sleeman-brown p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Warehouse size={20} className="text-sleeman-gold" />
          Warehouse Inventory for Distribution
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { product: 'Sleeman Original Draught', stock: 4500, allocated: 1200, unit: 'cases' },
            { product: 'Sleeman Honey Brown', stock: 3200, allocated: 800, unit: 'cases' },
            { product: 'Sleeman Clear 2.0', stock: 2800, allocated: 600, unit: 'cases' },
            { product: 'Sleeman Cream Ale', stock: 2100, allocated: 450, unit: 'cases' }
          ].map((item, idx) => {
            const availablePercent = Math.round(((item.stock - item.allocated) / item.stock) * 100)

            return (
              <div key={idx} className="p-4 bg-sleeman-dark border border-sleeman-brown rounded-xl hover:border-sleeman-gold/50 transition">
                <h3 className="font-semibold text-gray-100 mb-4 truncate" title={item.product}>
                  {item.product}
                </h3>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">In Stock</span>
                    <span className="text-lg font-bold text-gray-100">{item.stock.toLocaleString()} {item.unit}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Allocated</span>
                    <span className="text-lg font-bold text-yellow-400">{item.allocated.toLocaleString()} {item.unit}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Available</span>
                    <span className="text-lg font-bold text-green-400">{(item.stock - item.allocated).toLocaleString()} {item.unit}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sleeman-brown">
                  <div className="w-full bg-sleeman-brown rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-sleeman-gold h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${availablePercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {availablePercent}% available for orders
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
