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
      className={`pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
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