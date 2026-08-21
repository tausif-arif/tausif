import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 w-full overflow-hidden bg-transparent border-t border-white/10 pt-20 pb-10 px-4 mt-32">
      
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          
          {/* Massive CTA Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                03 // Contact
              </h2>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.9]">
                Let's Build <br/>
                <span className="text-zinc-600">The Future</span>
              </h3>
            </div>
            
            <a 
              href="mailto:tausifarif2@gmail.com" 
              className="px-8 py-4 border border-white/20 text-sm font-sans tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Transmit Signal
            </a>
          </div>

          <div className="w-full h-[1px] bg-white/10"></div>

          {/* Links and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex gap-8">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-xs tracking-widest uppercase">
                GitHub
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-xs tracking-widest uppercase">
                LinkedIn
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-xs tracking-widest uppercase">
                Twitter
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs font-mono text-zinc-600 tracking-widest uppercase">
                © {currentYear} Tausif. All rights reserved.
              </p>
              <p className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase mt-2">
                Designed with Precision
              </p>
            </div>
            
          </div>

        </div>
      </div>
      
      {/* Absolute massive background text (subtle) */}
      <div className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-[-1] opacity-5">
        <h1 className="text-[15vw] font-display font-bold tracking-tighter whitespace-nowrap uppercase">
          TAUSIF ARIF
        </h1>
      </div>
    </footer>
  );
};
