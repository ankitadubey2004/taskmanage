// App.jsx - FINAL & COMPLETE

import React, { useState, useEffect } from 'react'; // Import useEffect
import { Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios'; // You'll need this for fetching tasks

// Import your components
import Layout from "./components/Layout";
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  // ==========================================================
  // 1. ADDED: State to hold all the tasks for the dashboard
  // ==========================================================
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // ==========================================================
  // 2. ADDED: useEffect to fetch tasks when the user is logged in
  // ==========================================================
  useEffect(() => {
    const fetchTasks = async () => {
      if (isLoggedIn) {
        try {
          // Example: Fetch tasks from your backend API
          // const token = localStorage.getItem('token');
          // const res = await axios.get('http://localhost:5000/api/tasks', { 
          //   headers: { 'x-auth-token': token } 
          // });
          // setTasks(res.data); // Update state with tasks from the API
          console.log("User is logged in, would fetch tasks now.");
        } catch (error) {
          console.error("Failed to fetch tasks", error);
        }
      }
    };
    fetchTasks();
  }, [isLoggedIn]); // This effect runs whenever isLoggedIn changes

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
        {/* ========================================================== */}
        {/* 3. ADDED: Pass 'tasks' and 'setTasks' props to the Dashboard */}
        {/* This fixes the "cannot read properties of undefined" error */}
        {/* ========================================================== */}
        <Route 
          path="dashboard" 
          element={<Dashboard tasks={tasks} setTasks={setTasks} />} 
        />
      </Route>
    </Routes>
  );
}

export default App;