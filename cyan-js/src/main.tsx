import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import './styles/globals.css';
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  </React.StrictMode>
); 