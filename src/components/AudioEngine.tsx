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
      
      window.addEventListener('click', playClickSound);
      window.addEventListener('mouseover', playHoverSound);

      return () => {
        osc.stop();
        osc.disconnect();
        window.removeEventListener('click', playClickSound);
        window.removeEventListener('mouseover', playHoverSound);
      };
    } else if (!audioEnabled && audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  }, [audioEnabled, hasEntered]);

  return null;
};
