'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import {
  Calendar,
  Clock,
  Factory,
  Beer,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Timer,
  Target,
  TrendingUp,
  Users,
  Beaker,
  Package
} from 'lucide-react'

// Types
interface ScheduledBatch {
  id: string
  batchNumber: string
  beerStyle: string
  productionLine: string
  facility: 'Guelph' | 'Vernon'
  startDate: Date
  endDate: Date
  status: 'scheduled' | 'in-progress' | 'fermenting' | 'conditioning' | 'packaging' | 'completed' | 'delayed'
  targetVolume: number
  assignedCrew: string
  priority: 'high' | 'medium' | 'low'
  notes?: string
}

interface ProductionLine {
  id: string
  name: string
  facility: 'Guelph' | 'Vernon'
  currentBatch: string | null
  status: 'active' | 'idle' | 'maintenance' | 'changeover'
  utilizationToday: number
  scheduledBatches: number
}

interface DailyCapacity {
  date: Date
  scheduledHectoliters: number
  maxCapacity: number
  batches: number
}

// Mock data
const scheduledBatches: ScheduledBatch[] = [
  {
    id: '1',
    batchNumber: 'BATCH-2024-501',
    beerStyle: 'Sleeman Honey Brown',
    productionLine: 'Line 1 - Brewing',
    facility: 'Guelph',
    startDate: new Date('2024-12-02T06:00:00'),
    endDate: new Date('2024-12-02T14:00:00'),
    status: 'in-progress',
    targetVolume: 450,
    assignedCrew: 'Crew A - Morning',
    priority: 'high',
    notes: 'Rush order for LCBO'
  },
  {
    id: '2',
    batchNumber: 'BATCH-2024-502',
    beerStyle: 'Sleeman Clear 2.0',
    productionLine: 'Line 2 - Brewing',
    facility: 'Guelph',
    startDate: new Date('2024-12-02T08:00:00'),
    endDate: new Date('2024-12-02T16:00:00'),
    status: 'in-progress',
    targetVolume: 500,
    assignedCrew: 'Crew B - Morning',
    priority: 'medium'
  },
  {
    id: '3',
    batchNumber: 'BATCH-2024-498',
    beerStyle: 'Sleeman Original Draught',
    productionLine: 'Tank F-03',
    facility: 'Guelph',
    startDate: new Date('2024-11-25'),
    endDate: new Date('2024-12-09'),
    status: 'fermenting',
    targetVolume: 480,
    assignedCrew: 'Fermentation Team',
    priority: 'medium'
  },
  {
    id: '4',
    batchNumber: 'BATCH-2024-495',
    beerStyle: 'Sleeman Cream Ale',
    productionLine: 'Tank C-02',
    facility: 'Guelph',
    startDate: new Date('2024-11-20'),
    endDate: new Date('2024-12-04'),
    status: 'conditioning',
    targetVolume: 520,
    assignedCrew: 'Conditioning Team',
    priority: 'high'
  },
  {
    id: '5',
    batchNumber: 'BATCH-2024-503',
    beerStyle: 'Okanagan Spring Pale Ale',
    productionLine: 'Line 4 - Brewing',
    facility: 'Vernon',
    startDate: new Date('2024-12-02T07:00:00'),
    endDate: new Date('2024-12-02T15:00:00'),
    status: 'in-progress',
    targetVolume: 380,
    assignedCrew: 'Vernon Crew A',
    priority: 'medium'
  },
  {
    id: '6',
    batchNumber: 'BATCH-2024-504',
    beerStyle: 'Sleeman Silver Creek',
    productionLine: 'Line 1 - Brewing',
    facility: 'Guelph',
    startDate: new Date('2024-12-03T06:00:00'),
    endDate: new Date('2024-12-03T14:00:00'),
    status: 'scheduled',
    targetVolume: 460,
    assignedCrew: 'Crew A - Morning',
    priority: 'medium'
  },
  {
    id: '7',
    batchNumber: 'BATCH-2024-505',
    beerStyle: 'Sapporo Premium',
    productionLine: 'Line 3 - Brewing',
    facility: 'Guelph',
    startDate: new Date('2024-12-03T08:00:00'),
    endDate: new Date('2024-12-03T18:00:00'),
    status: 'scheduled',
    targetVolume: 600,
    assignedCrew: 'Crew C - Day',
    priority: 'high',
    notes: 'Export order for Japan'
  },
  {
    id: '8',
    batchNumber: 'BATCH-2024-490',
    beerStyle: 'Wild Rose WRaspberry',
    productionLine: 'Packaging Line 1',
    facility: 'Vernon',
    startDate: new Date('2024-12-02T10:00:00'),
    endDate: new Date('2024-12-02T18:00:00'),
    status: 'packaging',
    targetVolume: 350,
    assignedCrew: 'Packaging Team Vernon',
    priority: 'medium'
  },
  {
    id: '9',
    batchNumber: 'BATCH-2024-506',
    beerStyle: 'Sleeman Honey Brown',
    productionLine: 'Line 5 - Brewing',
    facility: 'Vernon',
    startDate: new Date('2024-12-04T06:00:00'),
    endDate: new Date('2024-12-04T14:00:00'),
    status: 'scheduled',
    targetVolume: 420,
    assignedCrew: 'Vernon Crew B',
    priority: 'low'
  },
  {
    id: '10',
    batchNumber: 'BATCH-2024-492',
    beerStyle: 'Sleeman Clear 2.0',
    productionLine: 'Tank F-05',
    facility: 'Guelph',
    startDate: new Date('2024-11-28'),
    endDate: new Date('2024-12-05'),
    status: 'delayed',
    targetVolume: 490,
    assignedCrew: 'Fermentation Team',
    priority: 'high',
    notes: 'Temperature fluctuation - extended fermentation'
  }
]

