// src/pages/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you've run 'npm install axios'

const Register = () => {
  // 1. State to hold form data (name, email, password)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  // 2. Handler to update state as the user types
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setSuccess('');

    try {
      // 4. API call to the backend registration route
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      setSuccess(res.data.msg); // Show success message from backend

      // 5. Redirect to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2-second delay

    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during registration.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={onSubmit}>
          {/* Name Input */}
          <div className="relative my-4">
            <input
              type="text"
              name="name" // Add name attribute
              value={name}
              onChange={onChange}
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="...">Your Name</label>
          </div>
          {/* Email Input */}
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="...">Your Email</label>
          </div>
          {/* Password Input */}
          <div className="relative my-4">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              minLength="6" // Good practice to add minLength
              required
            />
            <label className="...">Your Password</label>
          </div>

          {/* Display Success or Error Messages */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300">
            Register
          </button>
          <div>
            <span className="text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;