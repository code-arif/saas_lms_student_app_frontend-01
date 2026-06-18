import React, { useState, useRef, useEffect } from 'react';
import { useUIStore, type ThemeColor } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [modeOpen, setModeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const modeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  const CurrentModeIcon = modeItems.find((m) => m.mode === theme)?.icon ?? Monitor;

  // Click-outside handler for both dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modeRef.current && !modeRef.current.contains(target)) {
        setModeOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(target)) {
        setColorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModeOpen(false);
        setColorOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="flex items-center gap-1">
      {/* Mode Toggle (Light / Dark / System) */}
      <div className="relative" ref={modeRef}>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
          onClick={() => { setModeOpen(!modeOpen); setColorOpen(false); }}
          aria-expanded={modeOpen}
          aria-haspopup="true"
          aria-label="Toggle theme mode"
        >
          <CurrentModeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <AnimatePresence>
          {modeOpen && (
            <>
              {/* Mobile backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 md:hidden"
                onClick={() => setModeOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"
              >
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Mode</div>
                <Separator className="my-1" />
                {modeItems.map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => { setTheme(mode); setModeOpen(false); }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-left transition-colors hover:bg-accent hover:text-accent-foreground',
                      theme === mode && 'bg-accent/50 font-medium'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                    {theme === mode && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Color Theme Picker */}
      <div className="relative" ref={colorRef}>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
          onClick={() => { setColorOpen(!colorOpen); setModeOpen(false); }}
          aria-expanded={colorOpen}
          aria-haspopup="true"
          aria-label="Change theme color"
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change color theme</span>
        </Button>

        <AnimatePresence>
          {colorOpen && (
            <>
              {/* Mobile backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 md:hidden"
                onClick={() => setColorOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"
              >
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Theme Color</div>
                <Separator className="my-1" />
                <div className="grid grid-cols-4 gap-2 p-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => { setThemeColor(color.name); setColorOpen(false); }}
                      className={cn(
                        'group relative flex h-9 w-9 items-center justify-center rounded-full transition-all',
                        'hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        color.tailwindClass,
                        themeColor === color.name &&
                          `ring-2 ring-offset-2 ring-offset-background ${color.ringClass}`
                      )}
                      aria-label={color.label}
                      title={color.label}
                    >
                      {themeColor === color.name && (
                        <Check className="h-4 w-4 text-white drop-shadow-sm" />
                      )}
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
