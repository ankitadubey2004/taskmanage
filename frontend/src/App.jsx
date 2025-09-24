// App.jsx - FINAL SETUP

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Layout from "./components/Layout";
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {/* ========================================================== */}
      {/* Public Routes (Visible to everyone)                       */}
      {/* ========================================================== */}
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
      />
      {/* CHANGE: Add the route for the Register page here */}
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* ========================================================== */}
      {/* Protected Routes (Visible only after login)               */}
      {/* ========================================================== */}
      <Route
        path="/"
        element={isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add other protected pages here */}
      </Route>

    </Routes>
  );
}

export default App;