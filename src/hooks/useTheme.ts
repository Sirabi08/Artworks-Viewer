import { useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        document.body.className = theme === 'light' ? 'dark-theme' : 'light-theme';
    };

    return { theme, toggleTheme };
};
