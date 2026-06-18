import React, { useEffect, useState } from 'react';
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
  Settings,
  Shield,
  Bell,
  ChevronDown,
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
];

const settingsItems = [
  { name: 'General', href: ROUTES.SETTINGS.GENERAL, icon: User },
  { name: 'Security', href: ROUTES.SETTINGS.SECURITY, icon: Shield },
  { name: 'Notifications', href: ROUTES.SETTINGS.NOTIFICATIONS, icon: Bell },
];

export const Sidebar = () => {
  const {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebarCollapsed,
    setMobileSidebarOpen,
  } = useUIStore();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(() => {
    // Auto-expand if currently on a settings page
    return location.pathname.startsWith('/settings');
  });

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

  const isOnSettingsPage = location.pathname.startsWith('/settings');

  const renderNavLink = (
    item: { name: string; href: string; icon: React.ElementType },
    extraClasses = '',
    onClick?: () => void
  ) => {
    const isActive = location.pathname === item.href;

    return (
      <NavLink
        key={item.name}
        to={item.href}
        onClick={() => {
          if (isMobileSidebarOpen) {
            setMobileSidebarOpen(false);
          }
          onClick?.();
        }}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          isSidebarCollapsed && 'md:justify-center md:px-2',
          extraClasses
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
  };

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
      <aside
        className={cn(
          'fixed left-0 z-50 flex flex-col border-r bg-card shadow-sm md:z-30',
          'inset-y-0',
          'md:top-16 md:h-[calc(100vh-4rem)]',
          'w-72 transition-[width,transform] duration-300 ease-in-out',
          isSidebarCollapsed && 'md:w-20',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
        role="navigation"
        aria-label="Main navigation"
        aria-modal={isMobileSidebarOpen || undefined}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center border-b px-4">
          <Link
            to={ROUTES.DASHBOARD}
            className={cn(
              'flex items-center gap-2 font-bold text-xl whitespace-nowrap overflow-hidden',
              isSidebarCollapsed ? 'md:hidden' : '',
              isMobileSidebarOpen ? 'flex' : ''
            )}
          >
            <span className="text-primary shrink-0">SaaS</span>
            <span className="shrink-0">LMS</span>
          </Link>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarCollapsed}
            className={cn(
              'hidden h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground md:inline-flex',
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
            {/* Main nav items */}
            {navItems.map((item) => {
              const linkElement = renderNavLink(item);

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

            {/* Divider */}
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="my-2 border-t" />
            )}

            {/* Settings Section */}
            {isSidebarCollapsed && !isMobileSidebarOpen ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className={cn(
                      'group relative flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all md:px-2',
                      isOnSettingsPage
                        ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Settings className="h-5 w-5 shrink-0" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  Settings
                </TooltipContent>
              </Tooltip>
            ) : (
              <div>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isOnSettingsPage
                      ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Settings
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isOnSettingsPage ? 'text-primary' : 'group-hover:text-foreground'
                    )}
                  />
                  <span className="truncate flex-1 text-left">Settings</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      isSettingsOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Settings sub-items */}
                <AnimatePresence initial={false}>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 mt-1 space-y-1 border-l-2 border-muted pl-2">
                        {settingsItems.map((item) =>
                          renderNavLink(item, 'pl-3')
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar footer */}
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
