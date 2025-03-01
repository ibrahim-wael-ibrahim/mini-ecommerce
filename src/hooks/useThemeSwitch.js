import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeSwitch() {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // Ensure hydration is complete before accessing the theme
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Function to toggle the theme
    const toggleTheme = () => {
        if (resolvedTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return { isMounted, resolvedTheme, toggleTheme };
}