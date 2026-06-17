import React from 'react';
import { useUIStore, type ThemeColor } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ColorOption {
  name: ThemeColor;
  tailwindClass: string;
  ringClass: string;
  label: string;
}

const colors: ColorOption[] = [
  { name: 'blue',    tailwindClass: 'bg-blue-500',    ringClass: 'ring-blue-500',    label: 'Blue' },
  { name: 'purple',  tailwindClass: 'bg-purple-500',  ringClass: 'ring-purple-500',  label: 'Purple' },
  { name: 'emerald', tailwindClass: 'bg-emerald-500', ringClass: 'ring-emerald-500', label: 'Emerald' },
  { name: 'indigo',  tailwindClass: 'bg-indigo-500',  ringClass: 'ring-indigo-500',  label: 'Indigo' },
  { name: 'orange',  tailwindClass: 'bg-orange-500',  ringClass: 'ring-orange-500',  label: 'Orange' },
  { name: 'rose',    tailwindClass: 'bg-rose-500',    ringClass: 'ring-rose-500',    label: 'Rose' },
  { name: 'teal',    tailwindClass: 'bg-teal-500',    ringClass: 'ring-teal-500',    label: 'Teal' },
];

const modeItems = [
  { mode: 'light' as const,  icon: Sun,     label: 'Light' },
  { mode: 'dark' as const,   icon: Moon,    label: 'Dark' },
  { mode: 'system' as const, icon: Monitor, label: 'System' },
];

export const ThemeSwitcher = () => {
  const { theme, themeColor, setTheme, setThemeColor } = useUIStore();

  const CurrentModeIcon = modeItems.find((m) => m.mode === theme)?.icon ?? Monitor;

  return (
    <div className="flex items-center gap-1">
      {/* Mode Toggle (Light / Dark / System) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme mode"
          >
            <CurrentModeIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {modeItems.map(({ mode, icon: Icon, label }) => (
            <DropdownMenuItem
              key={mode}
              onClick={() => setTheme(mode)}
              className="flex items-center"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="flex-1">{label}</span>
              {theme === mode && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Color Theme Picker */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Change theme color"
          >
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Change color theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-4 gap-2 p-3">
            {colors.map((color) => (
              <Tooltip key={color.name}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setThemeColor(color.name)}
                    className={cn(
                      'group relative flex h-9 w-9 items-center justify-center rounded-full transition-all',
                      'hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      color.tailwindClass,
                      themeColor === color.name &&
                        `ring-2 ring-offset-2 ring-offset-background ${color.ringClass}`
                    )}
                    aria-label={color.label}
                  >
                    {themeColor === color.name && (
                      <Check className="h-4 w-4 text-white drop-shadow-sm" />
                    )}
                    <span className="sr-only">{color.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{color.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
