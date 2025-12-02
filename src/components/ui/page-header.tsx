'use client'

import React from 'react'
import BreweryThemeToggle from '@/components/BreweryThemeToggle'

interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  showThemeToggle?: boolean
}

export function PageHeader({
  title,
  description,
  action,
  className = '',
  showThemeToggle = true
}: PageHeaderProps) {
  return (
    <div
      className={`bg-muted rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-border p-4 sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-[30px] sm:text-3xl font-bold text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-[14px] sm:text-base text-muted-foreground mt-1 sm:mt-2">
              {description}
            </p>
          )}
          {action && <div className="mt-4">{action}</div>}
        </div>

        {/* Mobile-only theme toggle (hidden on desktop where sidebar has it) */}
        {showThemeToggle && (
          <div className="sm:hidden flex-shrink-0">
            <BreweryThemeToggle
              collapsed
              className="!p-2 bg-card/80 border border-border rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  )
}