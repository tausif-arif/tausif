import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer bg-gray-800 text-center py-6 mt-12 relative z-10">
      <p className="text-gray-400">
        © <span id="current-year">{currentYear}</span> My Portfolio. All rights reserved.
      </p>
      <p className="text-gray-400 mt-2">Made with ❤️ by Tausif</p>
    </footer>
  );
};
