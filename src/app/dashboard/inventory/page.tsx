'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import {
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Boxes,
  Warehouse,
  Clock,
  DollarSign,
  Filter,
  Search,
  ArrowUpDown,
  BarChart3,
  RefreshCw
} from 'lucide-react'

// Types
interface RawMaterial {
  id: string
  name: string
  category: 'Malt' | 'Hops' | 'Yeast' | 'Adjuncts' | 'Packaging' | 'Chemicals'
  currentStock: number
  unit: string
  reorderLevel: number
  maxLevel: number
  location: 'Guelph' | 'Vernon' | 'Both'
  supplier: string
  lastReceived: Date
  unitCost: number
  status: 'adequate' | 'low' | 'critical' | 'overstocked'
}

interface InventoryMovement {
  id: string
  materialName: string
  type: 'received' | 'used' | 'adjusted' | 'transferred'
  quantity: number
  date: Date
  reference: string
  user: string
}

interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  materialName: string
  quantity: number
  unit: string
  status: 'pending' | 'approved' | 'shipped' | 'received'
  expectedDate: Date
  totalCost: number
}

// Mock data
const rawMaterials: RawMaterial[] = [
  {
    id: '1',
    name: '2-Row Pale Malt',
    category: 'Malt',
    currentStock: 45000,
    unit: 'kg',
    reorderLevel: 20000,
    maxLevel: 80000,
    location: 'Guelph',
    supplier: 'Canada Malting Co.',
    lastReceived: new Date('2024-11-25'),
    unitCost: 0.85,
    status: 'adequate'
  },
  {
    id: '2',
    name: 'Cascade Hops',
    category: 'Hops',
    currentStock: 850,
    unit: 'kg',
    reorderLevel: 1000,
    maxLevel: 3000,
    location: 'Both',
    supplier: 'BC Hop Farms',
    lastReceived: new Date('2024-11-20'),
    unitCost: 28.50,
    status: 'low'
  },
  {
    id: '3',
    name: 'Safale US-05 Yeast',
    category: 'Yeast',
    currentStock: 150,
    unit: 'packs',
    reorderLevel: 100,
    maxLevel: 500,
    location: 'Guelph',
    supplier: 'Fermentis',
    lastReceived: new Date('2024-11-28'),
    unitCost: 45.00,
    status: 'adequate'
  },
  {
    id: '4',
    name: 'Honey',
    category: 'Adjuncts',
    currentStock: 2500,
    unit: 'kg',
    reorderLevel: 1500,
    maxLevel: 5000,
    location: 'Guelph',
    supplier: 'Ontario Honey Producers',
    lastReceived: new Date('2024-11-15'),
    unitCost: 12.00,
    status: 'adequate'
  },
  {
    id: '5',
    name: '330ml Brown Bottles',
    category: 'Packaging',
    currentStock: 45000,
    unit: 'units',
    reorderLevel: 100000,
    maxLevel: 500000,
    location: 'Both',
    supplier: 'Ardagh Group',
    lastReceived: new Date('2024-11-10'),
    unitCost: 0.18,
    status: 'critical'
  },
  {
    id: '6',
    name: 'Munich Malt',
    category: 'Malt',
    currentStock: 28000,
    unit: 'kg',
    reorderLevel: 15000,
    maxLevel: 50000,
    location: 'Vernon',
    supplier: 'Canada Malting Co.',
    lastReceived: new Date('2024-11-22'),
    unitCost: 0.95,
    status: 'adequate'
  },
  {
    id: '7',
    name: 'CO2 (Food Grade)',
    category: 'Chemicals',
    currentStock: 4200,
    unit: 'kg',
    reorderLevel: 2000,
    maxLevel: 8000,
    location: 'Both',
    supplier: 'Linde Canada',
    lastReceived: new Date('2024-11-26'),
    unitCost: 1.25,
    status: 'adequate'
  },
  {
    id: '8',
    name: 'Centennial Hops',
    category: 'Hops',
    currentStock: 320,
    unit: 'kg',
    reorderLevel: 500,
    maxLevel: 2000,
    location: 'Vernon',
    supplier: 'BC Hop Farms',
    lastReceived: new Date('2024-11-18'),
    unitCost: 32.00,
    status: 'critical'
  },
  {
    id: '9',
    name: '650ml Bottles',
    category: 'Packaging',
    currentStock: 185000,
    unit: 'units',
    reorderLevel: 80000,
    maxLevel: 300000,
    location: 'Guelph',
    supplier: 'Ardagh Group',
    lastReceived: new Date('2024-11-24'),
    unitCost: 0.22,
    status: 'overstocked'
  },
  {
    id: '10',
    name: 'Caramel Malt 60L',
    category: 'Malt',
    currentStock: 8500,
    unit: 'kg',
    reorderLevel: 5000,
    maxLevel: 20000,
    location: 'Both',
    supplier: 'Briess Malt',
    lastReceived: new Date('2024-11-21'),
    unitCost: 1.10,
    status: 'adequate'
  }
]

