'use client'

import { useState, memo, type ElementType, type ComponentProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Database, Code, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ThinkingStep {
  id: string
  step: string
  message: string
  icon: 'analyze' | 'database' | 'code' | 'insights'
  status: 'active' | 'complete' | 'error' | 'pending'
  timestamp?: number
}

interface ThinkingStepsProps {
  steps: ThinkingStep[]
  className?: string
  compact?: boolean
}

const iconMap = {
  analyze: Brain,
  database: Database,
  code: Code,
  insights: Brain
}

const iconColors = {
  analyze: 'text-purple-500',
  database: 'text-blue-500',
  code: 'text-amber-500',
  insights: 'text-slate-500'
}

/**
 * Shimmer Component (AI SDK inspired)
 *
 * An animated text shimmer effect that sweeps across content.
 * Perfect for indicating loading states and active processing.
 */
interface ShimmerProps extends ComponentProps<'span'> {
  children: string
  as?: ElementType
  duration?: number
  spread?: number
}

const Shimmer = memo(function Shimmer({
  children,
  as: Component = 'span',
  className,
  duration = 2,
  spread,
  ...props
}: ShimmerProps) {
  const calculatedSpread = spread ?? Math.min(children.length * 1.5, 30)

  return (
    <Component
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        'bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600',
        'dark:from-slate-400 dark:via-slate-100 dark:to-slate-400',
        className
      )}
      style={{
        backgroundSize: `${200 + calculatedSpread}% 100%`,
      }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 dark:from-slate-400 dark:via-slate-100 dark:to-slate-400"
        style={{
          backgroundSize: `${200 + calculatedSpread}% 100%`,
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
      {children}
    </Component>
  )
})

/**
 * Pulsing Icon Component
 *
 * Shows a subtle pulse animation around the icon for active states.
 * More elegant than spinning for representing "thinking".
 */
function PulsingIcon({
  icon: Icon,
  color
}: {
  icon: typeof Brain
  color: string
}) {
  return (
    <div className="relative">
      {/* Pulse ring */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-full',
          color.replace('text-', 'bg-').replace('-500', '-400/30')
        )}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <Icon className={cn('h-4 w-4 relative z-10', color)} />
    </div>
  )
}

/**
 * ThinkingSteps Component
 *
 * Displays real-time progress indicators during AI processing.
 * Uses shimmer text effect for active steps (AI SDK pattern).
 *
 * Features:
 * - Shimmer effect on active step text
 * - Pulsing icon animation for active steps
 * - Checkmark for completed steps
 * - Error indicator for failed steps
 * - Collapsible chain-of-thought style layout
 */
export function ThinkingSteps({ steps, className, compact = false }: ThinkingStepsProps) {
  if (steps.length === 0) return null

  const activeSteps = steps.filter(s => s.status === 'active')
  const hasActiveStep = activeSteps.length > 0

  return (
    <div className={cn(
      'space-y-2 py-3 px-4 rounded-lg',
      'bg-gradient-to-br from-slate-50 to-slate-100/50',
      'dark:from-slate-900/80 dark:to-slate-800/50',
      'border border-slate-200/80 dark:border-slate-700/50',
      'shadow-sm',
      compact && 'py-2 px-3 space-y-1',
      className
    )}>
      {/* Header with animated indicator */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
        <div className="flex items-center gap-1.5">
          {hasActiveStep ? (
            <>
              <motion.div
                className="flex gap-0.5"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              </motion.div>
              <Shimmer duration={1.5} className="font-medium">
                Processing your query...
              </Shimmer>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              <span>Complete</span>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {steps.map((step) => {
          const Icon = iconMap[step.icon]
          const iconColor = iconColors[step.icon]

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'flex items-center gap-3 py-1',
                compact ? 'text-xs' : 'text-sm'
              )}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {step.status === 'active' ? (
                  <PulsingIcon icon={Icon} color={iconColor} />
                ) : step.status === 'complete' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : step.status === 'error' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </motion.div>
                ) : (
                  <Icon className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                )}
              </div>

              {/* Message - with shimmer for active steps */}
              <span className={cn(
                'flex-1 transition-colors duration-200',
                step.status === 'complete' && 'text-slate-500 dark:text-slate-400',
                step.status === 'error' && 'text-red-600 dark:text-red-400',
                step.status === 'pending' && 'text-slate-400 dark:text-slate-500'
              )}>
                {step.status === 'active' ? (
                  <Shimmer duration={2} className="font-medium">
                    {step.message}
                  </Shimmer>
                ) : (
                  step.message
                )}
              </span>

              {/* Completion indicator */}
              {step.status === 'complete' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-green-500"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

/**
 * Simplified inline thinking indicator
 * Shows a single animated line during processing
 */
export function ThinkingIndicator({
  message = 'Thinking...',
  className
}: {
  message?: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400',
        className
      )}
    >
      <div className="flex gap-1">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-amber-500"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-amber-500"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="w-1.5 h-1.5 rounded-full bg-amber-500"
        />
      </div>
      <Shimmer duration={1.5}>{message}</Shimmer>
    </motion.div>
  )
}

/**
 * Hook to manage thinking steps state
 * Parses SSE events and updates steps array
 */
export function useThinkingSteps() {
  const [steps, setSteps] = useState<ThinkingStep[]>([])

  const addStep = (step: Omit<ThinkingStep, 'id' | 'status'> & { done?: boolean }) => {
    const id = `${step.step}-${Date.now()}`

    setSteps(prev => {
      // Check if this step already exists
      const existingIndex = prev.findIndex(s => s.step === step.step || s.step === step.step.replace('-done', ''))

      if (existingIndex >= 0) {
        // Update existing step
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          message: step.message,
          status: step.done ? 'complete' : 'active',
          timestamp: step.done ? Date.now() : undefined
        }
        return updated
      }

      // Add new step
      return [...prev, {
        id,
        step: step.step,
        message: step.message,
        icon: step.icon,
        status: step.done ? 'complete' : 'active',
        timestamp: step.done ? Date.now() : undefined
      }]
    })
  }

  const setStepError = (stepId: string, errorMessage: string) => {
    setSteps(prev => prev.map(s =>
      s.step === stepId || s.step === stepId.replace('-done', '')
        ? { ...s, status: 'error' as const, message: errorMessage }
        : s
    ))
  }

  const clearSteps = () => setSteps([])

  return { steps, addStep, setStepError, clearSteps }
}

export default ThinkingSteps
