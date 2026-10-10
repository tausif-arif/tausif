import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../store/useAppStore';

const getSystemInfo = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    return { os: 'iOS Mobile Device', icon: 'fab fa-apple', brand: 'APPLE MOBILE' };
  }
  if (ua.includes('mac')) {
    return { os: 'macOS Environment', icon: 'fab fa-apple', brand: 'APPLE DESKTOP' };
  }
  if (ua.includes('android')) {
    return { os: 'Android System', icon: 'fab fa-android', brand: 'ANDROID MOBILE' };
  }
  if (ua.includes('win')) {
    return { os: 'Windows NT Kernel', icon: 'fab fa-windows', brand: 'MICROSOFT WINDOWS' };
  }
  if (ua.includes('linux')) {
    return { os: 'Linux Kernel System', icon: 'fab fa-linux', brand: 'LINUX OS' };
  }
  return { os: 'Generic UNIX System', icon: 'fas fa-terminal', brand: 'UNKNOWN OS' };
};

export const BootSequence: React.FC = () => {
  const { hasEntered, setHasEntered, setAudioEnabled } = useAppStore();
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showFakeError, setShowFakeError] = useState(true);
  const [sysInfo, setSysInfo] = useState({ os: '', icon: '', brand: '' });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasEntered || window.location.pathname.startsWith('/blogs') || window.location.pathname.startsWith('/event-loop') || window.location.pathname.startsWith('/embeddings')) {
      setShowFakeError(false);
      return;
    }

    const errorTimer = setTimeout(() => {
      setShowFakeError(false);
      startBootSequence();
    }, 1500);

    return () => clearTimeout(errorTimer);
  }, [hasEntered]);

  const startBootSequence = () => {
    const info = getSystemInfo();
    setSysInfo(info);

    const BOOT_LINES = [
      "Tausif Core BIOS v4.51PG, An Energy Star Ally",
      "Copyright (C) 1984-2026, Core Matrix Systems, Inc.",
      "",
      "TAUSIF ARIF SYSTEM MAINBOARD REV. 2.0",
      "",
      `Target Environment: ${info.os}`,
      "Main Processor: Neural Net Processor, 4.20GHz",
      "Memory Testing: 1048576K OK",
      "",
      "Detecting IDE Primary Master... [Press F4 to skip]",
      "Found Drive: WDC WD5000AAKS-00UU3A0",
      "Detecting IDE Primary Slave... None",
      "Detecting IDE Secondary Master... ATAPI iHAS124",
      "Detecting IDE Secondary Slave... None",
      "",
      "System BIOS shadowed",
      "Video BIOS shadowed",
      "Loading OS Kernel...................... OK",
      "Mounting root filesystem............... OK",
      "Starting network interface............. OK",
      "Establishing secure connection......... OK",
      "Loading user interface................. DONE",
      "",
      "SYSTEM BOOT SUCCESSFUL."
    ];

    let index = 0;
    
    // Add first line immediately
    setLines([BOOT_LINES[0]]);
    index++;

    const interval = setInterval(() => {
      if (index < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsFinished(true), 600);
      }
    }, 120);
  };

  const handleEnter = (withAudio: boolean) => {
    setAudioEnabled(withAudio);

    if (withAudio) {
      // Play a nostalgic 8-bit BIOS POST double-beep
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          
          // iOS requires explicit resume sometimes
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          
          const beep = (freq: number, time: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square'; // classic 8-bit sound
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.3, ctx.currentTime + time);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(ctx.currentTime + time);
            osc.stop(ctx.currentTime + time + duration);
          };
          // Classic terminal double beep (loud enough for phones)
          beep(880, 0, 0.15);
          beep(1760, 0.2, 0.3);
        }
      } catch (e) {
        console.log("Audio not supported or blocked");
      }
    }

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

  if (showFakeError) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black text-white font-mono p-4 md:p-8 text-[10px] md:text-sm overflow-hidden flex flex-col justify-start items-start">
        <style>
          {`
            .glitch-anim {
              animation: errorGlitch 0.2s infinite;
            }
            @keyframes errorGlitch {
              0% { transform: translate(0) }
              20% { transform: translate(-2px, 1px) }
              40% { transform: translate(-1px, -1px) }
              60% { transform: translate(2px, 1px) }
              80% { transform: translate(1px, -1px) }
              100% { transform: translate(0) }
            }
          `}
        </style>
        <div className="glitch-anim">
          <p>panic(cpu 0 caller 0xffffff8000123456): Kernel trap at 0xffffff7f80000000, type 14=page fault</p>
          <p>Registers:</p>
          <p>CR0: 0x8001003b, CR2: 0xffffff8100000000, CR3: 0x0000000000000000, CR4: 0x0000000000000000</p>
          <p>RAX: 0x0000000000000000, RBX: 0xffffff8000000000, RCX: 0x0000000000000000, RDX: 0x0000000000000000</p>
          <p>RSP: 0xffffff9123456789, RBP: 0xffffff9123456789, RSI: 0x0000000000000000, RDI: 0x0000000000000000</p>
          <br/>
          <p>Fault CR2: 0xffffff8100000000, Error code: 0x0000000000000000, Fault CPU: 0x0, PL: 0, VF: 0</p>
          <br/>
          <p>System uptime in nanoseconds: 9876543210</p>
          <p className="bg-white text-black px-1 mt-4 inline-block font-bold">SYSTEM HALTED</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#050a05] text-[#4af626] font-mono retro-crt p-6 md:p-12 overflow-y-auto"
      style={{ opacity: 1, visibility: 'visible' }}
    >
      <style>
        {`
          .retro-crt::before {
            content: " ";
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(
              to bottom,
              rgba(255,255,255,0),
              rgba(255,255,255,0) 50%,
              rgba(0,0,0,0.4) 50%,
              rgba(0,0,0,0.4)
            );
            background-size: 100% 4px;
            z-index: 50;
            pointer-events: none;
          }
          .retro-crt::after {
            content: " ";
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(74, 246, 38, 0.03);
            opacity: 0;
            z-index: 50;
            pointer-events: none;
            animation: flicker 0.15s infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.01; }
            50% { opacity: 0.05; }
            100% { opacity: 0.01; }
          }
          .retro-glow {
            text-shadow: 0 0 5px rgba(74,246,38,0.5), 0 0 15px rgba(74,246,38,0.3);
          }
          .retro-btn {
            border: 1px solid #4af626;
            color: #4af626;
            background: transparent;
            text-shadow: 0 0 5px rgba(74,246,38,0.5);
            box-shadow: 0 0 5px rgba(74,246,38,0.2), inset 0 0 5px rgba(74,246,38,0.1);
          }
          .retro-btn:hover {
            background: #4af626;
            color: #050a05;
            box-shadow: 0 0 15px rgba(74,246,38,0.6), inset 0 0 10px rgba(74,246,38,0.4);
            text-shadow: none;
          }
          .retro-btn-secondary {
            border: 1px solid rgba(74,246,38,0.4);
            color: rgba(74,246,38,0.6);
            background: transparent;
          }
          .retro-btn-secondary:hover {
            border-color: #4af626;
            color: #4af626;
            box-shadow: 0 0 10px rgba(74,246,38,0.3);
          }
        `}
      </style>

      {/* OS Logo (Energy Star style position) */}
      {sysInfo.icon && (
        <div className="absolute top-6 right-8 md:top-12 md:right-16 opacity-70 flex flex-col items-center gap-2">
          <i className={`${sysInfo.icon} text-5xl md:text-7xl retro-glow`}></i>
          <span className="text-[8px] md:text-[10px] tracking-widest uppercase retro-glow">{sysInfo.brand}</span>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-1 text-sm md:text-base retro-glow">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.5rem] whitespace-pre-wrap">{line}</div>
        ))}

        {/* Blinking cursor effect before finishing */}
        {!isFinished && (
          <div className="animate-pulse w-3 h-[1em] bg-[#4af626] inline-block mt-1"></div>
        )}

        {/* Buttons appear inline after BIOS completes */}
        {isFinished && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start animate-in fade-in duration-1000">
            <button
              onClick={() => handleEnter(true)}
              className="px-6 py-3 transition-all duration-300 text-xs tracking-widest uppercase retro-btn cursor-pointer"
            >
              Enter with Sound
            </button>
            <button
              onClick={() => handleEnter(false)}
              className="px-6 py-3 transition-all duration-300 text-xs tracking-widest uppercase retro-btn-secondary cursor-pointer"
            >
              Enter without Sound
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
