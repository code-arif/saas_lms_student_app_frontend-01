import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROUTES } from '@/constants/routes';
import { LogOut, User, Settings, Bell, Menu, Search as SearchIcon, CheckCheck, ExternalLink } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Input } from '@/components/ui/input';

const notifications = [
  {
    id: 1,
    title: 'New course available',
    message: 'Advanced React Patterns has been published. Start learning today!',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Quiz graded',
    message: 'Your JavaScript Fundamentals quiz has been graded. You scored 90%!',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Certificate awarded',
    message: 'Congratulations! You earned a certificate for completing Python Basics.',
    time: '3 days ago',
    read: true,
  },
  {
    id: 4,
    title: 'Assignment reminder',
    message: 'Your Database Design project is due in 2 days. Submit it on time!',
    time: '5 days ago',
    read: true,
  },
];

export const Header = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { toggleSidebar } = useUIStore();

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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-sm font-semibold">Notifications</span>
              <Button variant="ghost" size="xs" className="h-auto gap-1 px-2 py-1 text-xs text-muted-foreground">
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </Button>
            </div>
            <Separator />
            <ScrollArea className="h-[300px]">
              <div className="py-1">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                    <Bell className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <div
                        className={`mt-0.5 flex h-2 w-2 shrink-0 rounded-full ${
                          notification.read ? 'bg-transparent' : 'bg-primary'
                        }`}
                      />
                      <div className="flex-1 space-y-0.5">
                        <p className="text-sm font-medium leading-tight">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-[11px] text-muted-foreground/60">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="px-4 py-2.5">
                  <Link
                    to={ROUTES.PROFILE.INDEX}
                    className="flex items-center justify-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    View all notifications
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 ring-2 ring-primary/10 transition-all hover:ring-primary/30">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={ROUTES.PROFILE.INDEX} className="flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={ROUTES.SETTINGS} className="flex w-full items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