const inventoryMovements: InventoryMovement[] = [
  {
    id: '1',
    materialName: '2-Row Pale Malt',
    type: 'used',
    quantity: 2500,
    date: new Date('2024-12-02T08:30:00'),
    reference: 'BATCH-2024-487',
    user: 'M. Brewmaster'
  },
  {
    id: '2',
    materialName: 'Cascade Hops',
    type: 'received',
    quantity: 200,
    date: new Date('2024-12-01T14:15:00'),
    reference: 'PO-2024-1892',
    user: 'J. Receiving'
  },
  {
    id: '3',
    materialName: 'CO2 (Food Grade)',
    type: 'transferred',
    quantity: 500,
    date: new Date('2024-12-01T10:00:00'),
    reference: 'TRANS-GV-045',
    user: 'K. Logistics'
  },
  {
    id: '4',
    materialName: '330ml Brown Bottles',
    type: 'used',
    quantity: 15000,
    date: new Date('2024-11-30T16:45:00'),
    reference: 'PACK-2024-892',
    user: 'L. Packaging'
  },
  {
    id: '5',
    materialName: 'Honey',
    type: 'adjusted',
    quantity: -50,
    date: new Date('2024-11-30T11:30:00'),
    reference: 'ADJ-2024-023',
    user: 'S. QC Lead'
  }
]

const purchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-1905',
    supplier: 'Ardagh Group',
    materialName: '330ml Brown Bottles',
    quantity: 200000,
    unit: 'units',
    status: 'shipped',
    expectedDate: new Date('2024-12-05'),
    totalCost: 36000
  },
  {
    id: '2',
    poNumber: 'PO-2024-1908',
    supplier: 'BC Hop Farms',
    materialName: 'Centennial Hops',
    quantity: 500,
    unit: 'kg',
    status: 'approved',
    expectedDate: new Date('2024-12-08'),
    totalCost: 16000
  },
  {
    id: '3',
    poNumber: 'PO-2024-1910',
    supplier: 'BC Hop Farms',
    materialName: 'Cascade Hops',
    quantity: 400,
    unit: 'kg',
    status: 'pending',
    expectedDate: new Date('2024-12-10'),
    totalCost: 11400
  },
  {
    id: '4',
    poNumber: 'PO-2024-1901',
    supplier: 'Canada Malting Co.',
    materialName: '2-Row Pale Malt',
    quantity: 30000,
    unit: 'kg',
    status: 'received',
    expectedDate: new Date('2024-11-28'),
    totalCost: 25500
  }
]

// Helper functions
const getStatusColor = (status: RawMaterial['status']) => {
  switch (status) {
    case 'adequate':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'low':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'overstocked':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }
}

const getMovementTypeColor = (type: InventoryMovement['type']) => {
  switch (type) {
    case 'received':
      return 'bg-green-500/20 text-green-400'
    case 'used':
      return 'bg-amber-500/20 text-amber-400'
    case 'adjusted':
      return 'bg-purple-500/20 text-purple-400'
    case 'transferred':
      return 'bg-blue-500/20 text-blue-400'
  }
}

const getPOStatusColor = (status: PurchaseOrder['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-500/20 text-amber-400'
    case 'approved':
      return 'bg-blue-500/20 text-blue-400'
    case 'shipped':
      return 'bg-purple-500/20 text-purple-400'
    case 'received':
      return 'bg-green-500/20 text-green-400'
  }
}

const getStockPercentage = (current: number, max: number) => {
  return Math.round((current / max) * 100)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0
  }).format(value)
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-CA').format(value)
}

