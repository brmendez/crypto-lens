import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'crypto-theme';
const THEME_ATTRIBUTE = 'data-theme';
const PREFERS_DARK_SCHEME = '(prefers-color-scheme: dark)';
export const LIGHT_THEME: Theme = 'light';
export const DARK_THEME: Theme = 'dark';
const USE_THEME_ERROR_MESSAGE = 'useTheme must be used within a ThemeProvider';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(USE_THEME_ERROR_MESSAGE);
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia(PREFERS_DARK_SCHEME).matches
      ? DARK_THEME
      : LIGHT_THEME;
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(nextTheme);

    window.gtag?.('event', 'theme_toggle', {
      theme: nextTheme,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
