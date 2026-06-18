import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROUTES } from '@/constants/routes';
import { LogOut, User, Settings, Bell, Menu, Search as SearchIcon, CheckCheck, ExternalLink, ChevronDown, Receipt } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  group: 'today' | 'yesterday' | 'thisWeek' | 'earlier';
  read: boolean;
  avatar?: string;
  avatarFallback: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'New course: Advanced React',
    message: 'Advanced React Patterns has been published. Start learning today!',
    time: '2 min ago',
    group: 'today',
    read: false,
    avatarFallback: 'R',
  },
  {
    id: 2,
    title: 'Quiz graded',
    message: 'JavaScript Fundamentals quiz scored 90%!',
    time: '1 hour ago',
    group: 'today',
    read: false,
    avatarFallback: 'Q',
  },
  {
    id: 3,
    title: 'Certificate awarded',
    message: 'You earned a certificate for Python Basics.',
    time: '1 day ago',
    group: 'yesterday',
    read: false,
    avatarFallback: 'C',
  },
  {
    id: 4,
    title: 'Assignment reminder',
    message: 'Database Design project due in 2 days.',
    time: '2 days ago',
    group: 'yesterday',
    read: true,
    avatarFallback: 'A',
  },
  {
    id: 5,
    title: 'New discussion post',
    message: 'New replies in "State Management in React" thread.',
    time: '4 days ago',
    group: 'thisWeek',
    read: true,
    avatarFallback: 'D',
  },
  {
    id: 6,
    title: 'Course updated',
    message: 'New content added to Node.js Advanced.',
    time: '6 days ago',
    group: 'thisWeek',
    read: true,
    avatarFallback: 'N',
  },
  {
    id: 7,
    title: 'Welcome to the platform',
    message: 'Start exploring courses and building your skills.',
    time: '2 weeks ago',
    group: 'earlier',
    read: true,
    avatarFallback: 'W',
  },
];

const groupLabels: Record<Notification['group'], string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  earlier: 'Earlier',
};

const groupOrder: Notification['group'][] = ['today', 'yesterday', 'thisWeek', 'earlier'];

export const Header = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { toggleSidebar } = useUIStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifList, setNotifList] = useState<Notification[]>(notifications);

  const unreadCount = notifList.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const groupedNotifications = groupOrder
    .map((group) => ({
      group,
      label: groupLabels[group],
      items: notifList.filter((n) => n.group === group),
    }))
    .filter((g) => g.items.length > 0);

  // Shared click-outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Shared Escape handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileMenuOpen(false);
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile hamburger */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>

        {/* Search Bar - Desktop */}
        <div className="hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="w-full bg-muted/50 pl-9 transition-all focus:bg-background"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Icon - Mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <SearchIcon className="h-5 w-5" />
        </Button>

        <ThemeSwitcher />

        {/* Notifications Menu - YouTube Style */}
        <div className="relative" ref={notifRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full"
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            aria-expanded={notifMenuOpen}
            aria-haspopup="true"
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-tight text-destructive-foreground ring-2 ring-background">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          <AnimatePresence>
            {notifMenuOpen && (
              <>
                {/* Mobile backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 md:hidden"
                  onClick={() => setNotifMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 top-full z-50 mt-2 w-[360px] origin-top-right overflow-hidden rounded-xl bg-popover shadow-lg ring-1 ring-foreground/10"
                >
                  {/* Flex column: header fixed, body scrollable */}
                  <div className="flex flex-col max-h-[560px]">
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-3">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold">Notifications</h2>
                        {unreadCount > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-bold text-destructive-foreground">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={markAllRead}
                            className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <CheckCheck className="h-3.5 w-3.5" />
                            Mark all read
                          </Button>
                        )}
                        <Link
                          to={ROUTES.SETTINGS}
                          onClick={() => setNotifMenuOpen(false)}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Settings className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <Separator className="shrink-0" />

                    {/* Notification list - native scrolling with scroll containment */}
                    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                      {groupedNotifications.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Bell className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">No notifications yet</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              We'll let you know when something arrives.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-1">
                          {groupedNotifications.map((group) => (
                            <div key={group.group}>
                              {/* Group header */}
                              <div className="px-4 py-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  {group.label}
                                </span>
                              </div>

                              {group.items.map((notification) => (
                                <button
                                  key={notification.id}
                                  onClick={() => {
                                    setNotifList((prev) =>
                                      prev.map((n) =>
                                        n.id === notification.id ? { ...n, read: true } : n
                                      )
                                    );
                                  }}
                                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                                    !notification.read ? 'bg-primary/[0.03]' : ''
                                  }`}
                                >
                                  {/* Avatar */}
                                  <div className="relative shrink-0">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                      {notification.avatarFallback}
                                    </div>
                                    {!notification.read && (
                                      <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                                    )}
                                  </div>

                                  {/* Content */}
                                  <div className="min-w-0 flex-1 space-y-0.5">
                                    <p
                                      className={`text-sm leading-tight ${
                                        !notification.read ? 'font-semibold' : 'font-medium text-muted-foreground'
                                      }`}
                                    >
                                      {notification.title}
                                    </p>
                                    <p
                                      className={`text-xs leading-relaxed ${
                                        !notification.read ? 'text-muted-foreground/80' : 'text-muted-foreground/60'
                                      }`}
                                    >
                                      {notification.message}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground/40">
                                      {notification.time}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ))}

                          {/* View all - inside scroll area as last item */}
                          <Separator className="my-1" />
                          <div className="px-4 py-3">
                            <Link
                              to={ROUTES.PROFILE.INDEX}
                              onClick={() => setNotifMenuOpen(false)}
                              className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                            >
                              View all notifications
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profile Menu - Collapsible Toggle */}
        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            className="relative h-9 gap-2 rounded-full px-2"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-expanded={profileMenuOpen}
            aria-haspopup="true"
          >
            <Avatar className="h-9 w-9 ring-2 ring-primary/10 transition-all hover:ring-primary/30">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline-block max-w-[120px] truncate">
              {user?.name}
            </span>
            <ChevronDown
              className={`hidden h-4 w-4 text-muted-foreground transition-transform duration-200 md:block ${
                profileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>

          <AnimatePresence>
            {profileMenuOpen && (
              <>
                {/* Backdrop for mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 md:hidden"
                  onClick={() => setProfileMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"
                >
                  {/* User info header */}
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="mt-1 text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>

                  <Separator className="my-1" />

                  {/* Profile button */}
                  <Link
                    to={ROUTES.PROFILE.INDEX}
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  {/* Settings button */}
                  <Link
                    to={ROUTES.SETTINGS}
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>

                  {/* Transaction History button */}
                  <Link
                    to={ROUTES.TRANSACTIONS}
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Receipt className="h-4 w-4" />
                    <span>Transaction History</span>
                  </Link>

                  <Separator className="my-1" />

                  {/* Logout button */}
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
