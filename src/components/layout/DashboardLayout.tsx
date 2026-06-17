import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';

export const DashboardLayout = () => {
  const { isSidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 relative">
        {/* Sidebar - fixed positioned, does not affect main content flow */}
        <Sidebar />

        {/* Main content - uses margin-left to account for sidebar width on desktop */}
        <main
          className={cn(
            'overflow-y-auto overflow-x-hidden p-4 transition-[margin] duration-300 ease-in-out md:p-8',
            // Desktop: margin matches sidebar width so content never overlaps
            isSidebarCollapsed ? 'md:ml-20' : 'md:ml-72',
            // Mobile: no margin, sidebar overlays
            'ml-0'
          )}
        >
          <div className="mx-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
