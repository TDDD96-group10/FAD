import AppRoutes from './navigation/routes.tsx'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { useState } from 'react';


function App() {


  return (
    <MantineProvider defaultColorScheme='dark' >
    <>
      <AppRoutes/>
    </>
    </MantineProvider>

  )
}

export default App
