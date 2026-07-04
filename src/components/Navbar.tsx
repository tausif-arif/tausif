import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="dock-navbar">
      <a href="#home" className="dock-item"><i className="fas fa-home"></i></a>
      <a href="#skills" className="dock-item"><i className="fas fa-code"></i></a>
      <a href="#experience" className="dock-item"><i className="fas fa-briefcase"></i></a>
      <a href="#projects" className="dock-item"><i className="fas fa-project-diagram"></i></a>
      <a href="#contact" className="dock-item"><i className="fas fa-envelope"></i></a>
    </div>
  );
};
