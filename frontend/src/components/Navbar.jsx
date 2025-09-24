import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-lg p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title/Logo */}
        <Link to="/" className="text-2xl font-bold text-emerald-400">
          MiniJira
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-emerald-400' : 'hover:text-emerald-300 transition-colors'
            }
          >
            Dashboard
          </NavLink>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20">
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
