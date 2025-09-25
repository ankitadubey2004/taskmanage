import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title/Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-400 tracking-wide transform hover:scale-105 transition-transform duration-300">
          MiniJira
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-300 font-bold border-b-2 border-blue-300' : 'hover:text-blue-300 transition-colors'
            }
          >
          </NavLink>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transform hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;