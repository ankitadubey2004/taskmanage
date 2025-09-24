// src/components/Layout.jsx - UPDATED

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

// 1. Accept the 'onLogout' prop here
const Layout = ({ onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      {/* You can also pass it to the Navbar if needed */}
      <Navbar onLogout={onLogout} />
      <div className="flex flex-1">
        {/* 2. Pass the 'onLogout' prop down to the Sidebar */}
        <Sidebar onLogout={onLogout} />
        <main className="flex-grow p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;