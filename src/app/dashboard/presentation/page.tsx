'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  StickyNote,
  Building2,
  Bot,
  Network,
  Factory,
  Database,
  BarChart3,
  Shield,
  Cog,
  Clock,
  Brain,
  Wrench,
  Users,
  Rocket,
  Calendar,
  FileText,
  Key,
  UserCircle,
  CheckCircle,
  Circle,
  Mail,
  Phone,
  Globe,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'

// Slide data based on the presentation prompt
const slides = [
  {
    id: 1,
    title: 'Title',
    speakerNotes: "Thank you for your time today, Brian. We're excited to show you how AI can transform data accessibility across Sleeman's operations while respecting your existing infrastructure investments."
  },
  {
    id: 2,
    title: 'Who We Are',
    speakerNotes: "We've served enterprises across manufacturing, retail, financial services, and CPG for over a decade. You'll notice several names relevant to your industry—Labatt, Pernod Ricard, and others in beverage manufacturing."
  },
  {
    id: 3,
    title: 'AI Capabilities',
    speakerNotes: "We've organized our AI practice around six core capabilities. What makes us different is that we don't just build models—we build production systems that integrate with your existing infrastructure and meet enterprise governance requirements."
  },
  {
    id: 4,
    title: 'AI In Brewing',
    speakerNotes: "Your competitors are not standing still. AB InBev has invested heavily in AI across their 126 country operations. Heineken launched an AI-powered insights platform. The question for Sleeman is whether you want to be a fast follower or set the pace in the Canadian market."
  },
  {
    id: 5,
    title: 'Value Case',
    speakerNotes: "These aren't projections—they're verified results from brewery implementations. AB InBev achieved 60% improvement in their filtration process. McKinsey documents 20-50% downtime reduction across manufacturing. These are the benchmarks we work toward."
  },
  {
    id: 6,
    title: 'Meet Barley',
    speakerNotes: "This is Barley, the AI data analyst we built for Sleeman. The headline says it all—your team can get answers faster than the time it takes to write an email to IT. Let me show you how it works..."
  },
  {
    id: 7,
    title: 'How It Works',
    speakerNotes: "Brian, this architecture was designed with your environment in mind. We integrate with Oracle EBS R12, PlantPAx, and your other systems—we don't rip and replace. The governance layer ensures every query is logged and auditable, which I know is important for your PMO and for Sapporo reporting."
  },
  {
    id: 8,
    title: 'Investment Options',
    speakerNotes: "We offer two engagement models. The fractional AI team works well for organizations that want ongoing innovation support. The project-based approach is ideal if you want to start with a specific use case—like the data analyst agent we've demonstrated—and prove value before expanding."
  },
  {
    id: 9,
    title: 'Next Steps',
    speakerNotes: "The path forward is straightforward. We'll have a detailed scope of work to you within 48 hours of this meeting. Once approved, we can have the project kicked off within two weeks."
  },
  {
    id: 10,
    title: 'Availability',
    speakerNotes: "Brian, we're intentionally selective about the engagements we take on. We limit ourselves to one new enterprise project per month to ensure we can deliver the quality and attention your organization deserves. The January slot is currently available—I'd recommend we move quickly if this aligns with your priorities."
  }
]

// Client logos for slide 2
const clientLogos = [
  ['Indigo', 'Aramark', 'Aviva', 'Siemens', 'Apotex', 'CRH', 'Telus'],
  ['SiriusXM', 'Traffix', 'GSC', 'ARS', 'Arauco', 'Contrans', 'Héroux-Devtek'],
  ['Hyundai', 'City National Bank', 'Walter', 'BGO', 'LafargeHolcim', 'Compass', 'SNC-Lavalin'],
  ['Pernod Ricard', 'Labatt', 'Baker Hughes', 'Canada Goose', 'Deloitte', 'Rogers', 'Enercare'],
  ['Staples', 'Lupin', 'Steam Whistle', 'Greenfield', 'Grafton', 'Hanon Systems', 'Lectra']
]

