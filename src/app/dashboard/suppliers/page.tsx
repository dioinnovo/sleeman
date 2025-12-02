'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import {
  Building2,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  FileText,
  Award,
  Filter,
  Search,
  ExternalLink,
  BarChart3
} from 'lucide-react'

// Types
interface Supplier {
  id: string
  name: string
  category: 'Malt' | 'Hops' | 'Yeast' | 'Adjuncts' | 'Packaging' | 'Chemicals' | 'Equipment'
  status: 'active' | 'under-review' | 'suspended' | 'preferred'
  reliabilityScore: number
  qualityScore: number
  deliveryScore: number
  overallScore: number
  contactName: string
  contactEmail: string
  contactPhone: string
  location: string
  country: string
  totalOrders: number
  totalSpend: number
  lastOrder: Date
  certifications: string[]
  paymentTerms: string
  leadTime: string
}

interface SupplierOrder {
  id: string
  poNumber: string
  supplierName: string
  material: string
  quantity: number
  unit: string
  orderDate: Date
  deliveryDate: Date | null
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'issue'
  amount: number
}

interface SupplierPerformance {
  supplierId: string
  supplierName: string
  onTimeDelivery: number
  qualityAcceptance: number
  responseTime: number
  trend: 'up' | 'down' | 'stable'
}

// Mock data
const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Canada Malting Co.',
    category: 'Malt',
    status: 'preferred',
    reliabilityScore: 98,
    qualityScore: 97,
    deliveryScore: 96,
    overallScore: 97,
    contactName: 'Robert Grains',
    contactEmail: 'r.grains@canadamalting.com',
    contactPhone: '+1 (416) 555-0101',
    location: 'Calgary, AB',
    country: 'Canada',
    totalOrders: 156,
    totalSpend: 425000,
    lastOrder: new Date('2024-11-25'),
    certifications: ['ISO 9001', 'HACCP', 'SQF Level 3'],
    paymentTerms: 'Net 30',
    leadTime: '5-7 days'
  },
  {
    id: '2',
    name: 'BC Hop Farms',
    category: 'Hops',
    status: 'active',
    reliabilityScore: 92,
    qualityScore: 95,
    deliveryScore: 88,
    overallScore: 92,
    contactName: 'Sarah Vine',
    contactEmail: 's.vine@bchopfarms.ca',
    contactPhone: '+1 (604) 555-0202',
    location: 'Chilliwack, BC',
    country: 'Canada',
    totalOrders: 89,
    totalSpend: 185000,
    lastOrder: new Date('2024-11-20'),
    certifications: ['Organic Certified', 'HACCP'],
    paymentTerms: 'Net 45',
    leadTime: '7-10 days'
  },
  {
    id: '3',
    name: 'Fermentis',
    category: 'Yeast',
    status: 'preferred',
    reliabilityScore: 99,
    qualityScore: 99,
    deliveryScore: 97,
    overallScore: 98,
    contactName: 'Marc Duval',
    contactEmail: 'm.duval@fermentis.com',
    contactPhone: '+33 3 20 99 71 00',
    location: 'Marcq-en-Baroeul',
    country: 'France',
    totalOrders: 45,
    totalSpend: 78000,
    lastOrder: new Date('2024-11-28'),
    certifications: ['ISO 9001', 'ISO 22000', 'FSSC 22000'],
    paymentTerms: 'Net 30',
    leadTime: '10-14 days'
  },
  {
    id: '4',
    name: 'Ardagh Group',
    category: 'Packaging',
    status: 'active',
    reliabilityScore: 94,
    qualityScore: 93,
    deliveryScore: 91,
    overallScore: 93,
    contactName: 'Jennifer Glass',
    contactEmail: 'j.glass@ardaghgroup.com',
    contactPhone: '+1 (317) 555-0303',
    location: 'Hamilton, ON',
    country: 'Canada',
    totalOrders: 78,
    totalSpend: 312000,
    lastOrder: new Date('2024-11-24'),
    certifications: ['ISO 9001', 'ISO 14001'],
    paymentTerms: 'Net 30',
    leadTime: '14-21 days'
  },
  {
    id: '5',
    name: 'Ontario Honey Producers',
    category: 'Adjuncts',
    status: 'active',
    reliabilityScore: 91,
    qualityScore: 94,
    deliveryScore: 89,
    overallScore: 91,
    contactName: 'Tom Beeson',
    contactEmail: 't.beeson@ontariohoney.ca',
    contactPhone: '+1 (519) 555-0404',
    location: 'Brantford, ON',
    country: 'Canada',
    totalOrders: 34,
    totalSpend: 45000,
    lastOrder: new Date('2024-11-15'),
    certifications: ['Canadian Organic', 'True Source Certified'],
    paymentTerms: 'Net 30',
    leadTime: '3-5 days'
  },
  {
    id: '6',
    name: 'Linde Canada',
    category: 'Chemicals',
    status: 'preferred',
    reliabilityScore: 97,
    qualityScore: 99,
    deliveryScore: 98,
    overallScore: 98,
    contactName: 'David Chen',
    contactEmail: 'd.chen@linde.com',
    contactPhone: '+1 (905) 555-0505',
    location: 'Mississauga, ON',
    country: 'Canada',
    totalOrders: 112,
    totalSpend: 156000,
    lastOrder: new Date('2024-11-26'),
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
    paymentTerms: 'Net 15',
    leadTime: '1-2 days'
  },
  {
    id: '7',
    name: 'Briess Malt',
    category: 'Malt',
    status: 'active',
    reliabilityScore: 95,
    qualityScore: 96,
    deliveryScore: 93,
    overallScore: 95,
    contactName: 'Mike Rye',
    contactEmail: 'm.rye@briess.com',
    contactPhone: '+1 (920) 555-0606',
    location: 'Chilton, WI',
    country: 'USA',
    totalOrders: 67,
    totalSpend: 198000,
    lastOrder: new Date('2024-11-21'),
    certifications: ['SQF Level 3', 'Kosher', 'Organic'],
    paymentTerms: 'Net 30',
    leadTime: '7-10 days'
  },
  {
    id: '8',
    name: 'GEA Brewing Systems',
    category: 'Equipment',
    status: 'under-review',
    reliabilityScore: 88,
    qualityScore: 92,
    deliveryScore: 75,
    overallScore: 85,
    contactName: 'Hans Mueller',
    contactEmail: 'h.mueller@gea.com',
    contactPhone: '+49 211 555-0707',
    location: 'Dusseldorf',
    country: 'Germany',
    totalOrders: 12,
    totalSpend: 890000,
    lastOrder: new Date('2024-10-15'),
    certifications: ['ISO 9001', 'CE Marking'],
    paymentTerms: 'Net 60',
    leadTime: '30-60 days'
  }
]

