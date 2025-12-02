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
        bg-sleeman-dark text-gray-200 h-full transition-all duration-300 flex flex-col rounded-2xl shadow-lg shadow-black/30 ring-1 ring-sleeman-brown
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-sleeman-brown bg-sleeman-dark rounded-t-2xl">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            {isCollapsed ? (
              <Image
                src="/sleeman-icon-light.png"
                alt="Sleeman Breweries"
                width={32}
                height={32}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            ) : (
              <Image
                src="/sleeman-logo-light.png"
                alt="Sleeman Breweries"
                width={180}
                height={50}
                className="object-contain"
                style={{ height: 'auto' }}
                priority
              />
            )}
          </Link>
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-sleeman-brown rounded-lg transition cursor-pointer text-gray-400 hover:text-sleeman-gold"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>
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
                      ? 'bg-sleeman-brown text-sleeman-gold border-l-4 border-sleeman-gold pl-2'
                      : 'hover:bg-sleeman-brown text-gray-300 hover:text-sleeman-gold-light'
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
      <div className="p-4 border-t border-sleeman-brown">
        {/* Theme Toggle */}
        {mounted && (
          <div className={`mb-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sleeman-brown transition-colors text-gray-400 hover:text-sleeman-gold"
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
          <div className="text-xs text-gray-400">
            <p className="font-semibold mb-1 text-sleeman-gold">BrewMind AI</p>
            <p>Intelligent Brewery Analytics</p>
            <p className="mt-2">© 2025 Sleeman Breweries</p>
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500">
            <p>© '25</p>
          </div>
        )}
      </div>
    </aside>
  )
}