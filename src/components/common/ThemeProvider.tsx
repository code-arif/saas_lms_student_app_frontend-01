import React, { useEffect, useCallback } from 'react';
import { useUIStore } from '@/store/uiStore';

/**
 * Applies theme mode (light/dark/system) + color (blue, purple, etc.)
 * CSS classes to <html> so that Tailwind v4's @theme variables react.
 *
 * Flash on initial load is prevented by an inline <script> in index.html
 * that reads localStorage and applies the saved classes synchronously
 * before React hydrates.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, themeColor } = useUIStore();

  const applyTheme = useCallback(() => {
    const root = window.document.documentElement;
    const classes: string[] = [];

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      classes.push(prefersDark ? 'dark' : 'light');
    } else {
      classes.push(theme);
    }
    classes.push(`theme-${themeColor}`);

    const currentClasses = Array.from(root.classList);
    const toRemove = currentClasses.filter(
      (c) => c.startsWith('theme-') || c === 'dark' || c === 'light'
    );
    if (toRemove.length > 0 || classes.some((c) => !currentClasses.includes(c))) {
      root.classList.remove(...toRemove);
      root.classList.add(...classes);
    }

    // Remove preload class after first application so CSS transitions work
    root.classList.remove('preload');
  }, [theme, themeColor]);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return <>{children}</>;
};