export default function InventoryPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate KPIs
  const totalMaterials = rawMaterials.length
  const lowStockItems = rawMaterials.filter(m => m.status === 'low' || m.status === 'critical').length
  const criticalItems = rawMaterials.filter(m => m.status === 'critical').length
  const totalInventoryValue = rawMaterials.reduce((sum, m) => sum + (m.currentStock * m.unitCost), 0)
  const pendingOrders = purchaseOrders.filter(po => po.status !== 'received').length
  const inTransitValue = purchaseOrders.filter(po => po.status === 'shipped').reduce((sum, po) => sum + po.totalCost, 0)

  // Filter materials
  const filteredMaterials = rawMaterials.filter(material => {
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter
    const matchesLocation = locationFilter === 'all' || material.location === locationFilter || material.location === 'Both'
    const matchesStatus = statusFilter === 'all' || material.status === statusFilter
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLocation && matchesStatus && matchesSearch
  })

  const categories = ['Malt', 'Hops', 'Yeast', 'Adjuncts', 'Packaging', 'Chemicals']

  return (
    <div className="min-h-screen bg-sleeman-dark">
      <PageHeader
        title="Inventory Management"
        description="Track raw materials, supplies, and purchase orders across facilities"
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Total Materials</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalMaterials}</div>
            <div className="text-xs text-gray-500 mt-1">Active SKUs</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-gray-400">Low Stock</span>
            </div>
            <div className="text-2xl font-bold text-amber-400">{lowStockItems}</div>
            <div className="text-xs text-gray-500 mt-1">Below reorder level</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              <span className="text-xs text-gray-400">Critical</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{criticalItems}</div>
            <div className="text-xs text-gray-500 mt-1">Urgent restock needed</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Inventory Value</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalInventoryValue)}</div>
            <div className="text-xs text-gray-500 mt-1">Current stock value</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Pending Orders</span>
            </div>
            <div className="text-2xl font-bold text-white">{pendingOrders}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting delivery</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-gray-400">In Transit</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{formatCurrency(inTransitValue)}</div>
            <div className="text-xs text-gray-500 mt-1">Shipped orders value</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sleeman-gold/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
            >
              <option value="all">All Locations</option>
              <option value="Guelph">Guelph</option>
              <option value="Vernon">Vernon</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
            >
              <option value="all">All Status</option>
              <option value="adequate">Adequate</option>
              <option value="low">Low Stock</option>
              <option value="critical">Critical</option>
              <option value="overstocked">Overstocked</option>
            </select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Table - 2 columns */}
          <div className="lg:col-span-2 bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
            <div className="p-4 border-b border-sleeman-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Boxes className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Raw Materials Inventory</h2>
              </div>
              <span className="text-sm text-gray-400">{filteredMaterials.length} items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-sleeman-gold/10">
                    <th className="p-3">Material</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Stock Level</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="border-b border-sleeman-gold/10 hover:bg-sleeman-gold/5">
                      <td className="p-3">
                        <div className="font-medium text-white">{material.name}</div>
                        <div className="text-xs text-gray-500">{material.supplier}</div>
                      </td>
                      <td className="p-3 text-sm text-gray-300">{material.category}</td>
                      <td className="p-3">
                        <div className="text-sm text-white">
                          {formatNumber(material.currentStock)} {material.unit}
                        </div>
                        <div className="w-full bg-sleeman-dark rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              material.status === 'critical' ? 'bg-red-500' :
                              material.status === 'low' ? 'bg-amber-500' :
                              material.status === 'overstocked' ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(getStockPercentage(material.currentStock, material.maxLevel), 100)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Reorder: {formatNumber(material.reorderLevel)} {material.unit}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-300">{material.location}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(material.status)}`}>
                          {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-white">
                        {formatCurrency(material.currentStock * material.unitCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Movements */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Recent Movements</h2>
              </div>
              <div className="p-4 space-y-3">
                {inventoryMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start gap-3 p-3 bg-sleeman-dark/50 rounded-lg">
                    <div className={`px-2 py-1 rounded text-xs ${getMovementTypeColor(movement.type)}`}>
                      {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{movement.materialName}</div>
                      <div className="text-xs text-gray-500">
                        {movement.type === 'adjusted' && movement.quantity < 0 ? '' : movement.type === 'used' ? '-' : '+'}
                        {formatNumber(Math.abs(movement.quantity))} • {movement.reference}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {movement.date.toLocaleDateString('en-CA')} • {movement.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Orders */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Purchase Orders</h2>
              </div>
              <div className="p-4 space-y-3">
                {purchaseOrders.map((po) => (
                  <div key={po.id} className="p-3 bg-sleeman-dark/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{po.poNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${getPOStatusColor(po.status)}`}>
                        {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">{po.materialName}</div>
                    <div className="text-xs text-gray-500">
                      {formatNumber(po.quantity)} {po.unit} from {po.supplier}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-500">
                        Expected: {po.expectedDate.toLocaleDateString('en-CA')}
                      </span>
                      <span className="text-sleeman-gold">{formatCurrency(po.totalCost)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Summary */}
        <div className="bg-gradient-to-r from-sleeman-brown/80 to-sleeman-dark border border-sleeman-gold/20 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-sleeman-gold" />
            <h2 className="text-lg font-semibold text-white">Inventory by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              const categoryMaterials = rawMaterials.filter(m => m.category === category)
              const categoryValue = categoryMaterials.reduce((sum, m) => sum + (m.currentStock * m.unitCost), 0)
              const hasIssues = categoryMaterials.some(m => m.status === 'low' || m.status === 'critical')

              return (
                <div key={category} className={`p-4 rounded-lg ${hasIssues ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-sleeman-dark/50 border border-sleeman-gold/10'}`}>
                  <div className="text-sm text-gray-400">{category}</div>
                  <div className="text-xl font-bold text-white mt-1">{categoryMaterials.length}</div>
                  <div className="text-xs text-gray-500">items</div>
                  <div className="text-sm text-sleeman-gold mt-2">{formatCurrency(categoryValue)}</div>
                  {hasIssues && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-amber-400">
                      <AlertTriangle className="h-3 w-3" />
                      Restock needed
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
