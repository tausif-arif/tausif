import React from 'react';

export const HUDOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[8000]">
      {/* Premium Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_120%)]"></div>
      
      {/* Minimalistic viewport framing */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/5 opacity-50 hidden md:block"></div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l hidden md:block" style={{ borderColor: 'var(--accent)', opacity: 0.5 }}></div>
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r hidden md:block" style={{ borderColor: 'var(--accent)', opacity: 0.5 }}></div>
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l hidden md:block" style={{ borderColor: 'var(--accent)', opacity: 0.5 }}></div>
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r hidden md:block" style={{ borderColor: 'var(--accent)', opacity: 0.5 }}></div>
      
      {/* Clean bottom text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase hidden md:block">
        V 2.0.4 // STABLE
      </div>
    </div>
  );
};
