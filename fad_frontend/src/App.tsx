//import './App.css'
import AppRoutes from './navigation/routes.tsx'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { useState } from 'react';


function App() {
  type ColorScheme = "dark" | "light" | "auto";

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MantineProvider defaultColorScheme='dark' >
    <>
      <AppRoutes/>
    </>
    </MantineProvider>

  )
}

export default App
