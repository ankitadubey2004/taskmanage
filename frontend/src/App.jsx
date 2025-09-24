// App.jsx - FINAL & COMPLETE

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Layout from "./components/Layout";
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Register';
import MyTasks from './pages/MyTasks'; // Add this line to import the new page

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
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/"
        element={isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        
        <Route 
          path="dashboard" 
          element={<Dashboard />} 
        />
        
        {/* Add this new route for the My Tasks page */}
        <Route
          path="tasks"
          element={<MyTasks />}
        />
      </Route>
    </Routes>
  );
}

export default App;