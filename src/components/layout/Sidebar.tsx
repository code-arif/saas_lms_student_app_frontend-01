import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  FileText, 
  User,
  Search
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

const navItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'My Courses', href: ROUTES.COURSES.MY_COURSES, icon: GraduationCap },
  { name: 'Browse Courses', href: ROUTES.COURSES.INDEX, icon: Search },
  { name: 'Certificates', href: ROUTES.CERTIFICATES, icon: Award },
  { name: 'Profile', href: ROUTES.PROFILE.INDEX, icon: User },
];

export const Sidebar = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform md:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
