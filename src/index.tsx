import React from 'react';
import './global.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Characters from './pages/Characters/Characters';
import { SWRConfig, Cache } from 'swr';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD9qwLwV1DD7c9ra4hDGe8K2RQaKVyuIP8',
  authDomain: 'starwars-character-list.firebaseapp.com',
  projectId: 'starwars-character-list',
  storageBucket: 'starwars-character-list.appspot.com',
  messagingSenderId: '246773930211',
  appId: '1:246773930211:web:9da6cf9b3bd0594f41cdd6',
  measurementId: 'G-1S0J7GD7SR',
};

const app = initializeApp(firebaseConfig);

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
getAnalytics(app);
