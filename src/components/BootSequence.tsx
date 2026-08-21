import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../store/useAppStore';

export const BootSequence: React.FC = () => {
  const { hasEntered, setHasEntered, setAudioEnabled } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Slower increments (1 to 3 at a time) to make the loading feel deliberate
      currentProgress += Math.floor(Math.random() * 3) + 1; 
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 800);
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = (withAudio: boolean) => {
    setAudioEnabled(withAudio);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setHasEntered(true);
        }
      });
    }
  };

  if (hasEntered) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white font-sans"
    >
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm w-full px-6">

        {/* Main Loading Number */}
        <div className="relative h-32 overflow-hidden w-full flex justify-center items-center">
          <h1
            className="text-8xl md:text-9xl font-display font-bold tracking-tighter"
            style={{
              opacity: isLoaded ? 0 : 1,
              transition: 'opacity 0.8s ease',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {progress}
          </h1>

          {/* Enter Buttons that fade in */}
          <div className={`absolute inset-0 flex flex-col gap-4 items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform translate-y-4'}`}>
            <button
              onClick={() => handleEnter(true)}
              className="w-full py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase"
            >
              Enter with Sound
            </button>
            <button
              onClick={() => handleEnter(false)}
              className="w-full py-3 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300 font-mono text-xs tracking-widest uppercase"
            >
              Enter without Sound
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-[1px] bg-zinc-900 overflow-hidden relative">
          <div
            className="h-full bg-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Funny quote */}
        <p className="text-xs text-zinc-400 font-mono italic text-center px-4 leading-relaxed max-w-xs">
          {isLoaded 
            ? `"See? Told you it would load. I don't mess up twice... mostly."`
            : `"It's loading, I promise. Don't give up on me, it always works out in the end!"`
          }
        </p>
      </div>
    </div>
  );
};