const credentials = [
  { icon: Building2, metric: '10 Years in Operation' },
  { icon: Users, metric: '150+ Clients Served' },
  { icon: BarChart3, metric: '400+ BI Projects' },
  { icon: Globe, metric: '9 Products in Microsoft Marketplace' },
  { icon: Users, metric: '10+ Technology Partnerships' },
  { icon: Clock, metric: '10 Years with Longest Customer' }
]

const aiCapabilities = [
  {
    icon: Bot,
    title: 'Agentic AI & Multi-Agent Systems',
    tagline: 'Intelligent agents that execute, not just answer',
    details: ['Autonomous AI workflows', 'Multi-agent orchestration', 'Natural language interfaces']
  },
  {
    icon: Network,
    title: 'Knowledge Graphs & Enterprise Memory',
    tagline: 'One query across every system',
    details: ['Unified data fabric', 'Semantic search', 'Legacy system integration']
  },
  {
    icon: Factory,
    title: 'Digital Twins & Operational Intelligence',
    tagline: 'Real-time visibility across distributed operations',
    details: ['Facility modeling', 'Predictive optimization', 'Cross-site benchmarking']
  },
  {
    icon: Database,
    title: 'Data Engineering & Modernization',
    tagline: 'Unlock data trapped in legacy systems',
    details: ['Oracle EBS, SAP integration', 'Real-time pipelines', 'Lakehouse architecture']
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics & BI',
    tagline: 'Reports that write themselves',
    details: ['Executive dashboards', 'Natural language querying', 'Demand forecasting']
  },
  {
    icon: Shield,
    title: 'AI Governance & Compliance',
    tagline: 'Innovation with enterprise-grade controls',
    details: ['Query logging', 'Access controls', 'Audit trails']
  }
]

const valueMetrics = [
  {
    icon: Cog,
    number: '60%',
    label: 'increase in throughput',
    source: 'AB InBev + Google Cloud Case Study (2024)'
  },
  {
    icon: Clock,
    number: '20-50%',
    label: 'reduction in unplanned downtime',
    source: 'McKinsey "Transforming Manufacturing through Industry 4.0"'
  },
  {
    icon: Brain,
    number: '64%',
    label: 'faster insights',
    source: 'Industry Analytics Benchmark Studies'
  },
  {
    icon: Wrench,
    number: '15-25%',
    label: 'reduction in maintenance costs',
    source: 'Gartner Predictive Maintenance Report (2024)'
  }
]

