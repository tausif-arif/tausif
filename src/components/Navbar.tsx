import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9001]">
        <div className="flex items-center gap-6 px-8 py-4 bg-black/60 backdrop-blur-[24px] rounded-full border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.8)]">
          <Link to="/" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-home text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">HOME</span>
          </Link>
          <a href="/#about" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-user text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">ABOUT</span>
          </a>
          <a href="/#skills" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-code text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">SKILLS</span>
          </a>
          <a href="/#experience" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-briefcase text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">WORK</span>
          </a>
          <a href="/#projects" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-layer-group text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">PROJECTS</span>
          </a>
          <Link to="/blogs" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-pen-nib text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">BLOGS</span>
          </Link>
          <a href="/#contact" className="group relative flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300">
            <i className="fas fa-envelope text-lg"></i>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] font-mono tracking-widest bg-white/10 px-3 py-1 rounded backdrop-blur-md">CONTACT</span>
          </a>
        </div>
      </div>
    </>
  );
};
