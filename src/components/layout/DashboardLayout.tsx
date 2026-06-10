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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={cn(
            "flex-1 p-4 transition-all duration-300 ease-in-out md:p-6",
            // Desktop: margin adjusts based on sidebar width
            isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          )}
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
