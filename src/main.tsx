import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Import fonts from @fontsource - only critical weights
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
