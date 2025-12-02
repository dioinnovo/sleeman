'use client'

import { useState } from 'react'
import {
  ShieldCheck, Beaker, FileCheck, AlertTriangle, CheckCircle,
  Clock, TrendingUp, Users, FileText, Download,
  Eye, Calendar, Award, AlertCircle, Info,
  Activity, BookOpen, Thermometer, Droplets, FlaskConical
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface QualityMetric {
  id: string
  category: 'brewing' | 'packaging' | 'safety' | 'environmental' | 'regulatory'
  name: string
  status: 'compliant' | 'at-risk' | 'non-compliant' | 'pending'
  score: number
  target: number
  lastAudit: Date
  nextAudit: Date
  description: string
  requirements: string[]
}

interface AuditItem {
  id: string
  title: string
  type: 'scheduled' | 'completed' | 'in-progress'
  auditor: string
  date: Date
  findings: number
  criticalFindings: number
  status: string
}

interface TrainingModule {
  id: string
  title: string
  category: string
  completionRate: number
  dueDate: Date
  mandatory: boolean
  duration: string
}

export default function QualityControlPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brewing' | 'packaging' | 'safety'>('all')

  const qualityMetrics: QualityMetric[] = [
    {
      id: '1',
      category: 'brewing',
      name: 'Fermentation Standards',
      status: 'compliant',
      score: 98,
      target: 95,
      lastAudit: new Date('2024-11-15'),
      nextAudit: new Date('2025-02-15'),
      description: 'Yeast health, temperature control, and fermentation consistency',
      requirements: ['Temperature Logs', 'Yeast Cell Counts', 'Gravity Readings', 'pH Monitoring', 'CO2 Levels']
    },
    {
      id: '2',
      category: 'brewing',
      name: 'Ingredient Quality Control',
      status: 'compliant',
      score: 96,
      target: 95,
      lastAudit: new Date('2024-11-15'),
      nextAudit: new Date('2025-02-15'),
      description: 'Malt, hops, and water quality verification',
      requirements: ['Supplier Certificates', 'Incoming Inspection', 'Storage Conditions', 'Traceability']
    },
    {
      id: '3',
      category: 'packaging',
      name: 'Fill Level & Carbonation',
      status: 'at-risk',
      score: 82,
      target: 85,
      lastAudit: new Date('2024-12-01'),
      nextAudit: new Date('2025-03-01'),
      description: 'Bottle/can fill accuracy and CO2 carbonation levels',
      requirements: ['Fill Volume Tests', 'CO2 Measurements', 'Seal Integrity', 'Label Accuracy']
    },
    {
      id: '4',
      category: 'safety',
      name: 'Food Safety (HACCP)',
      status: 'compliant',
      score: 94,
      target: 90,
      lastAudit: new Date('2024-10-01'),
      nextAudit: new Date('2025-04-01'),
      description: 'Hazard Analysis Critical Control Points compliance',
      requirements: ['CCP Monitoring', 'Sanitation Logs', 'Allergen Control', 'Pest Management']
    },
    {
      id: '5',
      category: 'environmental',
      name: 'Water Treatment & Discharge',
      status: 'compliant',
      score: 100,
      target: 100,
      lastAudit: new Date('2024-11-20'),
      nextAudit: new Date('2025-05-20'),
      description: 'Wastewater treatment and environmental compliance',
      requirements: ['Discharge Permits', 'Water Testing', 'Treatment Records', 'Environmental Reports']
    },
    {
      id: '6',
      category: 'regulatory',
      name: 'LCBO/Provincial Standards',
      status: 'compliant',
      score: 91,
      target: 90,
      lastAudit: new Date('2024-12-10'),
      nextAudit: new Date('2025-06-10'),
      description: 'Ontario and provincial liquor board compliance',
      requirements: ['Labeling', 'ABV Verification', 'Product Registration', 'Distribution Compliance']
    }
  ]

  const upcomingAudits: AuditItem[] = [
    {
      id: '1',
      title: 'Q1 Brewing Process Audit',
      type: 'scheduled',
      auditor: 'Master Brewers Association',
      date: new Date('2025-02-15'),
      findings: 0,
      criticalFindings: 0,
      status: 'Scheduled'
    },
    {
      id: '2',
      title: 'Annual HACCP Certification',
      type: 'in-progress',
      auditor: 'NSF International',
      date: new Date('2025-01-28'),
      findings: 2,
      criticalFindings: 0,
      status: 'In Progress'
    },
    {
      id: '3',
      title: 'Q4 Quality Control Review',
      type: 'completed',
      auditor: 'Internal QC Team',
      date: new Date('2024-12-01'),
      findings: 5,
      criticalFindings: 0,
      status: 'Completed'
    }
  ]

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Brewing Best Practices Certification',
      category: 'Production',
      completionRate: 87,
      dueDate: new Date('2025-03-30'),
      mandatory: true,
      duration: '4 hours'
    },
    {
      id: '2',
      title: 'Food Safety & Sanitation (HACCP)',
      category: 'Safety',
      completionRate: 92,
      dueDate: new Date('2025-04-15'),
      mandatory: true,
      duration: '2 hours'
    },
    {
      id: '3',
      title: 'Quality Testing Procedures',
      category: 'Quality',
      completionRate: 78,
      dueDate: new Date('2025-02-15'),
      mandatory: true,
      duration: '3 hours'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'at-risk': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'non-compliant': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle
      case 'at-risk': return AlertTriangle
      case 'non-compliant': return AlertCircle
      case 'pending': return Clock
      default: return Info
    }
  }

  const filteredMetrics = qualityMetrics.filter(metric =>
    selectedCategory === 'all' || metric.category === selectedCategory
  )

  // Calculate overall compliance score
  const overallScore = Math.round(
    qualityMetrics.reduce((acc, m) => acc + m.score, 0) / qualityMetrics.length
  )

  const stats = {
    overallCompliance: overallScore,
    compliantAreas: qualityMetrics.filter(m => m.status === 'compliant').length,
    atRiskAreas: qualityMetrics.filter(m => m.status === 'at-risk').length,
    pendingAudits: upcomingAudits.filter(a => a.type === 'scheduled').length,
    trainingCompletion: Math.round(trainingModules.reduce((acc, t) => acc + t.completionRate, 0) / trainingModules.length)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quality Control Dashboard"
        description="Brewing standards, quality metrics, and compliance monitoring"
        action={
          <button className="h-12 px-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors font-semibold">
            <Download size={20} />
            <span>Quality Report</span>
          </button>
        }
      />

      {/* Quality Score Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <ShieldCheck className="text-primary" size={20} />
            <span className={`text-xs font-semibold ${
              stats.overallCompliance >= 90 ? 'text-green-600' :
              stats.overallCompliance >= 80 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {stats.overallCompliance >= 90 ? 'Excellent' :
               stats.overallCompliance >= 80 ? 'Good' :
               'Needs Attention'}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.overallCompliance}%</p>
          <p className="text-xs text-muted-foreground mt-1">Overall Quality Score</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-600 dark:text-green-500" size={20} />
            <span className="text-xs text-green-600 dark:text-green-500 font-semibold">Compliant</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.compliantAreas}</p>
          <p className="text-xs text-muted-foreground mt-1">Passing Standards</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-yellow-600 dark:text-yellow-500" size={20} />
            <span className="text-xs text-yellow-600 dark:text-yellow-500 font-semibold">Monitor</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.atRiskAreas}</p>
          <p className="text-xs text-muted-foreground mt-1">At-Risk Areas</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-purple-600 dark:text-purple-500" size={20} />
            <span className="text-xs text-purple-600 dark:text-purple-500 font-semibold">Upcoming</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.pendingAudits}</p>
          <p className="text-xs text-muted-foreground mt-1">Pending Audits</p>
        </div>

        <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="text-blue-600 dark:text-blue-500" size={20} />
            <span className="text-xs text-blue-600 dark:text-blue-500 font-semibold">Training</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.trainingCompletion}%</p>
          <p className="text-xs text-muted-foreground mt-1">Training Complete</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-4 border border-border">
        <div className="flex gap-2 flex-wrap">
          {['all', 'brewing', 'packaging', 'safety'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as typeof selectedCategory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-accent border border-border'
              }`}
            >
              {category === 'all' ? 'All Categories' :
               category === 'brewing' ? 'Brewing Standards' :
               category === 'packaging' ? 'Packaging QC' :
               'Food Safety'}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMetrics.map((metric) => {
          const Icon = getStatusIcon(metric.status)

          return (
            <div key={metric.id} className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{metric.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(metric.status)}`}>
                  <Icon size={12} />
                  {metric.status.replace('-', ' ')}
                </span>
              </div>

              {/* Quality Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Quality Score</span>
                  <span className="text-sm font-bold text-foreground">{metric.score}% / {metric.target}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      metric.score >= metric.target ? 'bg-green-500' :
                      metric.score >= metric.target * 0.9 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Key Checks:</p>
                <div className="flex flex-wrap gap-1">
                  {metric.requirements.map((req, idx) => (
                    <span key={idx} className="px-2 py-1 bg-background text-xs rounded text-muted-foreground">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audit Schedule */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      Last audit: {metric.lastAudit.toLocaleDateString()}
                    </span>
                    <span className="text-muted-foreground">
                      Next audit: {metric.nextAudit.toLocaleDateString()}
                    </span>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Audit Schedule */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            Audit Schedule & Results
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Audit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Findings
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcomingAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{audit.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{audit.auditor}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm text-foreground">{audit.date.toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {audit.type === 'completed' || audit.type === 'in-progress' ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-foreground">{audit.findings} findings</span>
                        {audit.criticalFindings > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs rounded">
                            {audit.criticalFindings} critical
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      audit.type === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      audit.type === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      {audit.type === 'completed' ? 'View Report' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Training Compliance */}
      <div className="bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" />
          Quality Training Status
        </h2>

        <div className="space-y-3">
          {trainingModules.map((module) => (
            <div key={module.id} className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-foreground">{module.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{module.category}</span>
                    <span>•</span>
                    <span>{module.duration}</span>
                    <span>•</span>
                    <span>Due: {module.dueDate.toLocaleDateString()}</span>
                  </div>
                </div>
                {module.mandatory && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs rounded font-semibold">
                    Mandatory
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Completion</span>
                    <span className="text-xs font-bold text-foreground">{module.completionRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        module.completionRate === 100 ? 'bg-green-500' :
                        module.completionRate >= 80 ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${module.completionRate}%` }}
                    />
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Resources */}
      <div className="bg-gradient-to-r from-primary/20 to-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 border border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <Beaker size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Quality Control Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <FlaskConical size={16} />
              Lab Procedures
            </h3>
            <p className="text-sm text-muted-foreground">Standard testing protocols for gravity, pH, IBU, and microbiological analysis.</p>
          </div>

          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <Thermometer size={16} />
              Process Control
            </h3>
            <p className="text-sm text-muted-foreground">Temperature and timing guidelines for mashing, boiling, and fermentation.</p>
          </div>

          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <Droplets size={16} />
              Sanitation Standards
            </h3>
            <p className="text-sm text-muted-foreground">CIP procedures, cleaning schedules, and sanitation verification protocols.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
