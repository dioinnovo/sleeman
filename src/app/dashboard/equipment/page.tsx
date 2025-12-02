'use client'

import { useState } from 'react'
import {
  Wrench, AlertTriangle, CheckCircle, Clock, Calendar,
  Activity, TrendingUp, Settings, Zap,
  ThermometerSun, Gauge, Timer, Download, RefreshCw,
  AlertCircle, BarChart3
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface Equipment {
  id: string
  name: string
  type: 'Fermenter' | 'Bottling' | 'Kegging' | 'Cooling' | 'Boiler' | 'Conveyor'
  location: 'Guelph' | 'Vernon'
  status: 'operational' | 'maintenance' | 'warning' | 'offline'
  utilization: number
  lastMaintenance: Date
  nextMaintenance: Date
  hoursOperating: number
  efficiency: number
}

interface MaintenanceTask {
  id: string
  equipment: string
  taskType: 'Preventive' | 'Corrective' | 'Inspection' | 'Calibration'
  priority: 'high' | 'medium' | 'low'
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue'
  scheduledDate: Date
  assignedTo: string
  estimatedHours: number
  description: string
}

interface DowntimeEvent {
  id: string
  equipment: string
  startTime: Date
  endTime: Date | null
  reason: string
  impact: string
  resolved: boolean
}

export default function EquipmentMaintenancePage() {
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'guelph' | 'vernon'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'operational' | 'maintenance' | 'warning'>('all')

  const equipment: Equipment[] = [
    {
      id: 'EQ-001',
      name: 'Fermenter Tank A1',
      type: 'Fermenter',
      location: 'Guelph',
      status: 'operational',
      utilization: 94.5,
      lastMaintenance: new Date('2024-11-15'),
      nextMaintenance: new Date('2025-02-15'),
      hoursOperating: 8760,
      efficiency: 98.2
    },
    {
      id: 'EQ-002',
      name: 'Fermenter Tank A2',
      type: 'Fermenter',
      location: 'Guelph',
      status: 'operational',
      utilization: 91.2,
      lastMaintenance: new Date('2024-11-20'),
      nextMaintenance: new Date('2025-02-20'),
      hoursOperating: 8520,
      efficiency: 97.8
    },
    {
      id: 'EQ-003',
      name: 'Bottling Line 1',
      type: 'Bottling',
      location: 'Guelph',
      status: 'maintenance',
      utilization: 0,
      lastMaintenance: new Date('2024-12-01'),
      nextMaintenance: new Date('2024-12-01'),
      hoursOperating: 15240,
      efficiency: 0
    },
    {
      id: 'EQ-004',
      name: 'Bottling Line 2',
      type: 'Bottling',
      location: 'Guelph',
      status: 'operational',
      utilization: 87.3,
      lastMaintenance: new Date('2024-10-28'),
      nextMaintenance: new Date('2025-01-28'),
      hoursOperating: 14890,
      efficiency: 95.4
    },
    {
      id: 'EQ-005',
      name: 'Kegging System',
      type: 'Kegging',
      location: 'Guelph',
      status: 'warning',
      utilization: 72.1,
      lastMaintenance: new Date('2024-09-15'),
      nextMaintenance: new Date('2024-12-05'),
      hoursOperating: 12450,
      efficiency: 89.5
    },
    {
      id: 'EQ-006',
      name: 'Cooling System A',
      type: 'Cooling',
      location: 'Guelph',
      status: 'operational',
      utilization: 99.1,
      lastMaintenance: new Date('2024-11-05'),
      nextMaintenance: new Date('2025-02-05'),
      hoursOperating: 26280,
      efficiency: 99.8
    },
    {
      id: 'EQ-007',
      name: 'Brew Kettle Main',
      type: 'Boiler',
      location: 'Guelph',
      status: 'operational',
      utilization: 82.5,
      lastMaintenance: new Date('2024-10-20'),
      nextMaintenance: new Date('2025-01-20'),
      hoursOperating: 18450,
      efficiency: 96.7
    },
    {
      id: 'EQ-008',
      name: 'Fermenter Tank V1',
      type: 'Fermenter',
      location: 'Vernon',
      status: 'operational',
      utilization: 88.7,
      lastMaintenance: new Date('2024-11-10'),
      nextMaintenance: new Date('2025-02-10'),
      hoursOperating: 6540,
      efficiency: 97.1
    },
    {
      id: 'EQ-009',
      name: 'Bottling Line Vernon',
      type: 'Bottling',
      location: 'Vernon',
      status: 'operational',
      utilization: 79.4,
      lastMaintenance: new Date('2024-11-25'),
      nextMaintenance: new Date('2025-02-25'),
      hoursOperating: 9870,
      efficiency: 94.2
    },
    {
      id: 'EQ-010',
      name: 'Conveyor System Main',
      type: 'Conveyor',
      location: 'Guelph',
      status: 'operational',
      utilization: 85.2,
      lastMaintenance: new Date('2024-11-18'),
      nextMaintenance: new Date('2025-01-18'),
      hoursOperating: 21340,
      efficiency: 98.5
    }
  ]

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: 'MT-001',
      equipment: 'Bottling Line 1',
      taskType: 'Preventive',
      priority: 'high',
      status: 'in_progress',
      scheduledDate: new Date('2024-12-01'),
      assignedTo: 'Mike Thompson',
      estimatedHours: 8,
      description: 'Annual preventive maintenance - replace seals and bearings'
    },
    {
      id: 'MT-002',
      equipment: 'Kegging System',
      taskType: 'Inspection',
      priority: 'high',
      status: 'scheduled',
      scheduledDate: new Date('2024-12-05'),
      assignedTo: 'Sarah Chen',
      estimatedHours: 4,
      description: 'Pressure valve inspection and calibration'
    },
    {
      id: 'MT-003',
      equipment: 'Fermenter Tank A1',
      taskType: 'Calibration',
      priority: 'medium',
      status: 'scheduled',
      scheduledDate: new Date('2024-12-10'),
      assignedTo: 'James Wilson',
      estimatedHours: 2,
      description: 'Temperature sensor calibration'
    },
    {
      id: 'MT-004',
      equipment: 'Cooling System A',
      taskType: 'Inspection',
      priority: 'low',
      status: 'scheduled',
      scheduledDate: new Date('2024-12-15'),
      assignedTo: 'Emily Davis',
      estimatedHours: 3,
      description: 'Quarterly refrigerant level check'
    },
    {
      id: 'MT-005',
      equipment: 'Brew Kettle Main',
      taskType: 'Preventive',
      priority: 'medium',
      status: 'completed',
      scheduledDate: new Date('2024-11-28'),
      assignedTo: 'Mike Thompson',
      estimatedHours: 6,
      description: 'Heat exchanger cleaning and inspection'
    }
  ]

  const recentDowntime: DowntimeEvent[] = [
    {
      id: 'DT-001',
      equipment: 'Bottling Line 1',
      startTime: new Date('2024-12-01T08:00:00'),
      endTime: null,
      reason: 'Scheduled preventive maintenance',
      impact: 'Bottling operations moved to Line 2',
      resolved: false
    },
    {
      id: 'DT-002',
      equipment: 'Kegging System',
      startTime: new Date('2024-11-28T14:30:00'),
      endTime: new Date('2024-11-28T16:45:00'),
      reason: 'Pressure valve malfunction',
      impact: 'Kegging delayed 2 hours',
      resolved: true
    },
    {
      id: 'DT-003',
      equipment: 'Conveyor System Main',
      startTime: new Date('2024-11-25T10:00:00'),
      endTime: new Date('2024-11-25T11:30:00'),
      reason: 'Belt alignment adjustment',
      impact: 'Minor production slowdown',
      resolved: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'maintenance': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'offline': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle
      case 'maintenance': return Wrench
      case 'warning': return AlertTriangle
      case 'offline': return AlertCircle
      default: return Settings
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'in_progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'scheduled': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Fermenter': return ThermometerSun
      case 'Bottling': return Settings
      case 'Kegging': return Gauge
      case 'Cooling': return Zap
      case 'Boiler': return Activity
      case 'Conveyor': return RefreshCw
      default: return Wrench
    }
  }

  // Calculate metrics
  const operationalCount = equipment.filter(e => e.status === 'operational').length
  const maintenanceCount = equipment.filter(e => e.status === 'maintenance').length
  const warningCount = equipment.filter(e => e.status === 'warning').length
  const avgUtilization = Math.round(equipment.filter(e => e.status === 'operational').reduce((acc, e) => acc + e.utilization, 0) / operationalCount * 10) / 10
  const avgEfficiency = Math.round(equipment.filter(e => e.status === 'operational').reduce((acc, e) => acc + e.efficiency, 0) / operationalCount * 10) / 10
  const pendingTasks = maintenanceTasks.filter(t => t.status === 'scheduled' || t.status === 'in_progress').length

  const filteredEquipment = equipment.filter(e => {
    const locationMatch = selectedLocation === 'all' ||
      (selectedLocation === 'guelph' && e.location === 'Guelph') ||
      (selectedLocation === 'vernon' && e.location === 'Vernon')
    const statusMatch = selectedStatus === 'all' || e.status === selectedStatus
    return locationMatch && statusMatch
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment Maintenance"
        description="Monitor equipment status, maintenance schedules, and operational efficiency"
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
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">Online</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{operationalCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Operational</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Wrench className="text-blue-600" size={20} />
            <span className="text-xs text-blue-600 font-semibold">In Maint.</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{maintenanceCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maintenance</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-yellow-600" size={20} />
            <span className="text-xs text-yellow-600 font-semibold">Attention</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{warningCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Needs Attention</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-purple-600" size={20} />
            <span className="text-xs text-purple-600 font-semibold">Avg</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgUtilization}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Utilization</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-sleeman-gold" size={20} />
            <span className="text-xs text-sleeman-gold font-semibold">Avg</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgEfficiency}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Efficiency</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-indigo-600" size={20} />
            <span className="text-xs text-indigo-600 font-semibold">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingTasks}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maint. Tasks</p>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Settings size={20} className="text-sleeman-gold" />
            Equipment Status
          </h2>
          <div className="flex gap-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as typeof selectedLocation)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Locations</option>
              <option value="guelph">Guelph</option>
              <option value="vernon">Vernon</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredEquipment.map((eq) => {
            const StatusIcon = getStatusIcon(eq.status)
            const TypeIcon = getTypeIcon(eq.type)

            return (
              <div
                key={eq.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sleeman-gold transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sleeman-gold/10 flex items-center justify-center">
                      <TypeIcon className="text-sleeman-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{eq.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{eq.location} • {eq.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(eq.status)}`}>
                    <StatusIcon size={12} />
                    {eq.status.charAt(0).toUpperCase() + eq.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Utilization</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${eq.utilization > 80 ? 'bg-green-500' : eq.utilization > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${eq.utilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{eq.utilization}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{eq.efficiency}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Next Maint: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {eq.nextMaintenance.toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Hours: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {eq.hoursOperating.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Calendar size={20} className="text-sleeman-gold" />
              Maintenance Schedule
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
            {maintenanceTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{task.equipment}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="inline mr-1" />
                      {task.estimatedHours}h
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {task.scheduledDate.toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Assigned: {task.assignedTo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Downtime */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Timer size={20} className="text-sleeman-gold" />
              Recent Downtime Events
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
            {recentDowntime.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{event.equipment}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.reason}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    event.resolved
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {event.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> {event.impact}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Started: {event.startTime.toLocaleString()}
                  </span>
                  {event.endTime && (
                    <span>
                      Duration: {Math.round((event.endTime.getTime() - event.startTime.getTime()) / 3600000 * 10) / 10}h
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-sleeman-dark to-sleeman-brown rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={24} className="text-sleeman-gold" />
          <h2 className="text-xl font-bold">Equipment Performance Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <Activity size={16} />
              Overall Equipment Effectiveness
            </h3>
            <p className="text-3xl font-bold">94.2%</p>
            <p className="text-sm opacity-90 mt-1">OEE Score</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <Clock size={16} />
              Mean Time Between Failures
            </h3>
            <p className="text-3xl font-bold">847h</p>
            <p className="text-sm opacity-90 mt-1">MTBF</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <Wrench size={16} />
              Mean Time To Repair
            </h3>
            <p className="text-3xl font-bold">2.4h</p>
            <p className="text-sm opacity-90 mt-1">MTTR</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sleeman-gold">
              <TrendingUp size={16} />
              Uptime This Month
            </h3>
            <p className="text-3xl font-bold text-green-400">98.7%</p>
            <p className="text-sm opacity-90 mt-1">Above target 97%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
