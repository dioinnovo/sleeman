'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Brain,
  BarChart3,
  Beaker,
  Truck,
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle2,
  MessageSquare,
  Database,
  LineChart,
  Factory,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const demoSteps = [
  {
    id: 1,
    title: 'Meet Barley, Your AI Analyst',
    description: 'Barley is an AI-powered brewing analyst that understands natural language queries about your brewery operations.',
    icon: Brain,
    features: [
      'Ask questions in plain English',
      'Get instant insights from your data',
      'No SQL knowledge required',
      'Contextual follow-up suggestions'
    ],
    cta: 'Try Barley',
    link: '/dashboard/assistant',
    preview: {
      type: 'chat',
      messages: [
        { role: 'user', text: "What's our quality pass rate this month?" },
        { role: 'ai', text: "Your quality pass rate for this month is 99.2%, up 1.3% from last month. The highest performing style is Honey Brown Lager at 99.8%." }
      ]
    }
  },
  {
    id: 2,
    title: 'Real-Time Production Dashboard',
    description: 'Monitor production volume, equipment utilization, and batch status across all production lines in real-time.',
    icon: Factory,
    features: [
      '6 key performance indicators',
      'Production volume trends (12 months)',
      'Beer style distribution analysis',
      'Revenue tracking by product'
    ],
    cta: 'View Dashboard',
    link: '/dashboard',
    preview: {
      type: 'kpis',
      metrics: [
        { label: 'Production Volume', value: '145.2k HL', change: '+12.5%' },
        { label: 'Quality Pass Rate', value: '99.2%', change: '+2.1%' },
        { label: 'Equipment Utilization', value: '87.3%', change: '+5.3%' },
        { label: 'Revenue MTD', value: '$4.2M', change: '+8.7%' }
      ]
    }
  },
  {
    id: 3,
    title: 'Quality Control & Compliance',
    description: 'Track quality tests, HACCP compliance, and regulatory audits with automated monitoring and alerts.',
    icon: Beaker,
    features: [
      'pH, ABV, gravity, clarity testing',
      'HACCP compliance monitoring',
      'CFIA and FDA audit readiness',
      'Issue tracking and resolution'
    ],
    cta: 'View Quality Control',
    link: '/dashboard/compliance',
    preview: {
      type: 'quality',
      tests: [
        { name: 'pH Level', status: 'pass', value: '4.2', target: '4.0-4.5' },
        { name: 'ABV', status: 'pass', value: '5.0%', target: '4.8-5.2%' },
        { name: 'Clarity', status: 'pass', value: '98.5', target: '>95' }
      ]
    }
  },
  {
    id: 4,
    title: 'Distribution & Logistics',
    description: 'Track shipments to LCBO, BC Liquor, and distributors nationwide with real-time delivery performance.',
    icon: Truck,
    features: [
      '14 major distributors tracked',
      'Real-time shipment status',
      'On-time delivery metrics',
      'Regional performance analysis'
    ],
    cta: 'View Distribution',
    link: '/dashboard/distribution',
    preview: {
      type: 'distribution',
      shipments: [
        { distributor: 'LCBO Ontario', status: 'In Transit', eta: '2 days' },
        { distributor: 'BC Liquor', status: 'Delivered', eta: 'Complete' },
        { distributor: 'Alberta Gaming', status: 'Processing', eta: '5 days' }
      ]
    }
  },
  {
    id: 5,
    title: 'SQL-Powered Analytics',
    description: 'Barley translates your questions into optimized SQL queries against a PostgreSQL database with 15 brewery tables.',
    icon: Database,
    features: [
      '23 pre-built query templates',
      '12 months of historical data',
      'Real-time query execution',
      'Visual charts and data tables'
    ],
    cta: 'Ask Barley',
    link: '/dashboard/assistant',
    preview: {
      type: 'sql',
      query: 'SELECT style_name, SUM(volume_liters) as total\nFROM production_batches\nGROUP BY style_name\nORDER BY total DESC',
      resultCount: '8 rows'
    }
  }
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = demoSteps[currentStep]

  return (
    <div className="min-h-screen bg-sleeman-dark text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-sleeman-dark/95 backdrop-blur-sm border-b border-sleeman-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/sleeman-logo-light.png"
                alt="Sleeman Breweries"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="text-lg font-bold text-sleeman-gold">BrewMind</span>
                <span className="text-sm text-gray-400 ml-2">Demo</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {demoSteps.length}
              </span>
              <Link href="/dashboard/assistant">
                <Button className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold">
                  Launch Full Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {demoSteps.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    index <= currentStep ? 'text-sleeman-gold' : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                      index < currentStep
                        ? 'bg-sleeman-gold border-sleeman-gold text-sleeman-dark'
                        : index === currentStep
                        ? 'border-sleeman-gold text-sleeman-gold'
                        : 'border-gray-600 text-gray-500'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="hidden md:inline">{s.title.split(',')[0]}</span>
                </button>
              ))}
            </div>
            <div className="h-1 bg-sleeman-brown rounded-full overflow-hidden">
              <div
                className="h-full bg-sleeman-gold transition-all duration-500"
                style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left: Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-sleeman-gold/20 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-sleeman-gold" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{step.title}</h1>
                      <p className="text-gray-400 mt-1">{step.description}</p>
                    </div>
                  </div>

                  <Card className="bg-sleeman-brown/30 border-sleeman-brown">
                    <CardHeader>
                      <CardTitle className="text-sleeman-gold">Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {step.features.map((feature, index) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 text-sleeman-gold flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Link href={step.link}>
                    <Button size="lg" className="w-full bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold">
                      {step.cta}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Right: Preview */}
                <Card className="bg-sleeman-brown/20 border-sleeman-brown overflow-hidden">
                  <CardHeader className="border-b border-sleeman-brown">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Play className="h-5 w-5 text-sleeman-gold" />
                      Live Preview
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Interactive demonstration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {step.preview.type === 'chat' && (
                      <div className="space-y-4">
                        {step.preview.messages.map((msg, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                          >
                            {msg.role === 'ai' && (
                              <div className="w-8 h-8 rounded-full bg-sleeman-gold/20 flex items-center justify-center flex-shrink-0">
                                <Brain className="h-4 w-4 text-sleeman-gold" />
                              </div>
                            )}
                            <div
                              className={`rounded-lg p-4 max-w-[80%] ${
                                msg.role === 'user'
                                  ? 'bg-sleeman-gold/20 text-sleeman-gold-light'
                                  : 'bg-sleeman-dark/50 text-gray-300'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.preview.type === 'kpis' && (
                      <div className="grid grid-cols-2 gap-4">
                        {step.preview.metrics.map((metric, index) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-sleeman-dark/50 rounded-lg p-4"
                          >
                            <div className="text-sm text-gray-400">{metric.label}</div>
                            <div className="text-2xl font-bold text-white mt-1">{metric.value}</div>
                            <div className="text-sm text-green-400 mt-1">{metric.change}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.preview.type === 'quality' && (
                      <div className="space-y-4">
                        {step.preview.tests.map((test, index) => (
                          <motion.div
                            key={test.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-center justify-between bg-sleeman-dark/50 rounded-lg p-4"
                          >
                            <div>
                              <div className="font-medium">{test.name}</div>
                              <div className="text-sm text-gray-400">Target: {test.target}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-sleeman-gold">{test.value}</div>
                              <div className="flex items-center gap-1 text-green-400 text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                {test.status.toUpperCase()}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.preview.type === 'distribution' && (
                      <div className="space-y-4">
                        {step.preview.shipments.map((shipment, index) => (
                          <motion.div
                            key={shipment.distributor}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-center justify-between bg-sleeman-dark/50 rounded-lg p-4"
                          >
                            <div>
                              <div className="font-medium">{shipment.distributor}</div>
                              <div className="text-sm text-gray-400">ETA: {shipment.eta}</div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                shipment.status === 'Delivered'
                                  ? 'bg-green-500/20 text-green-400'
                                  : shipment.status === 'In Transit'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {shipment.status}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.preview.type === 'sql' && (
                      <div className="space-y-4">
                        <div className="bg-sleeman-dark rounded-lg p-4 font-mono text-sm">
                          <div className="text-gray-400 mb-2">-- Generated SQL Query</div>
                          <div className="text-sleeman-gold-light whitespace-pre-wrap">
                            {step.preview.query}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Query executed successfully</span>
                          <span className="text-sleeman-gold">{step.preview.resultCount} returned</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm">Execution time: 6ms</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-sleeman-brown hover:bg-sleeman-brown text-white disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < demoSteps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/dashboard/assistant">
                <Button className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold">
                  Start Using BrewMind
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
