# Thinking Steps Framework

A reusable framework for displaying real-time AI agent progress with industry-themed terminology and branded visual feedback.

## Overview

The Thinking Steps Framework provides users with visual feedback during AI agent processing. Instead of showing a generic "loading" spinner, it displays a chain-of-thought style progression through distinct phases, using industry-specific terminology that reinforces brand identity.

**Key Benefits:**
- **Perceived Performance**: Users see progress within 500ms of request submission
- **Transparency**: Users understand what the AI is doing at each step
- **Brand Reinforcement**: Industry-specific vocabulary creates memorable, on-brand experiences
- **Trust Building**: Visible reasoning process builds confidence in AI outputs

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ThinkingSteps Component                     │   │
│  │  • Shimmer text animation for active steps               │   │
│  │  • Pulsing icon animation                                │   │
│  │  • Step state management (active/complete/error)         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▲                                  │
│                              │ SSE Events                       │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────┐
│                        Backend (API)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Streaming Endpoint (SSE)                       │   │
│  │  • Phase 1: Classification → send('thinking', {...})     │   │
│  │  • Phase 2: Preparation   → send('thinking', {...})      │   │
│  │  • Phase 3: Processing    → send('thinking', {...})      │   │
│  │  • Phase N: Completion    → send('data', {...})          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### 1. ThinkingStep Interface

```typescript
interface ThinkingStep {
  id: string                                           // Unique identifier
  step: string                                         // Phase identifier (e.g., 'classify', 'execute')
  message: string                                      // Display message (industry-themed)
  icon: 'analyze' | 'database' | 'code' | 'insights'  // Icon category (extensible)
  status: 'active' | 'complete' | 'error' | 'pending' // Current state
  timestamp?: number                                   // Completion timestamp
}
```

### 2. SSE Event Protocol

The backend sends Server-Sent Events with this structure:

```typescript
// Event format
event: thinking
data: {"step": "phase-id", "message": "Display text...", "icon": "category", "done": false}

// Event types
'thinking'     // Progress update
'tool-call'    // Tool invocation (optional, for debugging)
'tool-result'  // Tool result (optional, for debugging)
'text-delta'   // Streaming text content
'data'         // Final structured data
'error'        // Error occurred
'finish'       // Stream complete
```

### 3. Sending Function Pattern

```typescript
// Backend helper function
const send = (event: string, data: any) => {
  controller.enqueue(
    encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  );
};

// Usage pattern for each phase
send('thinking', {
  step: 'phase-id',
  message: 'Industry-themed active message...',
  icon: 'category'
});

// ... do work ...

send('thinking', {
  step: 'phase-id-done',
  message: 'Industry-themed completion message',
  icon: 'category',
  done: true
});
```

---

## Industry Theming Guide

### Vocabulary Strategy

Replace generic terms with industry-specific vocabulary that:
1. **Reinforces brand identity** - Uses domain-specific language
2. **Creates delight** - Adds personality without confusion
3. **Maintains clarity** - Users still understand what's happening

### Mapping Template

| Generic Term | Description | Industry Replacement Examples |
|--------------|-------------|------------------------------|
| Processing | Active work | Brewing, Cooking, Crafting, Building, Forging |
| Analyzing | Examining input | Tasting, Inspecting, Reviewing, Scanning, Assessing |
| Loading | Fetching data | Checking inventory, Opening vault, Accessing archives |
| Generating | Creating output | Drafting, Composing, Formulating, Designing, Mixing |
| Executing | Running operations | Tapping, Deploying, Launching, Activating, Serving |
| Completing | Finishing up | Serving, Delivering, Presenting, Finalizing, Packaging |
| Suggestions | Recommendations | Pairings, Next steps, Alternatives, Options, Ideas |

### Industry Examples

#### Brewery/Food Service
```typescript
const BREWERY_TERMINOLOGY = {
  classify: { active: 'Tasting the query...', done: 'Recipe type: {result}' },
  schema: { active: 'Checking the cellar inventory...', done: 'Cellar map loaded' },
  generate: { active: 'Drafting the recipe...', done: 'Recipe ready' },
  translate: { active: 'Blending for Oracle...', done: 'Oracle blend ready' },
  execute: { active: 'Tapping the kegs...', done: 'Poured {count} results' },
  visualize: { active: 'Crafting the visuals...', done: 'Served {type} chart' },
  insights: { active: 'Fermenting insights...', done: 'Insights on tap' },
  followup: { active: 'Casking suggestions...', done: '{count} rounds ready to serve' }
};
```

