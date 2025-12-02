'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Brain,
  Sun,
  Moon,
  FileText,
  Settings,
  ShieldCheck,
  Truck
} from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export default function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      description: 'Brewery Overview'
    },
    {
      title: 'Barley',
      icon: Brain,
      href: '/dashboard/assistant',
      description: 'AI Data Analyst'
    },
    {
      title: 'Quality Control',
      icon: ShieldCheck,
      href: '/dashboard/compliance',
      description: 'Brewing Standards'
    },
    {
      title: 'Distribution',
      icon: Truck,
      href: '/dashboard/distribution',
      description: 'Shipments & Logistics'
    },
    {
      title: 'Reports',
      icon: FileText,
      href: '/dashboard/reports',
      description: 'Brewery Reports'
    },
    {
      title: 'Integrations',
      icon: Settings,
      href: '/dashboard/integrations',
      description: 'System Connections'
    }
  ]

  return (
    <aside
      className={`
        bg-card text-foreground h-full transition-all duration-300 flex flex-col rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/30 ring-1 ring-border
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border bg-muted rounded-t-2xl">
        {isCollapsed ? (
          /* Collapsed: Stack logo and chevron vertically */
          <div className="flex flex-col items-center gap-3">
            <Link href="/dashboard">
              {/* Light mode: dark icon */}
              <Image
                src="/sleeman-icon.png"
                alt="Sleeman Breweries"
                width={36}
                height={36}
                className="object-contain dark:hidden"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
              {/* Dark mode: light icon */}
              <Image
                src="/sleeman-icon-light.png"
                alt="Sleeman Breweries"
                width={36}
                height={36}
                className="object-contain hidden dark:block"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1.5 hover:bg-accent rounded-lg transition cursor-pointer text-muted-foreground hover:text-primary"
                aria-label="Expand sidebar"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        ) : (
          /* Expanded: Logo and chevron side by side */
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              {/* Light mode: dark logo */}
              <Image
                src="/sleeman-logo.png"
                alt="Sleeman Breweries"
                width={180}
                height={50}
                className="object-contain dark:hidden"
                style={{ height: 'auto' }}
                priority
              />
              {/* Dark mode: light logo */}
              <Image
                src="/sleeman-logo-light.png"
                alt="Sleeman Breweries"
                width={180}
                height={50}
                className="object-contain hidden dark:block"
                style={{ height: 'auto' }}
                priority
              />
            </Link>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1.5 hover:bg-accent rounded-lg transition cursor-pointer text-muted-foreground hover:text-primary"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${isActive
                      ? 'bg-accent text-primary border-l-4 border-primary pl-2'
                      : 'hover:bg-accent text-muted-foreground hover:text-primary'
                    }
                  `}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-xs opacity-75">{item.description}</div>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {/* Theme Toggle */}
        {mounted && (
          <div className={`mb-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
              title={isCollapsed ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : undefined}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {!isCollapsed && (
                <span className="text-sm font-medium">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Company Info */}
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold mb-1 text-primary">BrewMind AI</p>
            <p>Intelligent Brewery Analytics</p>
            <p className="mt-2">© 2025 Sleeman Breweries</p>
          </div>
        ) : (
          <div className="text-center text-xs text-muted-foreground">
            <p>© '25</p>
          </div>
        )}
      </div>
    </aside>
  )
}