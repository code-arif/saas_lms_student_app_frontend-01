import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export type ThemeColor = 'blue' | 'purple' | 'emerald' | 'indigo' | 'orange' | 'rose' | 'teal';
export type ThemeMode = 'light' | 'dark' | 'system';

interface UIState {
  /** Desktop sidebar collapse state (persisted) */
  isSidebarCollapsed: boolean;
  /** Mobile drawer open/close state (not persisted) */
  isMobileSidebarOpen: boolean;
  theme: ThemeMode;
  themeColor: ThemeColor;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setThemeColor: (color: ThemeColor) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      isMobileSidebarOpen: false,
      theme: 'system',
      themeColor: 'blue',
      toggleSidebar: () =>
        set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
      setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),
      toggleSidebarCollapsed: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
      setThemeColor: (color) => set({ themeColor: color }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist sidebar collapse, theme mode, and theme color
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        theme: state.theme,
        themeColor: state.themeColor,
      }),
    }
  )
);