const recentOrders: SupplierOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-1905',
    supplierName: 'Ardagh Group',
    material: '330ml Brown Bottles',
    quantity: 200000,
    unit: 'units',
    orderDate: new Date('2024-11-28'),
    deliveryDate: new Date('2024-12-05'),
    status: 'shipped',
    amount: 36000
  },
  {
    id: '2',
    poNumber: 'PO-2024-1908',
    supplierName: 'BC Hop Farms',
    material: 'Centennial Hops',
    quantity: 500,
    unit: 'kg',
    orderDate: new Date('2024-11-29'),
    deliveryDate: new Date('2024-12-08'),
    status: 'confirmed',
    amount: 16000
  },
  {
    id: '3',
    poNumber: 'PO-2024-1904',
    supplierName: 'Canada Malting Co.',
    material: '2-Row Pale Malt',
    quantity: 30000,
    unit: 'kg',
    orderDate: new Date('2024-11-20'),
    deliveryDate: new Date('2024-11-28'),
    status: 'delivered',
    amount: 25500
  },
  {
    id: '4',
    poNumber: 'PO-2024-1910',
    supplierName: 'BC Hop Farms',
    material: 'Cascade Hops',
    quantity: 400,
    unit: 'kg',
    orderDate: new Date('2024-11-30'),
    deliveryDate: null,
    status: 'pending',
    amount: 11400
  },
  {
    id: '5',
    poNumber: 'PO-2024-1902',
    supplierName: 'GEA Brewing Systems',
    material: 'Spare Parts Kit',
    quantity: 1,
    unit: 'set',
    orderDate: new Date('2024-11-15'),
    deliveryDate: new Date('2024-12-10'),
    status: 'issue',
    amount: 12500
  }
]

const performanceData: SupplierPerformance[] = [
  { supplierId: '1', supplierName: 'Canada Malting Co.', onTimeDelivery: 98, qualityAcceptance: 99, responseTime: 4, trend: 'up' },
  { supplierId: '3', supplierName: 'Fermentis', onTimeDelivery: 97, qualityAcceptance: 100, responseTime: 12, trend: 'stable' },
  { supplierId: '6', supplierName: 'Linde Canada', onTimeDelivery: 99, qualityAcceptance: 100, responseTime: 2, trend: 'up' },
  { supplierId: '2', supplierName: 'BC Hop Farms', onTimeDelivery: 88, qualityAcceptance: 96, responseTime: 8, trend: 'down' },
  { supplierId: '4', supplierName: 'Ardagh Group', onTimeDelivery: 91, qualityAcceptance: 94, responseTime: 6, trend: 'stable' }
]

// Helper functions
const getStatusColor = (status: Supplier['status']) => {
  switch (status) {
    case 'preferred':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'active':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'under-review':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'suspended':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
  }
}

const getOrderStatusColor = (status: SupplierOrder['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-500/20 text-gray-400'
    case 'confirmed':
      return 'bg-blue-500/20 text-blue-400'
    case 'shipped':
      return 'bg-purple-500/20 text-purple-400'
    case 'delivered':
      return 'bg-green-500/20 text-green-400'
    case 'issue':
      return 'bg-red-500/20 text-red-400'
  }
}

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-400'
  if (score >= 85) return 'text-amber-400'
  return 'text-red-400'
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

