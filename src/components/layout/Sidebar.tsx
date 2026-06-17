import React, { useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Award,
  User,
  Search,
  PanelLeftClose,
  X,
  GraduationCap,
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

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileSidebarOpen, setMobileSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
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
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {/*
        Positioning strategy:
        - Desktop: fixed below the header (top-16), height fills remaining viewport.
        - Mobile: full-screen overlay (inset-0) sliding from the left.
        - Always translate-x-0 on desktop so it's always visible.
        - The collapse button stays inside the sidebar at all times — it is
          anchored to the sidebar header area and moves with the sidebar.
      */}
      <aside
        className={cn(
          // Base: fixed positioning, flex column, background, border
          // Mobile z-50 stacks above header (z-40); desktop z-30 sits below header
          'fixed left-0 z-50 flex flex-col border-r bg-card shadow-sm md:z-30',
          // Mobile: full viewport height overlay
          'inset-y-0',
          // Desktop: below sticky header
          'md:top-16 md:h-[calc(100vh-4rem)]',
          // Width with smooth transition — only width and transform animate
          'w-72 transition-[width,transform] duration-300 ease-in-out',
          isSidebarCollapsed && 'md:w-20',
          // Mobile drawer slide behavior
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop always visible
          'md:translate-x-0'
        )}
        role="navigation"
        aria-label="Main navigation"
        aria-modal={isMobileSidebarOpen || undefined}
      >
        {/* Sidebar Header - always inside sidebar boundaries */}
        <div className="flex h-16 shrink-0 items-center border-b px-4">
          {/* Brand - hidden completely when collapsed on desktop */}
          <Link
            to={ROUTES.DASHBOARD}
            className={cn(
              'flex items-center gap-2 font-bold text-xl whitespace-nowrap overflow-hidden',
              // Hidden on desktop collapsed, always visible on mobile
              isSidebarCollapsed 
                ? 'md:hidden' 
                : '',
              // Always visible on mobile when open
              isMobileSidebarOpen ? 'flex' : ''
            )}
          >
            <span className="text-primary shrink-0">SaaS</span>
            <span className="shrink-0">LMS</span>
          </Link>

          {/* Spacer pushes collapse button to the right */}
          <div className="flex-1" />

          {/* Desktop collapse toggle - always inside sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarCollapsed}
            className={cn(
              'hidden h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground md:inline-flex',
              // When collapsed, center the button (no brand to compete with)
              isSidebarCollapsed ? '' : ''
            )}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isSidebarCollapsed}
          >
            <PanelLeftClose
              className={cn(
                'h-4 w-4 transition-transform duration-300',
                isSidebarCollapsed && 'rotate-180'
              )}
            />
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(false)}
            className="h-8 w-8 shrink-0 text-muted-foreground md:hidden"
            aria-label="Close sidebar navigation"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              const linkElement = (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    if (isMobileSidebarOpen) {
                      setMobileSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    isSidebarCollapsed && 'md:justify-center md:px-2'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isActive ? 'text-primary' : 'group-hover:text-foreground'
                    )}
                  />
                  {/* Show label unless collapsed on desktop */}
                  {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                    <span className="truncate">{item.name}</span>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg bg-primary/5"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavLink>
              );

              // Tooltip when collapsed on desktop
              if (isSidebarCollapsed && !isMobileSidebarOpen) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={12}>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkElement;
            })}
          </nav>
        </div>

        {/* Sidebar footer - branding/version */}
        <div
          className={cn(
            'border-t px-4 py-3 text-xs text-muted-foreground shrink-0',
            isSidebarCollapsed && 'md:hidden'
          )}
        >
          <p>LMS v1.0</p>
        </div>
      </aside>
    </>
  );
};
