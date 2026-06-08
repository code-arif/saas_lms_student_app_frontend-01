import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';

export const DashboardLayout = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300 md:ml-64",
            !isSidebarOpen && "md:ml-0"
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
