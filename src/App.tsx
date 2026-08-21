import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

import { ThemeSwitcher } from './components/ThemeSwitcher';
import { BootSequence } from './components/BootSequence';
import { HUDOverlay } from './components/HUDOverlay';
import { CustomCursor } from './components/CustomCursor';
import { AudioEngine } from './components/AudioEngine';
import { ThreeScene } from './components/ThreeScene';
import { useAppStore } from './store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { hasEntered } = useAppStore();

  useEffect(() => {
    if (hasEntered) {
      const sections = document.querySelectorAll('.section-animate');

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      });
    }
  }, [hasEntered]);

  return (
    <>
      <BootSequence />
      <AudioEngine />
      <CustomCursor />
      <ThreeScene />

      {hasEntered && (
        <div className="animate-in fade-in duration-1000 relative z-10">
          <ThemeSwitcher />
          <HUDOverlay />
          <Navbar />

          <Hero />
          <About />

          <main className="container mx-auto px-4 py-12">
            <Skills />
            <Experience />
          </main>

          <Footer />
          <SmoothScroll />
        </div>
      )}
    </>
  );
}

export default App;