const nextSteps = [
  { icon: FileText, title: 'Review & Approve SOW', detail: "We'll deliver a detailed scope within 48 hours" },
  { icon: CheckCircle, title: 'Sign SOW & Submit Deposit', detail: 'Lock in your project slot' },
  { icon: Calendar, title: 'Schedule Kick-Off Meeting', detail: 'Align teams and confirm timelines' },
  { icon: Key, title: 'Provide Cloud Credentials', detail: 'Secure access to relevant systems' },
  { icon: UserCircle, title: 'Identify Key Stakeholders', detail: 'Requirements sessions with business users' },
  { icon: Rocket, title: 'Week 1: Project Begins', detail: 'Discovery sprint kicks off' }
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Escape') {
        setIsFullscreen(false)
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen)
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(!showNotes)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, isFullscreen, showNotes])

  // Auto-play timer
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(nextSlide, 8000)
      return () => clearInterval(timer)
    }
  }, [isAutoPlaying, nextSlide])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Render individual slides
  const renderSlide = (slideIndex: number) => {
    switch (slideIndex) {
      case 0: // Title Slide
        return (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Subtle amber gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-transparent to-amber-600/5" />

            {/* Logo */}
            <div className="mb-12">
              <div className="text-2xl font-bold text-amber-500 tracking-wider">INNOVOCO</div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">
              AI Brewing Data Analyst
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-slate-300 mb-12">
              Innovoco × Sleeman Breweries
            </p>

            {/* Date */}
            <p className="text-lg text-slate-400">
              December 2025
            </p>
          </div>
        )

      case 1: // Who We Are
        return (
          <div className="h-full flex bg-gradient-to-br from-cream-50 to-white p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            {/* Main area - Client Logos */}
            <div className="flex-1 pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Who We Are</h2>

              {/* Client Logo Grid */}
              <div className="space-y-4">
                {clientLogos.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex flex-wrap gap-3">
                    {row.map((client, clientIndex) => (
                      <div
                        key={clientIndex}
                        className="px-4 py-2 bg-white/80 rounded-lg shadow-sm border border-slate-200 text-slate-700 text-sm font-medium"
                      >
                        {client}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Partnership Logos */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">Technology Partners</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  {['Microsoft Gold Partner', 'Qlik', 'Snowflake', 'Databricks', 'Talend', 'Informatica'].map((partner) => (
                    <span key={partner} className="px-3 py-1 bg-white rounded border border-slate-200">{partner}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Credentials */}
            <div className="w-72 bg-slate-800 text-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6 text-amber-400">Credentials</h3>
              <div className="space-y-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <cred.icon className="text-amber-400" size={20} />
                    <span className="text-sm">{cred.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2: // AI Capabilities
        return (
          <div className="h-full p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Enterprise AI Capabilities</h2>
            <p className="text-lg text-slate-600 mb-8">Transforming how operations leaders access and act on data</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <cap.icon className="text-amber-600" size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{cap.title}</h3>
                  <p className="text-sm text-amber-700 font-medium mb-3">{cap.tagline}</p>
                  <ul className="space-y-1">
                    {cap.details.map((detail, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1 h-1 bg-amber-400 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 3: // AI In Brewing
        return (
          <div className="h-full" style={{ backgroundColor: '#FEF3C7' }}>
            {/* Hero Image Banner */}
            <div className="h-48 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 relative">
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex flex-col justify-center px-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">AI In Brewing</h2>
                <p className="text-xl text-amber-100">Why leading breweries are adopting AI now</p>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Column 1 */}
              <div>
                <h3 className="text-xl font-bold text-amber-700 mb-4">AI Unlocks Advantage</h3>
                <ul className="space-y-3">
                  {[
                    'Real-time production optimization across facilities',
                    'Predictive quality control and batch consistency',
                    'Supply chain visibility from grain to glass',
                    'Self-service analytics for business users'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-xl font-bold text-amber-700 mb-4">First-Mover Opportunity</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    'AB InBev, Heineken, Molson Coors investing heavily',
                    '78% of enterprises now using AI (McKinsey 2025)',
                    'Canadian brewing market consolidation accelerating'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="w-2 h-2 mt-2 bg-amber-500 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-slate-800 text-white p-4 rounded-lg">
                  <p className="font-semibold text-lg">&quot;The question isn&apos;t whether to adopt AI—it&apos;s whether to lead or follow&quot;</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 4: // Value Case
        return (
          <div className="h-full p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">What Breweries Are Achieving with AI</h2>
            <p className="text-lg text-slate-600 mb-10">Verified results from industry implementations</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center"
                >
                  <div className="inline-flex p-3 rounded-full bg-amber-100 mb-4">
                    <metric.icon className="text-amber-600" size={28} />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">{metric.number}</p>
                  <p className="text-sm text-slate-700 font-medium mb-4">{metric.label}</p>
                  <p className="text-xs text-slate-500">{metric.source}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">Sources: McKinsey & Company, Gartner, Google Cloud/Pluto7 Case Studies</p>
            </div>
          </div>
        )

      case 5: // Meet Barley
        return (
          <div className="h-full grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: '#FEF3C7' }}>
            {/* Left Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">Introducing</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                <span className="text-amber-600">Barley</span> — Your AI Data Analyst
              </h2>
              <p className="text-xl text-slate-600 mb-8">Get your data quicker than sending an email</p>

              <ul className="space-y-4 mb-8">
                {[
                  'Ask questions in plain English',
                  'Get answers in seconds, not days',
                  'No SQL knowledge required',
                  'Full audit trail for compliance'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/dashboard/assistant"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors w-fit"
              >
                See Demo <ExternalLink size={18} />
              </a>
            </div>

            {/* Right Side - Screenshot mockup */}
            <div className="bg-slate-900 p-8 flex items-center justify-center">
              <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
                <div className="p-4 border-b border-slate-700 flex items-center gap-2">
                  <Brain className="text-amber-400" size={20} />
                  <span className="text-white font-medium">Barley AI</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-slate-700 rounded-lg p-3">
                    <p className="text-slate-300 text-sm">&quot;What was our production cost per hectoliter by facility last quarter?&quot;</p>
                  </div>
                  <div className="bg-amber-600/20 rounded-lg p-3 border border-amber-600/30">
                    <p className="text-amber-100 text-sm mb-2">Based on Q3 2024 data:</p>
                    <div className="bg-slate-900/50 rounded p-2 text-xs text-slate-300 font-mono">
                      <p>Guelph Brewery: $42.50/HL</p>
                      <p>Vernon Brewery: $45.20/HL</p>
                      <p>Average: $43.85/HL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 6: // How It Works
        return (
          <div className="h-full p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Enterprise-Grade Architecture</h2>
            <p className="text-lg text-slate-600 mb-8">Built on your existing infrastructure</p>

            <div className="flex gap-8">
              {/* Architecture Diagram */}
              <div className="flex-1 space-y-4">
                {/* Data Integration Layer */}
                <div className="bg-white rounded-xl p-4 border-2 border-slate-300">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Data Integration Layer</p>
                  <div className="flex flex-wrap gap-3">
                    {['Oracle EBS R12', 'PlantPAx Historian', 'Workday HR', 'FactoryTalk Brew'].map((sys) => (
                      <span key={sys} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 font-medium">{sys}</span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <ChevronRight className="text-amber-500 rotate-90" size={32} />
                </div>

                {/* AI Agent Layer */}
                <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300">
                  <p className="text-xs text-amber-700 uppercase tracking-wider mb-2">AI Agent Orchestration</p>
                  <p className="text-sm text-amber-800">LangGraph • Multi-Agent Reasoning • RAG Pipeline</p>
                </div>

                <div className="flex justify-center">
                  <ChevronRight className="text-amber-500 rotate-90" size={32} />
                </div>

                {/* Governance Layer */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Governance & Audit Layer</p>
                  <p className="text-sm text-slate-300">Query Logging • Access Controls • Compliance Tracking</p>
                </div>

                <div className="flex justify-center">
                  <ChevronRight className="text-white rotate-90" size={32} />
                </div>

                {/* Executive Reporting */}
                <div className="bg-emerald-100 rounded-xl p-4 border-2 border-emerald-300">
                  <p className="text-xs text-emerald-700 uppercase tracking-wider mb-2">Executive Reporting</p>
                  <p className="text-sm text-emerald-800">Natural Language Queries • Dashboards • Sapporo-Ready Reports</p>
                </div>
              </div>

              {/* Right Side Callout */}
              <div className="w-72">
                <div className="bg-slate-800 text-white rounded-xl p-6 mb-6">
                  <p className="text-xl font-bold text-amber-400 mb-2">You architect the transformation.</p>
                  <p className="text-xl font-bold">We build the engine.</p>
                </div>

                <div className="space-y-3">
                  {[
                    'Works with your existing Oracle and PlantPAx investments',
                    'Every query logged for compliance and audit',
                    'Access controls respect your existing permissions',
                    'Executive reporting designed for Sapporo visibility'
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={16} />
                      <p className="text-sm text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 7: // Investment Options
        return (
          <div className="h-full p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Engagement Models</h2>
            <p className="text-lg text-slate-600 mb-10">Flexible options to match your needs</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1: Fractional AI Team */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <Users className="text-amber-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Fractional AI Team</h3>
                    <p className="text-sm text-slate-500">Ongoing Partnership</p>
                  </div>
                </div>

                <p className="text-amber-600 font-medium mb-4">Monthly Retainer</p>

                <ul className="space-y-2 mb-6">
                  {[
                    'Dedicated AI engineer allocation',
                    'Monthly strategy sessions',
                    'Priority support & maintenance',
                    'Continuous improvement sprints',
                    'All AI initiatives covered'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="text-emerald-600" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Best For</p>
                  <p className="text-sm text-slate-700">Organizations building long-term AI capabilities</p>
                </div>

                <div className="mt-4 p-3 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium">Investment: [To be discussed]</p>
                </div>
              </div>

              {/* Card 2: Project-Based */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <Rocket className="text-emerald-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Project-Based Engagement</h3>
                    <p className="text-sm text-slate-500">Defined Scope</p>
                  </div>
                </div>

                <p className="text-emerald-600 font-medium mb-4">Fixed Project</p>

                <ul className="space-y-2 mb-6">
                  {[
                    'Discovery & requirements (2 weeks)',
                    'Build & integration (8-10 weeks)',
                    'Deployment & testing (2 weeks)',
                    'Training & documentation',
                    '30-day post-launch support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="text-emerald-600" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Timeline</p>
                  <p className="text-sm text-slate-700">POC to production in 12-16 weeks</p>
                </div>

                <div className="mt-4 p-3 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium">Investment: [To be discussed]</p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">Both models include full governance documentation and PMO reporting</p>
          </div>
        )

      case 8: // Next Steps
        return (
          <div className="h-full p-8 md:p-12" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Your Path to AI-Powered Insights</h2>
            <p className="text-lg text-slate-600 mb-12">A clear roadmap from today to production</p>

            <div className="max-w-5xl mx-auto">
              {/* Timeline */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4, 5, 6].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">
                      {step}
                    </div>
                    {index < 5 && (
                      <div className="w-16 md:w-24 h-1 bg-amber-300" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-md border border-slate-200"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 w-fit mb-3">
                      <step.icon className="text-amber-600" size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600">{step.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 9: // Availability
        return (
          <div className="h-full p-8 md:p-12 flex flex-col items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 text-center">We&apos;re Selective About Partnerships</h2>
            <p className="text-lg text-slate-600 mb-12 text-center">To ensure quality, we take on one new enterprise engagement per month</p>

            {/* Calendar Visual */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 w-full max-w-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-500">
                  <CheckCircle className="text-emerald-600" size={28} />
                  <div>
                    <p className="font-bold text-slate-800">January 2026 (Week 2)</p>
                    <p className="text-emerald-700 font-medium">Available</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-300">
                  <Circle className="text-amber-500" size={28} fill="#F59E0B" />
                  <div>
                    <p className="font-bold text-slate-800">February 2026</p>
                    <p className="text-amber-700">Tentative (in discussions)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Circle className="text-slate-400" size={28} />
                  <div>
                    <p className="font-bold text-slate-800">March 2026</p>
                    <p className="text-slate-500">Open</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold text-slate-800">
                Let&apos;s discuss how Sleeman can secure the January slot.
              </p>
            </div>

            {/* Contact Information */}
            <div className="text-center space-y-2">
              <p className="text-xl font-bold text-amber-700">Diostenes De La Hoz</p>
              <p className="text-slate-600">Head of AI & Automation</p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={18} />
                  <span>dio@innovoco.com</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe size={18} />
                  <span>innovoco.com</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-full'} flex flex-col`}>
      {/* Slide Container */}
      <div className="flex-1 relative overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {renderSlide(currentSlide)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Speaker Notes Panel */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-800 text-white p-4 border-t border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <StickyNote size={16} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Speaker Notes</span>
            </div>
            <p className="text-sm text-slate-300">{slides[currentSlide].speakerNotes}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Slide Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-amber-500 w-6'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Current Slide Info */}
          <div className="text-slate-400 text-sm">
            Slide {currentSlide + 1} of {slides.length} — <span className="text-white">{slides[currentSlide].title}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isAutoPlaying ? 'Pause Auto-play' : 'Auto-play'}
            >
              {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-2 rounded-lg hover:bg-slate-800 transition-colors ${showNotes ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
              title="Toggle Speaker Notes (N)"
            >
              <StickyNote size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="bg-slate-950 px-4 py-2 text-xs text-slate-500 text-center">
        Keyboard: ← → Navigate • Space Next • N Notes • F Fullscreen • Esc Exit Fullscreen
      </div>
    </div>
  )
}