#### Healthcare/Medical
```typescript
const HEALTHCARE_TERMINOLOGY = {
  classify: { active: 'Triaging the request...', done: 'Case type: {result}' },
  schema: { active: 'Accessing patient records...', done: 'Records retrieved' },
  generate: { active: 'Preparing diagnosis...', done: 'Assessment complete' },
  execute: { active: 'Running lab analysis...', done: 'Results: {count} findings' },
  visualize: { active: 'Charting vitals...', done: 'Charts ready' },
  insights: { active: 'Consulting specialists...', done: 'Consultation complete' },
  followup: { active: 'Scheduling follow-ups...', done: '{count} appointments suggested' }
};
```

#### Finance/Banking
```typescript
const FINANCE_TERMINOLOGY = {
  classify: { active: 'Evaluating transaction...', done: 'Transaction type: {result}' },
  schema: { active: 'Opening the vault...', done: 'Accounts accessed' },
  generate: { active: 'Calculating positions...', done: 'Positions computed' },
  execute: { active: 'Processing ledger entries...', done: 'Posted {count} entries' },
  visualize: { active: 'Charting portfolio...', done: 'Portfolio visualized' },
  insights: { active: 'Analyzing market trends...', done: 'Analysis complete' },
  followup: { active: 'Identifying opportunities...', done: '{count} recommendations ready' }
};
```

#### Legal/Law
```typescript
const LEGAL_TERMINOLOGY = {
  classify: { active: 'Reviewing the case...', done: 'Case type: {result}' },
  schema: { active: 'Searching precedents...', done: 'Case law loaded' },
  generate: { active: 'Drafting brief...', done: 'Brief prepared' },
  execute: { active: 'Filing motions...', done: 'Filed {count} documents' },
  visualize: { active: 'Building case timeline...', done: 'Timeline constructed' },
  insights: { active: 'Consulting jurisprudence...', done: 'Legal opinion formed' },
  followup: { active: 'Identifying next actions...', done: '{count} motions suggested' }
};
```

#### Manufacturing/Industrial
```typescript
const MANUFACTURING_TERMINOLOGY = {
  classify: { active: 'Inspecting work order...', done: 'Order type: {result}' },
  schema: { active: 'Loading floor plan...', done: 'Factory layout ready' },
  generate: { active: 'Programming sequence...', done: 'Sequence compiled' },
  execute: { active: 'Running production line...', done: 'Produced {count} units' },
  visualize: { active: 'Calibrating displays...', done: 'Dashboards online' },
  insights: { active: 'Analyzing efficiency...', done: 'Metrics calculated' },
  followup: { active: 'Scheduling maintenance...', done: '{count} tasks queued' }
};
```

#### Logistics/Shipping
```typescript
const LOGISTICS_TERMINOLOGY = {
  classify: { active: 'Scanning manifest...', done: 'Shipment type: {result}' },
  schema: { active: 'Loading route maps...', done: 'Routes calculated' },
  generate: { active: 'Optimizing route...', done: 'Route optimized' },
  execute: { active: 'Dispatching fleet...', done: 'Dispatched {count} vehicles' },
  visualize: { active: 'Mapping deliveries...', done: 'Tracking live' },
  insights: { active: 'Analyzing logistics...', done: 'Efficiency report ready' },
  followup: { active: 'Planning next shipments...', done: '{count} shipments queued' }
};
```

---

## Implementation Reference: Sleeman BrewMind

### File Structure

```
src/
├── components/ui/
│   └── thinking-steps.tsx          # Reusable UI component
├── app/api/
│   └── sql-agent-stream/
│       └── route.ts                # Streaming API endpoint
└── app/dashboard/_components/
    └── sql-analytics-chat.tsx      # Consumer component
```

### 1. ThinkingSteps Component (`thinking-steps.tsx`)