export default function SuppliersPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate KPIs
  const totalSuppliers = suppliers.length
  const preferredSuppliers = suppliers.filter(s => s.status === 'preferred').length
  const avgReliability = Math.round(suppliers.reduce((sum, s) => sum + s.reliabilityScore, 0) / suppliers.length)
  const totalSpendYTD = suppliers.reduce((sum, s) => sum + s.totalSpend, 0)
  const pendingOrders = recentOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length
  const issueOrders = recentOrders.filter(o => o.status === 'issue').length

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const categories = ['Malt', 'Hops', 'Yeast', 'Adjuncts', 'Packaging', 'Chemicals', 'Equipment']

  return (
    <div className="min-h-screen bg-sleeman-dark">
      <PageHeader
        title="Supplier Management"
        description="Track supplier performance, orders, and relationships"
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Total Suppliers</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalSuppliers}</div>
            <div className="text-xs text-gray-500 mt-1">Active vendors</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Preferred</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{preferredSuppliers}</div>
            <div className="text-xs text-gray-500 mt-1">Top tier suppliers</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Avg Reliability</span>
            </div>
            <div className="text-2xl font-bold text-white">{avgReliability}%</div>
            <div className="text-xs text-gray-500 mt-1">Overall score</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">YTD Spend</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalSpendYTD)}</div>
            <div className="text-xs text-gray-500 mt-1">Total procurement</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Pending Orders</span>
            </div>
            <div className="text-2xl font-bold text-white">{pendingOrders}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting delivery</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-gray-400">Issues</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{issueOrders}</div>
            <div className="text-xs text-gray-500 mt-1">Need attention</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
            >
              <option value="all">All Status</option>
              <option value="preferred">Preferred</option>
              <option value="active">Active</option>
              <option value="under-review">Under Review</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier Directory - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4 hover:border-sleeman-gold/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                      {supplier.status === 'preferred' && (
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{supplier.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{supplier.location}, {supplier.country}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(supplier.status)}`}>
                    {supplier.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-2 bg-sleeman-dark/50 rounded">
                    <div className={`text-lg font-bold ${getScoreColor(supplier.overallScore)}`}>{supplier.overallScore}%</div>
                    <div className="text-xs text-gray-500">Overall Score</div>
                  </div>
                  <div className="text-center p-2 bg-sleeman-dark/50 rounded">
                    <div className="text-lg font-bold text-white">{supplier.reliabilityScore}%</div>
                    <div className="text-xs text-gray-500">Reliability</div>
                  </div>
                  <div className="text-center p-2 bg-sleeman-dark/50 rounded">
                    <div className="text-lg font-bold text-white">{supplier.qualityScore}%</div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                  <div className="text-center p-2 bg-sleeman-dark/50 rounded">
                    <div className="text-lg font-bold text-white">{supplier.deliveryScore}%</div>
                    <div className="text-xs text-gray-500">Delivery</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Contact</div>
                    <div className="text-white">{supplier.contactName}</div>
                    <div className="text-xs text-gray-400 truncate">{supplier.contactEmail}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Total Orders</div>
                    <div className="text-white">{formatNumber(supplier.totalOrders)}</div>
                    <div className="text-xs text-gray-400">YTD orders</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Total Spend</div>
                    <div className="text-white">{formatCurrency(supplier.totalSpend)}</div>
                    <div className="text-xs text-gray-400">YTD spend</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Lead Time</div>
                    <div className="text-white">{supplier.leadTime}</div>
                    <div className="text-xs text-gray-400">{supplier.paymentTerms}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {supplier.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-0.5 bg-sleeman-gold/10 text-sleeman-gold text-xs rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <Package className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              </div>
              <div className="p-4 space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-3 bg-sleeman-dark/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{order.poNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${getOrderStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">{order.material}</div>
                    <div className="text-xs text-gray-500">{order.supplierName}</div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-500">
                        {formatNumber(order.quantity)} {order.unit}
                      </span>
                      <span className="text-sleeman-gold">{formatCurrency(order.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Leaderboard */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <Award className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Performance Leaders</h2>
              </div>
              <div className="p-4 space-y-3">
                {performanceData.map((perf, index) => (
                  <div key={perf.supplierId} className="flex items-center gap-3 p-2 bg-sleeman-dark/50 rounded">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-amber-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-700 text-white' :
                      'bg-sleeman-dark text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{perf.supplierName}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>On-time: {perf.onTimeDelivery}%</span>
                        <span>•</span>
                        <span>Quality: {perf.qualityAcceptance}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {perf.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                      {perf.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                      {perf.trend === 'stable' && <span className="text-gray-400">—</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spend by Category */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Spend by Category</h2>
              </div>
              <div className="p-4 space-y-3">
                {categories.map(category => {
                  const categorySuppliers = suppliers.filter(s => s.category === category)
                  const categorySpend = categorySuppliers.reduce((sum, s) => sum + s.totalSpend, 0)
                  const percentage = Math.round((categorySpend / totalSpendYTD) * 100)

                  if (categorySpend === 0) return null

                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-300">{category}</span>
                        <span className="text-white">{formatCurrency(categorySpend)}</span>
                      </div>
                      <div className="w-full bg-sleeman-dark rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-sleeman-gold"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{percentage}% of total</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
