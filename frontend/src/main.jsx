// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Make sure this is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This <BrowserRouter> must wrap your <App /> component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);