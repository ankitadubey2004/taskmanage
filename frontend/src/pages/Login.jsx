// src/pages/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

// The component now accepts an `onLoginSuccess` prop from App.js
const Login = ({ onLoginSuccess }) => {
  // Step 1: Create state to hold email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to hold login errors
  const navigate = useNavigate(); // Hook for redirection

  const { email, password } = formData;

  // Step 2: Create a function to update state when user types
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 3: Create a function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default page reload

    try {
      // Step 4: Make the API call to your backend login route
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // The backend sends a token on successful login
      const { token } = res.data;
      
      // Step 5: Handle the successful login
      // Save the token to localStorage to keep the user logged in
      localStorage.setItem('token', token);
      
      // Notify the parent component (App.js) that login was successful
      onLoginSuccess();
      
      // Redirect the user to the dashboard
      navigate('/dashboard');

    } catch (err) {
      // If the backend returns an error (e.g., "Invalid credentials")
      setError(err.response?.data?.msg || 'An error occurred');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        {/* Step 6: Connect the form and inputs to React state and handlers */}
        <form onSubmit={onSubmit}>
          <div className="relative my-4">
            <input
              type="email"
              name="email" // Add name attribute
              value={email} // Connect to state
              onChange={onChange} // Connect to handler
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="...">Your Email</label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="password" // Add name attribute
              value={password} // Connect to state
              onChange={onChange} // Connect to handler
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="...">Your Password</label>
          </div>

          {/* Display error message if it exists */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300">
            Login
          </button>
          <div>
            <span className="text-sm text-gray-400">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;