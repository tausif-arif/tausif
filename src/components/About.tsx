import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-32 section-animate relative z-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <div className="w-full lg:w-5/12 relative group">
            {/* Abstract Accent Box */}
            <div 
              className="absolute -inset-4 md:-inset-6 opacity-30 blur-2xl transition-all duration-1000 group-hover:opacity-60"
              style={{ backgroundColor: 'var(--accent)' }}
            ></div>
            
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10">
              <img 
                src="my_pic.PNG" 
                alt="Tausif Arif" 
                className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 transition-all duration-700 hover:scale-105" 
              />
              
              {/* Overlay gradient to fade edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
              <div className="absolute bottom-6 right-6 text-[10px] font-mono tracking-widest text-white/50 uppercase">
                SYS.ID // BR 01
              </div>
            </div>
          </div>

          {/* Typography Side */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <h2 className="text-sm font-mono tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
              00 // Origin
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-[1.1] mb-8">
              Engineer. <br />
              <span className="text-zinc-600">Visionary.</span>
            </h3>

            <div className="flex flex-col gap-6 text-zinc-400 font-light leading-relaxed text-lg max-w-2xl mx-auto">
          <p>
            With over <strong className="text-white font-medium">4 years of engineering experience</strong>, I stand at the crossroads of <strong className="text-white font-medium">React Native, AI, and scalable backend architecture</strong>. I am a software engineer focused on crafting solutions with rigorous precision and boundless ingenuity.
          </p>
          <p>
            I have architected, built, and shipped <strong className="text-white font-medium">12+ production applications</strong> across healthcare, fitness, B2B commerce, and loyalty ecosystems. By integrating powerful frameworks and <strong className="text-white font-medium">AI integrations</strong> with seamless mobile experiences, I don’t just write code—I engineer the next evolution of technology.
          </p>
          
          {/* Accent Line */}
          <div className="w-16 h-[1px] mx-auto mt-4 mb-2" style={{ backgroundColor: 'var(--accent)' }}></div>
          
          <p className="font-medium text-white italic">
            Suit up. The future isn't going to build itself.
          </p>
        </div>

            {/* Minimal Social Links */}
            <div className="flex gap-8 mt-12">
              <a href="https://x.com/__tausif" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://github.com/tausif-arif" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/original-tausif" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://ik.imagekit.io/h1bmmtcsq/tausif.pdf" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300 ml-auto border border-zinc-800 px-4 py-1 rounded text-xs font-mono uppercase tracking-widest flex items-center gap-2 hover:border-white">
                <i className="fas fa-file-pdf"></i> Resume
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
