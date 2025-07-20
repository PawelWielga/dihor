import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';
import './i18n.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
