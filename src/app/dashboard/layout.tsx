'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MobileBottomNav from '@/components/MobileBottomNav'
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext'

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <div className="flex h-screen bg-background md:p-2 gap-4">
      {/* Semantic aside for sidebar navigation - Hidden only on phones, visible on tablets and desktop */}
      <aside
        className={`
          hidden sm:block print:hidden
          ${isCollapsed ? 'w-20' : 'w-64'}
          flex-shrink-0
          transition-all duration-300
        `}
        aria-label="Main navigation"
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>

      {/* Semantic main for primary content */}
      <main
        className="
          flex-1
          transition-all duration-300
          min-w-0
          overflow-hidden
        "
        id="main-content"
        tabIndex={-1}
      >
        <div className={`
          h-full
          bg-transparent
          ${pathname === '/dashboard/assistant' ? 'overflow-hidden' : 'overflow-y-auto overlay-scroll'}
          pb-24 sm:pb-0
        `}>
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="print:hidden">
        <MobileBottomNav />
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}