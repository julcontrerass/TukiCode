import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Import fonts from @fontsource - optimized for performance
// Only load latin subset for better performance
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-600.css';
import '@fontsource/geist-sans/latin-700.css';

import '@fontsource/geist-mono/latin-400.css';
import '@fontsource/geist-mono/latin-700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
