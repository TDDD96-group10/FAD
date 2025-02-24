import './App.css'
import AppRoutes from './navigation/routes.tsx'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';



function App() {
  

  return (
    <MantineProvider>
    <>
     <AppRoutes/>
    </>
    </MantineProvider>
  )
}

export default App
