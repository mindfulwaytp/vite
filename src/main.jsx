import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';  // ✅ ADD THIS
import App from './App.jsx';
import './index.css';
import { startAnalytics } from './lib/analytics';

// Prerendered pages ship JSON-LD in <head> for crawlers that don't run JS. React
// renders its own copy on mount, so drop the static one to avoid duplicate
// structured data (which Search Console flags as an error for FAQPage).
startAnalytics();

document
  .querySelectorAll('script[type="application/ld+json"][data-prerendered]')
  .forEach((el) => el.remove());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>  {/* ✅ WRAP HERE */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);