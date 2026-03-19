import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Load fonts non-blocking after initial render — out of critical CSS path
const loadFonts = () => {
  import('@fontsource/geist-sans/latin-400.css');
  import('@fontsource/geist-sans/latin-700.css');
};

if ('requestIdleCallback' in window) {
  requestIdleCallback(loadFonts, { timeout: 2000 });
} else {
  setTimeout(loadFonts, 200);
}
