'use client';

import { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Initialize with default values to prevent undefined errors
const defaultThemeContext: ThemeContextType = {
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Function to determine if system is in dark mode
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Apply theme to HTML element
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // First clear existing theme classes
      root.classList.remove('light', 'dark');
      
      // Add the new theme class
      root.classList.add(newTheme);
      
      // Update meta theme-color to match
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          newTheme === 'dark' ? '#121212' : '#ffffff'
        );
      }
    }
  };

  // Update resolved theme based on theme setting or system preference
  const updateResolvedTheme = () => {
    const newResolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  };

  // Set the theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      if (newTheme !== 'system') {
        localStorage.setItem('theme', newTheme);
      } else {
        localStorage.removeItem('theme');
      }
    }
    
    // Apply the theme immediately
    if (newTheme !== 'system') {
      applyTheme(newTheme);
      setResolvedTheme(newTheme);
    } else {
      const systemTheme = getSystemTheme();
      applyTheme(systemTheme);
      setResolvedTheme(systemTheme);
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // On first mount only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get saved theme on initial load
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme);
        setResolvedTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        const systemTheme = getSystemTheme();
        setThemeState('system');
        setResolvedTheme(systemTheme);
        applyTheme(systemTheme);
      }
    } catch (e) {
      // Handle localStorage not being available
      console.error('Error accessing localStorage:', e);
      const systemTheme = getSystemTheme();
      setThemeState('system');
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme);
    }
    
    // Mark as mounted
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = getSystemTheme();
        setResolvedTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };
    
    // Modern API
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Make sure the theme classes are applied immediately on client side
  useEffect(() => {
    if (mounted && theme === 'system') {
      updateResolvedTheme();
    }
  }, [mounted, theme]);

  // Skip rendering anything until mounted on the client
  // This avoids hydration mismatch issues
  if (!mounted) {
    return <>{children}</>;
  }

  const contextValue = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
} 