const productionLines: ProductionLine[] = [
  { id: '1', name: 'Line 1 - Brewing', facility: 'Guelph', currentBatch: 'BATCH-2024-501', status: 'active', utilizationToday: 87, scheduledBatches: 4 },
  { id: '2', name: 'Line 2 - Brewing', facility: 'Guelph', currentBatch: 'BATCH-2024-502', status: 'active', utilizationToday: 92, scheduledBatches: 3 },
  { id: '3', name: 'Line 3 - Brewing', facility: 'Guelph', currentBatch: null, status: 'idle', utilizationToday: 45, scheduledBatches: 2 },
  { id: '4', name: 'Line 4 - Brewing', facility: 'Vernon', currentBatch: 'BATCH-2024-503', status: 'active', utilizationToday: 78, scheduledBatches: 3 },
  { id: '5', name: 'Line 5 - Brewing', facility: 'Vernon', currentBatch: null, status: 'maintenance', utilizationToday: 0, scheduledBatches: 1 }
]

const weekCapacity: DailyCapacity[] = [
  { date: new Date('2024-12-02'), scheduledHectoliters: 2180, maxCapacity: 2800, batches: 6 },
  { date: new Date('2024-12-03'), scheduledHectoliters: 2340, maxCapacity: 2800, batches: 5 },
  { date: new Date('2024-12-04'), scheduledHectoliters: 1890, maxCapacity: 2800, batches: 4 },
  { date: new Date('2024-12-05'), scheduledHectoliters: 2560, maxCapacity: 2800, batches: 6 },
  { date: new Date('2024-12-06'), scheduledHectoliters: 2100, maxCapacity: 2800, batches: 5 },
  { date: new Date('2024-12-07'), scheduledHectoliters: 1400, maxCapacity: 2000, batches: 3 },
  { date: new Date('2024-12-08'), scheduledHectoliters: 800, maxCapacity: 2000, batches: 2 }
]

// Helper functions
const getStatusColor = (status: ScheduledBatch['status']) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'in-progress':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'fermenting':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'conditioning':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    case 'packaging':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'completed':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    case 'delayed':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
  }
}

const getLineStatusColor = (status: ProductionLine['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400'
    case 'idle':
      return 'bg-gray-500/20 text-gray-400'
    case 'maintenance':
      return 'bg-amber-500/20 text-amber-400'
    case 'changeover':
      return 'bg-blue-500/20 text-blue-400'
  }
}

const getPriorityColor = (priority: ScheduledBatch['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-400'
    case 'medium':
      return 'text-amber-400'
    case 'low':
      return 'text-gray-400'
  }
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-CA').format(value)
}

const getCapacityColor = (scheduled: number, max: number) => {
  const percentage = (scheduled / max) * 100
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 75) return 'bg-amber-500'
  return 'bg-green-500'
}

