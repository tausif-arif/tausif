import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export const AudioEngine: React.FC = () => {
  const { audioEnabled, hasEntered } = useAppStore();
  
  // Create an audio context reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  useEffect(() => {
    if (audioEnabled && hasEntered) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Drone background sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low bass drone
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2); // Very quiet
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      
      // Setup global click listener for UI interaction sounds
      const playClickSound = () => {
        if (!audioEnabled || !audioCtxRef.current) return;
        const clickOsc = audioCtxRef.current.createOscillator();
        const clickGain = audioCtxRef.current.createGain();
        
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
        clickOsc.frequency.exponentialRampToValueAtTime(400, audioCtxRef.current.currentTime + 0.1);
        
        clickGain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
        
        clickOsc.connect(clickGain);
        clickGain.connect(audioCtxRef.current.destination);
        
        clickOsc.start();
        clickOsc.stop(audioCtxRef.current.currentTime + 0.1);
      };

      // Play hover sound for links and buttons
      const playHoverSound = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!audioEnabled || !audioCtxRef.current) return;
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
          const hoverOsc = audioCtxRef.current.createOscillator();
          const hoverGain = audioCtxRef.current.createGain();
          
          hoverOsc.type = 'sine';
          hoverOsc.frequency.setValueAtTime(600, audioCtxRef.current.currentTime);
          
          hoverGain.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime);
          hoverGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.05);
          
          hoverOsc.connect(hoverGain);
          hoverGain.connect(audioCtxRef.current.destination);
          
          hoverOsc.start();
          hoverOsc.stop(audioCtxRef.current.currentTime + 0.05);
        }
      };

      // Play elegant soothing heartbeat/thump beat on scroll
      let lastScrollY = window.scrollY;

      const playScrollBeat = () => {
        if (!audioEnabled || !audioCtxRef.current) return;
        
        const currentScrollY = window.scrollY;
        // Trigger a soft soothing beat every 300 pixels scrolled
        if (Math.abs(currentScrollY - lastScrollY) > 300) {
          lastScrollY = currentScrollY;
          
          const ctx = audioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          // Use a pure sine wave for a clean, sophisticated sound
          osc.type = 'sine'; 
          
          // High frequency (1000Hz) with zero pitch bending for a clean, sharp "tick"
          osc.frequency.setValueAtTime(1000, ctx.currentTime);
          
          // Ultra-fast envelope (15 milliseconds) to make it sound like a luxury watch tick 
          // or a premium UI click, rather than a childish drum.
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.001); // Instant attack, very quiet
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015); // Instant decay
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.015);
        }
      };
      
      window.addEventListener('click', playClickSound);
      window.addEventListener('mouseover', playHoverSound);
      window.addEventListener('scroll', playScrollBeat, { passive: true });

      return () => {
        osc.stop();
        osc.disconnect();
        window.removeEventListener('click', playClickSound);
        window.removeEventListener('mouseover', playHoverSound);
        window.removeEventListener('scroll', playScrollBeat);
      };
    } else if (!audioEnabled && audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  }, [audioEnabled, hasEntered]);

  return null;
};
