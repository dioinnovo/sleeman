'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart3,
  Brain,
  Factory,
  Shield,
  Truck,
  Beaker,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  LineChart,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Barley, your AI brewing analyst, answers questions in natural language and provides instant insights from your production data.'
  },
  {
    icon: Factory,
    title: 'Production Monitoring',
    description: 'Track batch production across all lines in real-time. Monitor fermentation efficiency, yield rates, and capacity utilization.'
  },
  {
    icon: Beaker,
    title: 'Quality Control',
    description: 'Comprehensive quality testing with pH, ABV, gravity, and clarity monitoring. Catch issues before they become problems.'
  },
  {
    icon: Truck,
    title: 'Distribution Tracking',
    description: 'Manage shipments to LCBO, BC Liquor, and distributors nationwide. Track delivery performance and optimize routes.'
  },
  {
    icon: Shield,
    title: 'Compliance & HACCP',
    description: 'Automated compliance monitoring for CFIA, FDA, and provincial regulations. Stay audit-ready year-round.'
  },
  {
    icon: BarChart3,
    title: 'Revenue Analytics',
    description: 'Track revenue by product, region, and channel. Identify trends and optimize your product mix for maximum profitability.'
  }
]

const stats = [
  { value: '150+', label: 'Years of Brewing Heritage' },
  { value: '15', label: 'Beer Styles' },
  { value: '5', label: 'Production Lines' },
  { value: '99.2%', label: 'Quality Pass Rate' }
]

const capabilities = [
  'Natural language queries to your production database',
  'Real-time KPI dashboards with drill-down capability',
  'Automated quality anomaly detection',
  'Predictive maintenance for equipment',
  'Supply chain optimization recommendations',
  'Integration with Oracle ERP and PlantPAx SCADA'
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sleeman-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sleeman-dark/95 backdrop-blur-sm border-b border-sleeman-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/sleeman-logo-light.png"
                alt="Sleeman Breweries"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="text-lg font-bold text-sleeman-gold">BrewMind</span>
                <span className="text-sm text-gray-400 ml-2">by Sleeman</span>
              </div>
            </div>
            <Link href="/dashboard/assistant">
              <Button className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold">
                Launch Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sleeman-brown rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-sleeman-gold" />
                <span className="text-sm text-sleeman-gold-light">AI-Powered Brewery Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Meet <span className="text-sleeman-gold">Barley</span>,
                <br />
                Your AI Brewing Analyst
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ask questions about your brewery operations in plain English.
                Get instant insights from production, quality, inventory, and revenue data
                powered by advanced AI analytics.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/assistant">
                  <Button size="lg" className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold text-lg px-8">
                    Talk to Barley
                    <Brain className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="border-sleeman-brown hover:bg-sleeman-brown text-white text-lg px-8">
                    View Dashboard
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-sleeman-brown to-sleeman-dark rounded-2xl p-8 border border-sleeman-brown shadow-2xl">
                {/* Mock Chat Interface */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-sleeman-gold/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-sleeman-gold" />
                    </div>
                    <div className="bg-sleeman-dark/50 rounded-lg p-4 flex-1">
                      <p className="text-sm text-gray-300">
                        Hello! I&apos;m <span className="text-sleeman-gold font-semibold">Barley</span>, your AI brewing analyst.
                        Ask me anything about production, quality, inventory, or revenue.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-sleeman-gold/20 rounded-lg p-4 max-w-[80%]">
                      <p className="text-sm text-sleeman-gold-light">
                        What&apos;s our production volume by beer style this year?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-sleeman-gold/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-sleeman-gold" />
                    </div>
                    <div className="bg-sleeman-dark/50 rounded-lg p-4 flex-1">
                      <p className="text-sm text-gray-300 mb-3">
                        Here&apos;s your production breakdown by style:
                      </p>
                      <div className="space-y-2">
                        {[
                          { style: 'Honey Brown Lager', volume: '45,230 HL', pct: 85 },
                          { style: 'Cream Ale', volume: '38,450 HL', pct: 72 },
                          { style: 'Original Draught', volume: '32,100 HL', pct: 60 }
                        ].map((item) => (
                          <div key={item.style} className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-400">{item.style}</span>
                                <span className="text-sleeman-gold">{item.volume}</span>
                              </div>
                              <div className="h-2 bg-sleeman-dark rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-sleeman-gold rounded-full"
                                  style={{ width: `${item.pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-sleeman-gold/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sleeman-gold/5 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sleeman-brown/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-sleeman-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete Brewery <span className="text-sleeman-gold">Intelligence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From grain to glass, BrewMind gives you visibility into every aspect of your brewing operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-sleeman-brown/30 rounded-xl p-6 border border-sleeman-brown hover:border-sleeman-gold/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-sleeman-gold/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-sleeman-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sleeman-brown/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Powered by <span className="text-sleeman-gold">Advanced AI</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                BrewMind connects to your existing systems and makes your data accessible through natural conversation.
              </p>

              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sleeman-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Database, label: 'SQL/Oracle SQL', desc: 'Multi-dialect' },
                { icon: Brain, label: 'Claude AI', desc: 'Natural language' },
                { icon: LineChart, label: 'Analytics', desc: 'Visual insights' },
                { icon: Zap, label: 'Real-time', desc: 'Instant queries' }
              ].map((tech) => (
                <div
                  key={tech.label}
                  className="bg-sleeman-dark rounded-xl p-6 border border-sleeman-brown text-center"
                >
                  <tech.icon className="h-8 w-8 text-sleeman-gold mx-auto mb-3" />
                  <div className="font-semibold mb-1">{tech.label}</div>
                  <div className="text-sm text-gray-400">{tech.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Brewery Operations?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of brewery analytics with BrewMind&apos;s AI-powered insights.
            </p>
            <Link href="/dashboard/assistant">
              <Button size="lg" className="bg-sleeman-gold hover:bg-sleeman-gold-light text-sleeman-dark font-semibold text-lg px-12">
                Launch BrewMind
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-sleeman-brown">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/sleeman-logo-light.png"
              alt="Sleeman Breweries"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-sm text-gray-400">
              BrewMind by Sleeman Breweries Ltd. | A Sapporo Company
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Demo Application &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}
