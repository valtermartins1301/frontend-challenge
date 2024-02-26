import React from 'react';
import './global.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Characters from './Pages/Characters/Characters';
import { SWRConfig, Cache } from 'swr';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Characters />,
  },
]);

function sessionStorageProvider() {
  const map = new Map(JSON.parse(sessionStorage.getItem('app-cache') || '[]'));

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    sessionStorage.setItem('app-cache', appCache);
  });

  return map as Cache;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SWRConfig value={{ provider: sessionStorageProvider }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
);

reportWebVitals();
