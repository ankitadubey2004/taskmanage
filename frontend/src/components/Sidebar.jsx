// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon, // Better looking cog icon
  ArrowLeftOnRectangleIcon,
  TicketIcon, // A cute icon for the brand
} from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout }) => {
  const activeClass = "bg-blue-500 text-white";
  const inactiveClass = "hover:bg-slate-200 dark:hover:bg-slate-700";

  return (
    <aside className="w-64 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex flex-col p-4 border-r border-slate-200 dark:border-slate-700">
      
      {/* Logo and App Name */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <TicketIcon className="w-8 h-8 text-blue-500" />
        <span className="text-2xl font-bold">MiniJira</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? activeClass : inactiveClass}`
              }
            >
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? activeClass : inactiveClass}`
              }
            >
              <ClipboardDocumentListIcon className="w-6 h-6" />
              <span>My Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Cog6ToothIcon className="w-6 h-6" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User/Logout Section */}
      <div className="border-t border-slate-300 dark:border-slate-700 pt-4">
        <button
          onClick={onLogout}
          className="flex items-center w-full gap-3 px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;