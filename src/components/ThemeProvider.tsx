import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'auto';

interface ThemeContextType {
    theme: Theme;
    resolved: 'dark' | 'light';
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'auto',
    resolved: 'dark',
    setTheme: () => { },
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

function resolveAuto(): 'dark' | 'light' {
    const hour = new Date().getHours();
    return (hour >= 7 && hour < 19) ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeRaw] = useState<Theme>(() => {
        try {
            return (localStorage.getItem('danno_theme') as Theme) || 'auto';
        } catch { return 'auto'; }
    });

    const resolved = theme === 'auto' ? resolveAuto() : theme;

    useEffect(() => {
        try { localStorage.setItem('danno_theme', theme); } catch { /* */ }
    }, [theme]);

    // Apply to document
    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('theme-dark', 'theme-light');
        html.classList.add(`theme-${resolved}`);

        // Update meta theme-color
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', resolved === 'dark' ? '#050505' : '#F0EBE3');
        }
    }, [resolved]);

    // Auto-update every minute when in auto mode
    useEffect(() => {
        if (theme !== 'auto') return;
        const interval = setInterval(() => {
            // Force re-render to check time
            setThemeRaw(prev => prev); // triggers resolved recalc
        }, 60000);
        return () => clearInterval(interval);
    }, [theme]);

    const setTheme = (t: Theme) => setThemeRaw(t);
    const toggleTheme = () => {
        setThemeRaw(prev => {
            if (prev === 'auto') return 'light';
            if (prev === 'light') return 'dark';
            return 'auto';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, resolved, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
