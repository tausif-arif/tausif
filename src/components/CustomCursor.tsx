import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only want the custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      // Move dot immediately
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Trailing follower with slight delay
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseDown = () => {
      gsap.to(followerRef.current, {
        scale: 0.5,
        duration: 0.2,
      });
      gsap.to(cursorRef.current, {
        scale: 2,
        duration: 0.2,
      });
    };

    const onMouseUp = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        duration: 0.2,
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-screen"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-50 mix-blend-screen transition-transform"
        style={{ borderColor: 'var(--accent)' }}
      />
    </>
  );
};
