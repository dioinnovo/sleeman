'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Send,
  ChevronDown,
  ArrowUp,
  Database,
  BarChart3,
  TrendingUp,
  Code,
  Info
} from 'lucide-react'
import SiriOrb from '@/components/ui/siri-orb'
import SimpleMarkdownMessage from '@/components/ui/simple-markdown-message'
import { ThinkingSteps, type ThinkingStep } from '@/components/ui/thinking-steps'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { getFriendlyColumnName } from '@/lib/columnMapping'

/**
 * Format a numeric value based on its column name
 * - Currency columns (revenue, cost, price, amount, value) get $ prefix
 * - Percentage columns get % suffix
 * - All numbers get comma separators
 * - Decimals are limited to 2 places for currency/percentages
 */
function formatCellValue(value: any, columnName: string): string {
  if (value === null || value === undefined) return '—'

  // Try to parse numeric strings (PostgreSQL often returns numbers as strings)
  let numValue: number
  if (typeof value === 'number') {
    numValue = value
  } else if (typeof value === 'string') {
    // Check if it looks like a number (possibly with decimal)
    const parsed = parseFloat(value)
    if (!isNaN(parsed) && /^-?\d*\.?\d+$/.test(value.trim())) {
      numValue = parsed
    } else {
      // Not a numeric string, return as-is
      return value
    }
  } else {
    return String(value)
  }

  const colLower = columnName.toLowerCase()

  // Currency columns
  const isCurrency =
    colLower.includes('revenue') ||
    colLower.includes('cost') ||
    colLower.includes('price') ||
    colLower.includes('amount') ||
    colLower.includes('value') ||
    colLower.includes('total') && (colLower.includes('$') || colLower.includes('dollar')) ||
    colLower.includes('sales') ||
    colLower.includes('profit') ||
    colLower.includes('expense') ||
    colLower.includes('budget')

  // Percentage columns
  const isPercentage =
    colLower.includes('percent') ||
    colLower.includes('rate') ||
    colLower.includes('efficiency') ||
    colLower.includes('utilization') ||
    colLower.includes('yield') ||
    colLower.includes('variance') ||
    colLower.endsWith('_pct') ||
    colLower.endsWith('_%')

  if (isCurrency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(numValue)
  }

  if (isPercentage) {
    // If value is already in percentage form (e.g., 85.5 for 85.5%)
    return `${numValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
  }

  // Default: just add comma separators
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

/**
 * Format chart axis tick values (abbreviated for large numbers)
 * e.g., 1,000,000 → 1M, 50,000 → 50K
 */
function formatAxisTick(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  }
  return value.toLocaleString('en-US')
}

/**
 * Format chart tooltip values with full formatting
 */
function formatTooltipValue(value: any, name: string): [string, string] {
  const formattedValue = formatCellValue(value, name)
  const formattedName = getFriendlyColumnName(name)
  return [formattedValue, formattedName]
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sqlQuery?: string
  oracleSqlQuery?: string  // Oracle SQL translation for demo purposes
  results?: any[]
  rowCount?: number
  queryTime?: number
  followUpQuestions?: string[]
  chartData?: any[]
  thinkingSteps?: ThinkingStep[]
}

const QUICK_QUESTIONS = [
  // Production & Operations
  "What is our production volume by beer style over the past 12 months?",
  "Compare fermentation efficiency across production lines",
  "What is the production line downtime and cost impact?",
  "Show me monthly production trends",

  // Quality Control & Efficiency
  "What are the batch failure rates by beer style?",
  "Show me quality test variance from expected values",
  "What are the most common quality issues and resolution times?",
  "Which batches have the highest quality scores?",

  // Inventory & Supply Chain
  "Show me material usage trends and costs",
  "What is the supplier reliability and on-time delivery rate?",
  "What materials are below reorder level?",

  // Strategic Planning & Distribution
  "Identify our top distributors by volume and revenue",
  "What are our top products by revenue?",
  "Show me capacity utilization by production line",
  "What are the waste rates by production line?"
]

export default function SQLAnalyticsChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null)
  const [expandedOracleQuery, setExpandedOracleQuery] = useState<string | null>(null)
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([])
  const [streamingContent, setStreamingContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const latestAssistantMessageRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputValue])

  // Auto-scroll to latest message - use 'end' to keep at bottom without jumping
  useEffect(() => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [messages, thinkingSteps, streamingContent])

  /**
   * Process SSE stream events
   */
  const processStreamEvent = useCallback((event: string, data: any) => {
    switch (event) {
      case 'thinking':
        setThinkingSteps(prev => {
          const existingIndex = prev.findIndex(s =>
            s.step === data.step || s.step === data.step.replace('-done', '')
          )

          if (existingIndex >= 0) {
            // Update existing step
            const updated = [...prev]
            updated[existingIndex] = {
              ...updated[existingIndex],
              message: data.message,
              status: data.done ? 'complete' : 'active',
              timestamp: data.done ? Date.now() : undefined
            }
            return updated
          }

          // Add new step
          return [...prev, {
            id: `${data.step}-${Date.now()}`,
            step: data.step,
            message: data.message,
            icon: data.icon || 'analyze',
            status: data.done ? 'complete' : 'active',
            timestamp: data.done ? Date.now() : undefined
          }]
        })
        break

      case 'text-delta':
        setStreamingContent(prev => prev + data.textDelta)
        break

      case 'tool-call':
        // Could display tool calls in the UI if desired
        console.log('Tool call:', data)
        break

      case 'tool-result':
        // Could display tool results in the UI if desired
        console.log('Tool result:', data)
        break

      case 'error':
        setThinkingSteps(prev => prev.map(s =>
          s.step === data.step
            ? { ...s, status: 'error' as const, message: data.message }
            : s
        ))
        break

      case 'data':
        // Final data received - will be handled in handleSendStreaming
        break

      case 'finish':
        // Stream complete
        break
    }
  }, [])

  /**
   * Send message with streaming support
   */
  const handleSendStreaming = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    if (!text) {
      setInputValue('')
    }

    // Reset state
    setThinkingSteps([])
    setStreamingContent('')

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsTyping(true)

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/sql-agent-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageText,
          responseMode: 'quick'
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''
      let finalData: any = null
      let accumulatedContent = '' // Track streaming content locally for reliable capture

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE events
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        let currentEvent = ''
        let currentData = ''

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7)
          } else if (line.startsWith('data: ')) {
            currentData = line.slice(6)

            if (currentEvent && currentData) {
              try {
                const parsedData = JSON.parse(currentData)

                // Save final data for message creation
                if (currentEvent === 'data') {
                  finalData = parsedData
                } else if (currentEvent === 'text-delta') {
                  // Accumulate text locally AND update React state for live display
                  accumulatedContent += parsedData.textDelta
                  processStreamEvent(currentEvent, parsedData)
                } else {
                  processStreamEvent(currentEvent, parsedData)
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e)
              }

              currentEvent = ''
              currentData = ''
            }
          }
        }
      }

      // Create assistant message from final data
      if (finalData) {
        const queryResults = finalData.queryResults
        const columns = queryResults?.columns || []
        const rows = queryResults?.rows || []
        const rowCount = rows.length

        // Convert rows to objects for table/chart display
        let resultsAsObjects: any[] = []
        if (columns.length > 0 && rows.length > 0) {
          resultsAsObjects = rows.map((row: any[]) => {
            const obj: any = {}
            columns.forEach((col: string, idx: number) => {
              obj[col] = row[idx]
            })
            return obj
          })
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: accumulatedContent || (rowCount > 0
            ? `Found ${rowCount} results`
            : 'No results found for this query.'),
          timestamp: new Date(),
          sqlQuery: finalData.sqlQuery,
          oracleSqlQuery: finalData.oracleSqlQuery,  // Oracle SQL translation for demo
          results: resultsAsObjects,
          rowCount: rowCount,
          followUpQuestions: finalData.followUpQuestions,
          chartData: finalData.chartData,
          thinkingSteps: [...thinkingSteps]
        }

        setMessages([...newMessages, assistantMessage])
      }

      setIsTyping(false)
      setThinkingSteps([])
      setStreamingContent('')

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted')
        return
      }

      console.error('Error calling streaming SQL agent:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to the database. Please ensure the database is running.',
        timestamp: new Date(),
        followUpQuestions: [
          'What is our production volume by beer style?',
          'Show me the top distributors',
          'What are the batch failure rates?'
        ]
      }

      setMessages([...newMessages, errorMessage])
      setIsTyping(false)
      setThinkingSteps([])
      setStreamingContent('')
    }
  }

  /**
   * Legacy non-streaming send (fallback)
   */
  const handleSendNonStreaming = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    if (!text) {
      setInputValue('')
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsTyping(true)

    try {
      const response = await fetch('/api/sql-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageText
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Handle API errors
      if (!data.success && data.error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.error,
          timestamp: new Date(),
          followUpQuestions: data.followUpQuestions
        }
        setMessages([...newMessages, errorMessage])
        setIsTyping(false)
        return
      }

      const queryResults = data.queryResults
      const columns = queryResults?.columns || []
      const rows = queryResults?.rows || []
      const rowCount = rows.length
      const executionTimeMs = data.metadata?.executionTimeMs

      let resultsAsObjects: any[] = []
      if (columns.length > 0 && rows.length > 0) {
        resultsAsObjects = rows.map((row: any[]) => {
          const obj: any = {}
          columns.forEach((col: string, idx: number) => {
            obj[col] = row[idx]
          })
          return obj
        })
      }

      let chartData: any[] | undefined = undefined
      if (resultsAsObjects.length > 0) {
        chartData = prepareChartData(resultsAsObjects) ?? undefined
      }

      const finalChartData = data.chartData || chartData

      const contentText = data.response ||
        (rowCount > 0
          ? `Found ${rowCount} results${executionTimeMs ? ` in ${executionTimeMs}ms` : ''}`
          : 'No results found for this query.')

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: contentText,
        timestamp: new Date(),
        sqlQuery: data.sqlQuery,
        results: resultsAsObjects,
        rowCount: rowCount,
        queryTime: executionTimeMs,
        followUpQuestions: data.followUpQuestions,
        chartData: finalChartData
      }

      setMessages([...newMessages, assistantMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('Error calling SQL agent:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to the database. Please ensure the database is running.',
        timestamp: new Date(),
        followUpQuestions: [
          'What is our production volume by beer style?',
          'Show me the top distributors',
          'What are the batch failure rates?'
        ]
      }

      setMessages([...newMessages, errorMessage])
      setIsTyping(false)
    }
  }

  // Use streaming by default
  const handleSend = handleSendStreaming

  const prepareChartData = (results: any[]) => {
    if (!results || results.length === 0) return null

    const firstRow = results[0]
    const keys = Object.keys(firstRow)

    const numericKeys = keys.filter(key => typeof firstRow[key] === 'number')

    if (numericKeys.length === 0) return null

    return results.slice(0, 10)
  }

  const renderChart = (chartData: any) => {
    if (!chartData) return null

    const isChartJsFormat = chartData.type && chartData.labels && chartData.datasets

    if (isChartJsFormat) {
      const { labels, datasets, type } = chartData
      if (!labels || labels.length === 0 || !datasets || datasets.length === 0) return null

      const rechartsData = labels.map((label: string, index: number) => {
        const dataPoint: any = { label }
        datasets.forEach((dataset: any) => {
          dataPoint[dataset.label] = dataset.data[index]
        })
        return dataPoint
      })

      const primaryDataset = datasets[0]
      if (!primaryDataset) return null

      if (type === 'line') {
        return (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rechartsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" angle={-45} textAnchor="end" height={100} fontSize={12} />
                <YAxis fontSize={12} tickFormatter={formatAxisTick} />
                <RechartsTooltip formatter={formatTooltipValue} />
                <Legend />
                {datasets.map((dataset: any, idx: number) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={dataset.label}
                    stroke={idx === 0 ? "#5fd063" : "#f59e0b"}
                    strokeWidth={2}
                    dot={{ fill: idx === 0 ? "#5fd063" : "#f59e0b" }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      }

      return (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rechartsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis fontSize={12} tickFormatter={formatAxisTick} />
              <RechartsTooltip formatter={formatTooltipValue} />
              <Legend />
              {datasets.map((dataset: any, idx: number) => (
                <Bar
                  key={idx}
                  dataKey={dataset.label}
                  fill={idx === 0 ? "#5fd063" : "#f59e0b"}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    }

    const data = chartData as any[]
    if (!Array.isArray(data) || data.length === 0) return null

    const firstRow = data[0]
    if (!firstRow || typeof firstRow !== 'object') return null

    const keys = Object.keys(firstRow)

    const labelKey = keys.find(k =>
      k.toLowerCase().includes('name') ||
      k.toLowerCase().includes('month') ||
      k.toLowerCase().includes('course') ||
      k.toLowerCase().includes('carrier') ||
      k.toLowerCase().includes('status')
    ) || keys[0]

    const numericKeys = keys.filter(key => typeof firstRow[key] === 'number')

    if (numericKeys.length === 0) return null

    const primaryMetric = numericKeys.find(k =>
      k.toLowerCase().includes('revenue') ||
      k.toLowerCase().includes('total') ||
      k.toLowerCase().includes('shipment') ||
      k.toLowerCase().includes('count')
    ) || numericKeys[0]

    return (
      <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={labelKey} angle={-45} textAnchor="end" height={100} fontSize={12} />
            <YAxis fontSize={12} tickFormatter={formatAxisTick} />
            <RechartsTooltip formatter={formatTooltipValue} />
            <Legend formatter={(value) => getFriendlyColumnName(value)} />
            <Bar dataKey={primaryMetric} fill="#5fd063" name={getFriendlyColumnName(primaryMetric)} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderTable = (results: any[]) => {
    if (!results || results.length === 0) {
      return <p className="text-sm text-muted-foreground">No results found</p>
    }

    const columns = Object.keys(results[0])

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                >
                  {getFriendlyColumnName(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {results.map((row, idx) => (
              <tr key={idx} className="hover:bg-accent">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm text-foreground whitespace-nowrap">
                    {formatCellValue(row[col], col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-muted to-background overflow-hidden">
      {/* Top Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 min-h-[4rem] bg-background/80 backdrop-blur-md border-b border-border rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            BrewMind Analytics
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            AI Ready
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">12 Months Data</span>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-start pt-2 sm:pt-4 text-center space-y-4 sm:space-y-6">
            <div className="w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
              <div className="sm:hidden">
                <SiriOrb size="80px" animationDuration={6} isActive={true} />
              </div>
              <div className="hidden sm:block">
                <SiriOrb size="128px" animationDuration={6} isActive={true} />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Hi, I&apos;m <span className="text-primary">Barley</span>!
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm px-4 sm:px-0">
                Your AI Brewing Data Analyst. Ask me anything about production, quality, inventory, or revenue.
              </p>
            </div>

            {/* Quick Questions */}
            <div className="max-w-2xl w-full">
              <p className="text-xs text-muted-foreground mb-3">Quick Questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(question)}
                    className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-accent transition-all group"
                  >
                    <p className="text-sm text-foreground font-medium">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages View */
          <div className="space-y-4 max-w-4xl mx-auto pb-8">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  ref={message.role === 'assistant' && index === messages.length - 1
                    ? latestAssistantMessageRef
                    : null}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] ${message.role === 'user' ? 'order-last' : ''}`}>
                    {/* Message bubble */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground shadow-sm'
                    }`}>
                      {message.role === 'user' ? (
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      ) : (
                        <SimpleMarkdownMessage content={message.content} className="text-sm" />
                      )}
                    </div>

                    {/* Assistant-specific content */}
                    {message.role === 'assistant' && (
                      <div className="mt-3 space-y-3">
                        {/* Visualization */}
                        {message.chartData && (
                          <div className="bg-card rounded-lg border border-border p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <BarChart3 className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium text-foreground">Visualization</span>
                              <span className="text-xs text-muted-foreground">{message.rowCount} results</span>
                            </div>
                            {renderChart(message.chartData)}
                          </div>
                        )}

                        {/* Expandable SQL Query */}
                        {message.sqlQuery && (
                          <div className="bg-card rounded-lg border border-border">
                            <button
                              onClick={() => setExpandedQuery(expandedQuery === message.id ? null : message.id)}
                              className="w-full px-4 py-2 flex items-center justify-between hover:bg-accent transition-colors rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                  PostgreSQL Query
                                </span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 text-muted-foreground transition-transform",
                                  expandedQuery === message.id && "transform rotate-180"
                                )}
                              />
                            </button>
                            {expandedQuery === message.id && (
                              <div className="px-4 pb-4">
                                <pre className="text-xs bg-muted text-primary p-3 rounded overflow-x-auto">
                                  <code>{message.sqlQuery}</code>
                                </pre>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(message.sqlQuery!)
                                  }}
                                  className="mt-2 text-xs text-primary hover:text-primary/80"
                                >
                                  Copy
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Expandable Oracle SQL Query (Demo) */}
                        {message.oracleSqlQuery && (
                          <TooltipProvider>
                            <div className="bg-card rounded-lg border border-orange-700/50 dark:border-orange-700/50">
                              <button
                                onClick={() => setExpandedOracleQuery(expandedOracleQuery === message.id ? null : message.id)}
                                className="w-full px-4 py-2 flex items-center justify-between hover:bg-accent transition-colors rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <Database className="w-4 h-4 text-orange-500" />
                                  <span className="text-sm font-medium text-foreground">
                                    Oracle SQL Query
                                  </span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-xs px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded cursor-help flex items-center gap-1">
                                        Demo
                                        <Info className="w-3 h-3" />
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-[280px]">
                                      <p className="font-medium mb-1">Oracle SQL Translation</p>
                                      <p className="text-muted-foreground mb-2">Syntax differences handled:</p>
                                      <ul className="text-xs space-y-0.5 text-foreground">
                                        <li>• LIMIT 100 → FETCH FIRST 100 ROWS ONLY</li>
                                        <li>• NOW() → SYSDATE</li>
                                        <li>• COALESCE → NVL (where applicable)</li>
                                        <li>• Type casting ::type → CAST()</li>
                                      </ul>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 text-muted-foreground transition-transform",
                                    expandedOracleQuery === message.id && "transform rotate-180"
                                  )}
                                />
                              </button>
                              {expandedOracleQuery === message.id && (
                                <div className="px-4 pb-4">
                                  <pre className="text-xs bg-muted text-orange-500 dark:text-orange-400 p-3 rounded overflow-x-auto">
                                    <code>{message.oracleSqlQuery}</code>
                                  </pre>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(message.oracleSqlQuery!)
                                    }}
                                    className="mt-2 text-xs text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
                                  >
                                    Copy
                                  </button>
                                </div>
                              )}
                            </div>
                          </TooltipProvider>
                        )}

                        {/* Query Results Table */}
                        {message.results && (
                          <div className="bg-card rounded-lg border border-border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-foreground">Query Results</span>
                              </div>
                              <button className="text-xs text-primary hover:text-primary/80">
                                Export Excel
                              </button>
                            </div>
                            {renderTable(message.results)}
                          </div>
                        )}

                        {/* Follow-up Questions */}
                        {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {message.followUpQuestions.map((question, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSend(question)}
                                className="text-sm px-3 py-1.5 bg-card border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary transition"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking Steps - Shown during streaming */}
            {isTyping && thinkingSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[90%]">
                  <ThinkingSteps steps={thinkingSteps} />

                  {/* Streaming content preview */}
                  {streamingContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 bg-card border border-border text-foreground rounded-2xl px-4 py-3"
                    >
                      <SimpleMarkdownMessage content={streamingContent} className="text-sm" />
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Legacy Typing Indicator (fallback when no thinking steps) */}
            {isTyping && thinkingSteps.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%]">
                  <div className="bg-card border border-border text-foreground shadow-sm rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 !pb-[16px] sm:pb-4">
        <div className="bg-card/70 backdrop-blur-xl backdrop-saturate-150 border-2 border-border/50 rounded-2xl p-2 shadow-lg shadow-black/5 dark:shadow-black/20 ring-2 ring-border/30">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask about production, quality, inventory..."
            disabled={isTyping}
            className="w-full px-2 py-1.5 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none resize-none transition-all disabled:opacity-50"
            style={{
              minHeight: '32px',
              maxHeight: '120px',
              overflowY: inputValue.split('\n').length > 3 ? 'auto' : 'hidden'
            }}
          />

          <div className="flex items-center justify-between mt-1">
            <div className="text-xs text-muted-foreground">
              Natural Language to SQL
            </div>

            <button
              onClick={() => handleSend()}
              disabled={isTyping || !inputValue.trim()}
              className={cn(
                "p-1.5 rounded-full transition-all",
                inputValue.trim() && !isTyping
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  : "text-muted-foreground bg-muted"
              )}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
