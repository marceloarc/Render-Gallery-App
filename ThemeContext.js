import React, { createContext, useState, useContext } from 'react';
import { dark, light } from './src/themes'; 

const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === 'dark' ? 'light' : 'dark'));
  };

  const themeStyles = theme === 'dark' ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
