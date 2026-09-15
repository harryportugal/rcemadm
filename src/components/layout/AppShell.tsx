'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // On initial mount, detect if mobile screen and start with collapsed sidebar
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setSidebarCollapsed(true);
    }
  }, []);

  // When route changes on mobile, auto-close the drawer
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setSidebarCollapsed(true);
    }
  }, [pathname]);

  return (
    <div className="kb-app-frame">
      {/* Mobile Drawer Backdrop */}
      <div
        className={`kb-mobile-backdrop ${!sidebarCollapsed ? 'open' : ''}`}
        onClick={() => setSidebarCollapsed(true)}
        aria-hidden="true"
      />

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="kb-main-workspace" id="mainWorkspace">
        <div className="kb-main-inner">
          <Topbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="tab-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
