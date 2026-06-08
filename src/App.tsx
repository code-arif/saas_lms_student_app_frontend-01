import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { OfflineNotice } from './components/common/OfflineNotice';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <OfflineNotice />
    </>
  );
}

export default App;
