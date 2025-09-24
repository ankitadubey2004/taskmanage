// src/components/Sidebar.jsx - UPDATED

import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

// 1. Accept the 'onLogout' prop here
const Sidebar = ({ onLogout }) => {
  const activeLinkStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
  };

  return (
    <aside className="w-64 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-10 text-center">
        MiniJira
      </div>

      <nav className="flex-grow">
        <ul>
          {/* Your NavLink items like Dashboard, My Tasks, etc. */}
          <li>
            <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="...">
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="mt-2">
             <NavLink to="/tasks" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="...">
               <ClipboardDocumentListIcon className="w-6 h-6" />
               <span>My Tasks</span>
             </NavLink>
          </li>
          <li className="mt-2">
             <NavLink to="/settings" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="...">
               <CogIcon className="w-6 h-6" />
               <span>Settings</span>
             </NavLink>
          </li>
        </ul>
      </nav>

      {/* User/Logout Section */}
      <div className="border-t border-slate-300 dark:border-slate-700 pt-4">
        {/* 2. Attach the onLogout function to the button's onClick event */}
        <button
          onClick={onLogout}
          className="flex items-center w-full gap-3 px-4 py-2 rounded-lg text-left hover:bg-red-500 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;