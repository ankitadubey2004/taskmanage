import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800/50 text-gray-400 p-4 text-center mt-auto">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} MiniJira. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;