import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { OfflineNotice } from './components/common/OfflineNotice';
import { ThemeProvider } from './components/common/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <OfflineNotice />
    </ThemeProvider>
  );
}

export default App;
