'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Bubble {
  id: number
  x: number
  size: number
  delay: number
  duration: number
}

interface BreweryThemeToggleProps {
  collapsed?: boolean
  className?: string
}

/**
 * Brewery-themed theme toggle with carbonation bubble animation.
 *
 * When switching themes, bubbles rise from the bottom like CO2 escaping
 * from a freshly poured beer - a semantically meaningful animation for
 * Sleeman Breweries.
 */
export default function BreweryThemeToggle({
  collapsed = false,
  className
}: BreweryThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate carbonation bubbles on theme change
  const triggerBubbles = useCallback(() => {
    const newBubbles: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70, // Random horizontal position (15-85%)
      size: 3 + Math.random() * 5, // Random size (3-8px)
      delay: Math.random() * 0.3, // Staggered start
      duration: 0.6 + Math.random() * 0.4, // Varied animation duration
    }))

    setBubbles(newBubbles)
    setIsAnimating(true)

    // Clear bubbles after animation completes
    setTimeout(() => {
      setBubbles([])
      setIsAnimating(false)
    }, 1200)
  }, [])

  const handleToggle = () => {
    triggerBubbles()
    // Slight delay to let bubbles start before theme changes
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }, 100)
  }

  if (!mounted) {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        collapsed ? "justify-center" : "",
        className
      )}>
        <div className="w-[18px] h-[18px]" />
        {!collapsed && <span className="text-sm font-medium opacity-0">Loading</span>}
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative flex items-center gap-2 px-3 py-2 rounded-lg",
        "hover:bg-accent transition-colors overflow-hidden",
        "text-muted-foreground hover:text-primary",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        collapsed ? "justify-center" : "",
        className
      )}
      title={collapsed ? `Switch to ${isDark ? 'light' : 'dark'} mode` : undefined}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Carbonation Bubbles - Rising Animation */}
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            bottom: '-10px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: isDark
              ? 'rgba(212, 168, 75, 0.6)'  // Sleeman Gold for dark mode
              : 'rgba(28, 24, 18, 0.4)',   // Sleeman Dark for light mode
            animation: `brewBubbleRise ${bubble.duration}s ease-out ${bubble.delay}s forwards`,
          }}
        />
      ))}

      {/* Icon with smooth rotation transition */}
      <div className={cn(
        "relative transition-transform duration-500",
        isAnimating ? "scale-110" : "scale-100"
      )}>
        {isDark ? (
          <Sun
            size={18}
            className={cn(
              "transition-all duration-300",
              isAnimating ? "rotate-180 text-primary" : "rotate-0"
            )}
          />
        ) : (
          <Moon
            size={18}
            className={cn(
              "transition-all duration-300",
              isAnimating ? "-rotate-90 text-primary" : "rotate-0"
            )}
          />
        )}
      </div>

      {/* Label */}
      {!collapsed && (
        <span className="text-sm font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}

      {/* Inline keyframes for bubble animation */}
      <style jsx>{`
        @keyframes brewBubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
