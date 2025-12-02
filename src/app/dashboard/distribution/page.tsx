'use client'

import { useState } from 'react'
import {
  Truck, Package, TrendingUp, Users, MapPin, DollarSign,
  Clock, CheckCircle, AlertTriangle, BarChart3, Warehouse,
  Calendar, ArrowRight, Building2, RefreshCw, Eye, Download
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface Distributor {
  id: string
  name: string
  region: string
  type: 'Retail' | 'Wholesale' | 'Restaurant' | 'Bar' | 'Export'
  totalOrders: number
  totalVolume: number // in hectoliters
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
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'confirmed': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'returned': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
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
      case 'Retail': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Wholesale': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Restaurant': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'Bar': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'Export': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
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

  return (
    <div className="space-y-6">
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

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-sleeman-gold" size={20} />
            <span className="text-xs text-green-600 font-semibold">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeDistributors}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Distributors</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Package className="text-blue-600" size={20} />
            <span className="text-xs text-blue-600 font-semibold">Volume</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{(totalVolume / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total HL YTD</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${(totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Revenue YTD</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Truck className="text-purple-600" size={20} />
            <span className="text-xs text-purple-600 font-semibold">On-Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgOnTimeDelivery}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg Delivery Rate</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-yellow-600" size={20} />
            <span className="text-xs text-yellow-600 font-semibold">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingShipments}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending Orders</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <RefreshCw className="text-indigo-600" size={20} />
            <span className="text-xs text-indigo-600 font-semibold">In Transit</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{inTransitShipments}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shipments Active</p>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-sleeman-gold" />
          Regional Distribution Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {regionalData.map((region) => (
            <div
              key={region.region}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sleeman-gold transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{region.region}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Distributors</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{region.distributors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Volume</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{(region.volumeHL / 1000).toFixed(1)}k HL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Revenue</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">${(region.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Growth</span>
                  <span className={`font-medium ${region.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Distributors */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Building2 size={20} className="text-sleeman-gold" />
              Top Distributors
            </h2>
            <div className="flex gap-2">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as typeof selectedRegion)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Regions</option>
                <option value="ontario">Ontario</option>
                <option value="quebec">Quebec</option>
                <option value="western">Western Canada</option>
                <option value="atlantic">Atlantic</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
            {filteredDistributors.slice(0, 6).map((distributor) => (
              <div key={distributor.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{distributor.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{distributor.region}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(distributor.type)}`}>
                    {distributor.type}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{distributor.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{(distributor.totalVolume / 1000).toFixed(1)}k HL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">${(distributor.revenue / 1000000).toFixed(2)}M</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">On-time:</span>
                    <span className={`text-xs font-semibold ${
                      distributor.onTimeDeliveryRate >= 95 ? 'text-green-600' :
                      distributor.onTimeDeliveryRate >= 90 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {distributor.onTimeDeliveryRate}%
                    </span>
                  </div>
                  <button className="text-sleeman-gold hover:text-sleeman-gold-light text-sm font-medium flex items-center gap-1">
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shipments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Truck size={20} className="text-sleeman-gold" />
              Recent Shipments
            </h2>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shipped">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
            {filteredShipments.map((shipment) => {
              const StatusIcon = getStatusIcon(shipment.status)

              return (
                <div key={shipment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{shipment.product}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{shipment.distributor}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(shipment.status)}`}>
                      <StatusIcon size={12} />
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{shipment.volumeHL} HL</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Order Date</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{shipment.orderDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">${(shipment.revenue / 1000).toFixed(0)}k</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {shipment.trackingNumber}
                    </span>
                    <button className="text-sleeman-gold hover:text-sleeman-gold-light text-sm font-medium flex items-center gap-1">
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
      <div className="bg-gradient-to-r from-sleeman-dark to-sleeman-brown rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={24} className="text-sleeman-gold" />
          <h2 className="text-xl font-bold">Delivery Performance Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <CheckCircle size={16} />
              Delivered This Week
            </h3>
            <p className="text-3xl font-bold">47</p>
            <p className="text-sm opacity-90 mt-1">Shipments completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <Truck size={16} />
              In Transit
            </h3>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm opacity-90 mt-1">Active shipments</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <Clock size={16} />
              Avg Transit Time
            </h3>
            <p className="text-3xl font-bold">2.4 days</p>
            <p className="text-sm opacity-90 mt-1">Door to door</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <TrendingUp size={16} />
              Month vs Last
            </h3>
            <p className="text-3xl font-bold text-green-400">+18.3%</p>
            <p className="text-sm opacity-90 mt-1">Volume increase</p>
          </div>
        </div>
      </div>

      {/* Warehouse Inventory Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Warehouse size={20} className="text-sleeman-gold" />
          Warehouse Inventory for Distribution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { product: 'Sleeman Original Draught', stock: 4500, allocated: 1200, unit: 'cases' },
            { product: 'Sleeman Honey Brown', stock: 3200, allocated: 800, unit: 'cases' },
            { product: 'Sleeman Clear 2.0', stock: 2800, allocated: 600, unit: 'cases' },
            { product: 'Sleeman Cream Ale', stock: 2100, allocated: 450, unit: 'cases' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">{item.product}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">In Stock</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{item.stock.toLocaleString()} {item.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Allocated</span>
                  <span className="font-semibold text-yellow-600">{item.allocated.toLocaleString()} {item.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Available</span>
                  <span className="font-semibold text-green-600">{(item.stock - item.allocated).toLocaleString()} {item.unit}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-sleeman-gold h-2 rounded-full"
                    style={{ width: `${((item.stock - item.allocated) / item.stock) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round(((item.stock - item.allocated) / item.stock) * 100)}% available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
