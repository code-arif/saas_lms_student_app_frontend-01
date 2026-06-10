import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  User,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'My Courses', href: ROUTES.COURSES.MY_COURSES, icon: GraduationCap },
  { name: 'Browse Courses', href: ROUTES.COURSES.INDEX, icon: Search },
  { name: 'Certificates', href: ROUTES.CERTIFICATES, icon: Award },
  { name: 'Profile', href: ROUTES.PROFILE.INDEX, icon: User },
];

export const Sidebar = () => {
  const {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebarCollapsed,
    setMobileSidebarOpen,
  } = useUIStore();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname, setMobileSidebarOpen]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile sidebar on Escape key (document-level listener)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileSidebarOpen, setMobileSidebarOpen]);

  // Prevent body scroll & focus close button when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when drawer opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Main navigation"
        role="navigation"
        aria-modal={isMobileSidebarOpen ? true : undefined}
        className={cn(
          // Base styles
          'fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r bg-background',
          // Mobile: drawer with slide transition; Desktop: width transition
          'w-64 transition-all duration-300 ease-in-out md:translate-x-0',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible, width transitions
          'md:static md:z-auto',
          isSidebarCollapsed ? 'md:w-16' : 'md:w-64'
        )}
      >
        {/* Collapse toggle - desktop only */}
        <div
          className={cn(
            'hidden md:flex',
            isSidebarCollapsed ? 'justify-center py-3' : 'justify-end px-3 py-3'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarCollapsed}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isSidebarCollapsed}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Close button - mobile only */}
        <div className="flex justify-end px-3 pt-2 md:hidden">
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar navigation"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const linkContent = (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    // Close mobile sidebar on navigation
                    setMobileSidebarOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      isSidebarCollapsed ? 'justify-center px-2' : '',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              );

              // Show tooltip on hover when collapsed (desktop only)
              if (isSidebarCollapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