```typescript
'use client'

import { useState, memo, type ElementType, type ComponentProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Database, Code, CheckCircle2, AlertCircle, Beer } from 'lucide-react'
import { cn } from '@/lib/utils'

// Step interface - extend icon types for your industry
export interface ThinkingStep {
  id: string
  step: string
  message: string
  icon: 'analyze' | 'database' | 'code' | 'insights' | 'beer'  // Add industry icons
  status: 'active' | 'complete' | 'error' | 'pending'
  timestamp?: number
}

// Icon mapping - extend for your industry
const iconMap = {
  analyze: Brain,
  database: Database,
  code: Code,
  insights: Brain,
  beer: Beer  // Industry-specific icon
}

// Icon colors - customize for brand
const iconColors = {
  analyze: 'text-purple-500',
  database: 'text-blue-500',
  code: 'text-amber-500',
  insights: 'text-slate-500',
  beer: 'text-amber-600'  // Industry-specific color
}

/**
 * Shimmer Component - Animated text effect for active states
 */
const Shimmer = memo(function Shimmer({
  children,
  as: Component = 'span',
  className,
  duration = 2,
  spread,
  ...props
}: {
  children: string
  as?: ElementType
  className?: string
  duration?: number
  spread?: number
}) {
  const calculatedSpread = spread ?? Math.min(children.length * 1.5, 30)

  return (
    <Component
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        // Customize gradient colors for your brand
        'bg-gradient-to-r from-amber-600 via-amber-900 to-amber-600',
        'dark:from-amber-400 dark:via-amber-100 dark:to-amber-400',
        className
      )}
      style={{ backgroundSize: `${200 + calculatedSpread}% 100%` }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-900 to-amber-600 dark:from-amber-400 dark:via-amber-100 dark:to-amber-400"
        style={{ backgroundSize: `${200 + calculatedSpread}% 100%` }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {children}
      </motion.span>
      {children}
    </Component>
  )
})

/**
 * Pulsing Icon - Subtle pulse animation for active steps
 */
function PulsingIcon({ icon: Icon, color }: { icon: typeof Brain; color: string }) {
  return (
    <div className="relative">
      <motion.div
        className={cn(
          'absolute inset-0 rounded-full',
          color.replace('text-', 'bg-').replace('-500', '-400/30')
        )}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Icon className={cn('h-4 w-4 relative z-10', color)} />
    </div>
  )
}

/**
 * ThinkingSteps - Main component for displaying progress
 */
export function ThinkingSteps({
  steps,
  className,
  compact = false,
  headerMessage = 'Brewing your query...'  // Customize header message
}: {
  steps: ThinkingStep[]
  className?: string
  compact?: boolean
  headerMessage?: string
}) {
  if (steps.length === 0) return null

  const hasActiveStep = steps.some(s => s.status === 'active')

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
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
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
              {headerMessage}
            </Shimmer>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>Complete</span>
          </>
        )}
      </div>

      {/* Steps list */}
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
              className={cn('flex items-center gap-3 py-1', compact ? 'text-xs' : 'text-sm')}
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
                  <AlertCircle className="h-4 w-4 text-red-500" />
                ) : (
                  <Icon className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                )}
              </div>

              {/* Message */}
              <span className={cn(
                'flex-1 transition-colors duration-200',
                step.status === 'complete' && 'text-slate-500 dark:text-slate-400',
                step.status === 'error' && 'text-red-600 dark:text-red-400',
                step.status === 'pending' && 'text-slate-400 dark:text-slate-500'
              )}>
                {step.status === 'active' ? (
                  <Shimmer duration={2} className="font-medium">{step.message}</Shimmer>
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
 * Hook to manage thinking steps state
 */
export function useThinkingSteps() {
  const [steps, setSteps] = useState<ThinkingStep[]>([])

  const addStep = (step: Omit<ThinkingStep, 'id' | 'status'> & { done?: boolean }) => {
    const id = `${step.step}-${Date.now()}`

    setSteps(prev => {
      const existingIndex = prev.findIndex(
        s => s.step === step.step || s.step === step.step.replace('-done', '')
      )

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          message: step.message,
          status: step.done ? 'complete' : 'active',
          timestamp: step.done ? Date.now() : undefined
        }
        return updated
      }

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
```

### 2. Streaming API Endpoint (`route.ts`)

```typescript
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Helper to send SSE events
      const send = (event: string, data: any) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        // ========================================
        // Phase 1: Query Classification
        // ========================================
        send('thinking', {
          step: 'classify',
          message: 'Tasting the query...',  // Industry-themed
          icon: 'beer'  // Industry-specific icon
        });

        const classification = await classifyQuery(question);

        send('thinking', {
          step: 'classify-done',
          message: `Recipe type: ${classification.type}`,  // Industry-themed
          icon: 'beer',
          done: true
        });

        // ========================================
        // Phase 2: Schema/Context Loading
        // ========================================
        send('thinking', {
          step: 'schema',
          message: 'Checking the cellar inventory...',
          icon: 'database'
        });

        const schema = await loadSchema();

        send('thinking', {
          step: 'schema-done',
          message: 'Cellar map loaded',
          icon: 'database',
          done: true
        });

        // ========================================
        // Phase 3: Generation
        // ========================================
        send('thinking', {
          step: 'generate',
          message: 'Drafting the recipe...',
          icon: 'code'
        });

        const result = await generateContent();

        send('thinking', {
          step: 'generate-done',
          message: 'Recipe ready',
          icon: 'code',
          done: true
        });

        // ========================================
        // Phase 4: Execution
        // ========================================
        send('thinking', {
          step: 'execute',
          message: 'Tapping the kegs...',
          icon: 'database'
        });

        const data = await executeOperation(result);

        send('thinking', {
          step: 'execute-done',
          message: `Poured ${data.count} results`,
          icon: 'database',
          done: true
        });

        // ========================================
        // Phase 5: Insights Generation
        // ========================================
        send('thinking', {
          step: 'insights',
          message: 'Fermenting insights...',
          icon: 'beer'
        });

        // Stream text content
        for await (const chunk of insightsStream) {
          send('text-delta', { textDelta: chunk });
        }

        send('thinking', {
          step: 'insights-done',
          message: 'Insights on tap',
          icon: 'beer',
          done: true
        });

        // ========================================
        // Phase 6: Follow-up Suggestions
        // ========================================
        send('thinking', {
          step: 'followup',
          message: 'Casking suggestions...',
          icon: 'beer'
        });

        const suggestions = await generateSuggestions();

        send('thinking', {
          step: 'followup-done',
          message: `${suggestions.length} rounds ready to serve`,
          icon: 'beer',
          done: true
        });

        // ========================================
        // Final Data Payload
        // ========================================
        send('data', {
          success: true,
          result,
          data,
          suggestions,
          metadata: { /* ... */ }
        });

        send('finish', { finishReason: 'stop' });

      } catch (error) {
        send('error', { message: error.message });
        send('finish', { finishReason: 'error' });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  });
}
```

