import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP Reveal Animation
    const ctx = gsap.context(() => {
      gsap.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
      
      gsap.fromTo('.fade-in-text', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative z-10 px-4">
      <div className="flex flex-col gap-2 md:gap-4 items-center">
        
        {/* Massive Typography with Reveal Lines */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.9]">
          <div className="overflow-hidden py-2">
            <div className="reveal-text translate-y-[100%] opacity-0">Building</div>
          </div>
          <div className="overflow-hidden py-2">
            <div className="reveal-text translate-y-[100%] opacity-0 text-zinc-500">The Future</div>
          </div>
        </h1>
        
        <div className="w-24 h-[1px] bg-zinc-800 my-6 md:my-8 fade-in-text"></div>
        
        <p className="text-lg md:text-xl text-zinc-400 font-sans max-w-xl fade-in-text font-light tracking-wide">
          Where React Native, AI & Backend Tech Forge the Next Evolution.
        </p>
        
        <div className="mt-12 fade-in-text">
          <a href="#about" className="px-8 py-4 border border-zinc-700 text-sm font-sans tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 inline-block">
            Discover
          </a>
        </div>

      </div>
    </section>
  );
};