export default function ProductionSchedulePage() {
  const [facilityFilter, setFacilityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [weekOffset, setWeekOffset] = useState(0)

  // Calculate KPIs
  const activeBatches = scheduledBatches.filter(b => ['in-progress', 'fermenting', 'conditioning', 'packaging'].includes(b.status)).length
  const scheduledToday = scheduledBatches.filter(b => b.status === 'in-progress' || (b.status === 'scheduled' && b.startDate.toDateString() === new Date().toDateString())).length
  const delayedBatches = scheduledBatches.filter(b => b.status === 'delayed').length
  const totalScheduledVolume = scheduledBatches.filter(b => b.status !== 'completed').reduce((sum, b) => sum + b.targetVolume, 0)
  const activeLines = productionLines.filter(l => l.status === 'active').length
  const avgUtilization = Math.round(productionLines.reduce((sum, l) => sum + l.utilizationToday, 0) / productionLines.length)

  // Filter batches
  const filteredBatches = scheduledBatches.filter(batch => {
    const matchesFacility = facilityFilter === 'all' || batch.facility === facilityFilter
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter
    return matchesFacility && matchesStatus
  })

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="min-h-screen bg-sleeman-dark">
      <PageHeader
        title="Production Scheduling"
        description="Plan and track brewing batches across production lines and facilities"
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-sleeman-brown/50 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Play className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Active Batches</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{activeBatches}</div>
            <div className="text-xs text-gray-500 mt-1">Currently processing</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Today's Schedule</span>
            </div>
            <div className="text-2xl font-bold text-white">{scheduledToday}</div>
            <div className="text-xs text-gray-500 mt-1">Batches today</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-gray-400">Delayed</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{delayedBatches}</div>
            <div className="text-xs text-gray-500 mt-1">Behind schedule</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Beer className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Scheduled Volume</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(totalScheduledVolume)}</div>
            <div className="text-xs text-gray-500 mt-1">hL in pipeline</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Factory className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Active Lines</span>
            </div>
            <div className="text-2xl font-bold text-white">{activeLines}/{productionLines.length}</div>
            <div className="text-xs text-gray-500 mt-1">Lines running</div>
          </div>

          <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-sleeman-gold" />
              <span className="text-xs text-gray-400">Utilization</span>
            </div>
            <div className="text-2xl font-bold text-white">{avgUtilization}%</div>
            <div className="text-xs text-gray-500 mt-1">Avg today</div>
          </div>
        </div>

        {/* Week Capacity Overview */}
        <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-sleeman-gold" />
              <h2 className="text-lg font-semibold text-white">Week Capacity Overview</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekOffset(prev => prev - 1)}
                className="p-1 hover:bg-sleeman-gold/20 rounded"
              >
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              </button>
              <span className="text-sm text-gray-400">Dec 2 - Dec 8, 2024</span>
              <button
                onClick={() => setWeekOffset(prev => prev + 1)}
                className="p-1 hover:bg-sleeman-gold/20 rounded"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekCapacity.map((day, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${index === 0 ? 'bg-sleeman-gold/20 border border-sleeman-gold/40' : 'bg-sleeman-dark/50 border border-sleeman-gold/10'}`}
              >
                <div className="text-xs text-gray-400">{dayNames[day.date.getDay()]}</div>
                <div className="text-sm font-medium text-white">{day.date.getDate()}</div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">{day.batches} batches</span>
                    <span className="text-gray-400">{Math.round((day.scheduledHectoliters / day.maxCapacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-sleeman-dark rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCapacityColor(day.scheduledHectoliters, day.maxCapacity)}`}
                      style={{ width: `${Math.min((day.scheduledHectoliters / day.maxCapacity) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatNumber(day.scheduledHectoliters)} / {formatNumber(day.maxCapacity)} hL
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Batch Schedule - 2 columns */}
          <div className="lg:col-span-2 bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
            <div className="p-4 border-b border-sleeman-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Batch Schedule</h2>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={facilityFilter}
                  onChange={(e) => setFacilityFilter(e.target.value)}
                  className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
                >
                  <option value="all">All Facilities</option>
                  <option value="Guelph">Guelph</option>
                  <option value="Vernon">Vernon</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-sleeman-dark border border-sleeman-gold/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sleeman-gold/50"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="fermenting">Fermenting</option>
                  <option value="conditioning">Conditioning</option>
                  <option value="packaging">Packaging</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-sleeman-gold/10">
              {filteredBatches.map((batch) => (
                <div key={batch.id} className="p-4 hover:bg-sleeman-gold/5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{batch.batchNumber}</span>
                        <span className={`text-xs ${getPriorityColor(batch.priority)}`}>
                          {batch.priority === 'high' && '● High'}
                          {batch.priority === 'medium' && '● Medium'}
                          {batch.priority === 'low' && '● Low'}
                        </span>
                      </div>
                      <div className="text-sm text-sleeman-gold mt-0.5">{batch.beerStyle}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(batch.status)}`}>
                      {batch.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs">Production Line</div>
                      <div className="text-gray-300">{batch.productionLine}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Facility</div>
                      <div className="text-gray-300">{batch.facility}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Target Volume</div>
                      <div className="text-gray-300">{formatNumber(batch.targetVolume)} hL</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Assigned Crew</div>
                      <div className="text-gray-300">{batch.assignedCrew}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {batch.startDate.toLocaleDateString('en-CA')} {batch.startDate.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {batch.notes && (
                      <div className="text-amber-400">Note: {batch.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Production Lines Status */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <Factory className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Production Lines</h2>
              </div>
              <div className="p-4 space-y-3">
                {productionLines.map((line) => (
                  <div key={line.id} className="p-3 bg-sleeman-dark/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-white">{line.name}</div>
                        <div className="text-xs text-gray-500">{line.facility}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${getLineStatusColor(line.status)}`}>
                        {line.status.charAt(0).toUpperCase() + line.status.slice(1)}
                      </span>
                    </div>
                    {line.currentBatch && (
                      <div className="text-xs text-sleeman-gold mb-2">{line.currentBatch}</div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Utilization: {line.utilizationToday}%</span>
                      <span className="text-gray-500">{line.scheduledBatches} batches scheduled</span>
                    </div>
                    <div className="w-full bg-sleeman-dark rounded-full h-1.5 mt-2">
                      <div
                        className={`h-1.5 rounded-full ${line.utilizationToday >= 80 ? 'bg-green-500' : line.utilizationToday >= 50 ? 'bg-amber-500' : 'bg-gray-500'}`}
                        style={{ width: `${line.utilizationToday}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <Timer className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Batch Status Summary</h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { status: 'scheduled', label: 'Scheduled', count: scheduledBatches.filter(b => b.status === 'scheduled').length },
                  { status: 'in-progress', label: 'In Progress', count: scheduledBatches.filter(b => b.status === 'in-progress').length },
                  { status: 'fermenting', label: 'Fermenting', count: scheduledBatches.filter(b => b.status === 'fermenting').length },
                  { status: 'conditioning', label: 'Conditioning', count: scheduledBatches.filter(b => b.status === 'conditioning').length },
                  { status: 'packaging', label: 'Packaging', count: scheduledBatches.filter(b => b.status === 'packaging').length },
                  { status: 'delayed', label: 'Delayed', count: scheduledBatches.filter(b => b.status === 'delayed').length },
                ].map(item => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(item.status as ScheduledBatch['status'])}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-white font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew Schedule */}
            <div className="bg-sleeman-brown/50 border border-sleeman-gold/20 rounded-lg">
              <div className="p-4 border-b border-sleeman-gold/20 flex items-center gap-2">
                <Users className="h-5 w-5 text-sleeman-gold" />
                <h2 className="text-lg font-semibold text-white">Today's Crews</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between p-2 bg-sleeman-dark/50 rounded">
                  <span className="text-sm text-white">Crew A - Morning</span>
                  <span className="text-xs text-green-400">On Duty</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-sleeman-dark/50 rounded">
                  <span className="text-sm text-white">Crew B - Morning</span>
                  <span className="text-xs text-green-400">On Duty</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-sleeman-dark/50 rounded">
                  <span className="text-sm text-white">Crew C - Day</span>
                  <span className="text-xs text-amber-400">Starting 08:00</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-sleeman-dark/50 rounded">
                  <span className="text-sm text-white">Vernon Crew A</span>
                  <span className="text-xs text-green-400">On Duty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