### 3. Consumer Component Integration

```typescript
'use client'

import { useState } from 'react'
import { ThinkingSteps, useThinkingSteps, type ThinkingStep } from '@/components/ui/thinking-steps'

export default function AgentChat() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const { steps, addStep, clearSteps } = useThinkingSteps()

  const handleSubmit = async (question: string) => {
    setIsProcessing(true)
    clearSteps()
    setStreamingContent('')

    try {
      const response = await fetch('/api/agent-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            const eventType = line.slice(7)
            const dataLine = lines[lines.indexOf(line) + 1]

            if (dataLine?.startsWith('data: ')) {
              const data = JSON.parse(dataLine.slice(6))

              switch (eventType) {
                case 'thinking':
                  addStep({
                    step: data.step,
                    message: data.message,
                    icon: data.icon,
                    done: data.done
                  })
                  break

                case 'text-delta':
                  setStreamingContent(prev => prev + data.textDelta)
                  break

                case 'data':
                  // Handle final data
                  handleFinalData(data)
                  break

                case 'finish':
                  setIsProcessing(false)
                  break
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream error:', error)
      setIsProcessing(false)
    }
  }

  return (
    <div>
      {/* Show thinking steps during processing */}
      {isProcessing && steps.length > 0 && (
        <ThinkingSteps
          steps={steps}
          headerMessage="Brewing your query..."  // Customize for your industry
        />
      )}

      {/* Show streaming content */}
      {streamingContent && (
        <div className="prose">
          {streamingContent}
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  )
}
```

---

## Customization Checklist

When implementing for a new industry:

### 1. Define Terminology Map
- [ ] Map all 6-8 phases to industry vocabulary
- [ ] Create active and completion messages for each
- [ ] Include dynamic placeholders (`{count}`, `{type}`, `{result}`)

### 2. Add Industry Icons
- [ ] Select 2-3 industry-specific icons from Lucide
- [ ] Add to `iconMap` in thinking-steps.tsx
- [ ] Define colors in `iconColors`

### 3. Customize Branding
- [ ] Update Shimmer gradient colors to match brand
- [ ] Adjust header message
- [ ] Set icon colors to brand palette

### 4. Update API Endpoint
- [ ] Replace all `send('thinking', {...})` messages
- [ ] Use consistent terminology throughout
- [ ] Ensure done messages reflect actual results

### 5. Test User Experience
- [ ] Verify first feedback appears within 500ms
- [ ] Confirm all phases display correctly
- [ ] Test error states show appropriately
- [ ] Validate completion indicator works

---

## Best Practices

1. **Immediate Feedback**: Send first thinking step within 500ms of request
2. **Consistent Terminology**: Use same vocabulary throughout the entire flow
3. **Dynamic Messages**: Include actual results in completion messages
4. **Error Handling**: Show step-specific errors with clear messaging
5. **Performance**: Don't add artificial delays - show actual progress
6. **Accessibility**: Ensure shimmer effect doesn't cause issues for motion-sensitive users

---

## Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  }
}
```

---

## Related Files

- [thinking-steps.tsx](../src/components/ui/thinking-steps.tsx) - UI component
- [sql-agent-stream/route.ts](../src/app/api/sql-agent-stream/route.ts) - API implementation
- [sql-analytics-chat.tsx](../src/app/dashboard/_components/sql-analytics-chat.tsx) - Consumer example

---

*Framework version 1.0 - Sleeman BrewMind Implementation*
