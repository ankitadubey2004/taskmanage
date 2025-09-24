import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default Layout;