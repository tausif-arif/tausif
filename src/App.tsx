import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { SmoothScroll } from './components/SmoothScroll';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { BootSequence } from './components/BootSequence';
import { HUDOverlay } from './components/HUDOverlay';
import { CustomCursor } from './components/CustomCursor';
import { AudioEngine } from './components/AudioEngine';
import { ThreeScene } from './components/ThreeScene';
import { useAppStore } from './store/useAppStore';

import Home from './pages/Home';
import BlogsIndex from './pages/blogs';
import WebCICD from './pages/blogs/web-ci-cd';
import ReactNativeCICD from './pages/blogs/react-native-ci-cd';
import JSEventLoop from './pages/blogs/js-event-loop';
import EmbeddingsVectorDB from './pages/blogs/embeddings-vector-db';

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
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
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
          <main className="container mx-auto px-4 md:px-8 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<BlogsIndex />} />
              <Route path="/blogs/web-ci-cd" element={<WebCICD />} />
              <Route path="/blogs/react-native-ci-cd" element={<ReactNativeCICD />} />
              <Route path="/blogs/js-event-loop" element={<JSEventLoop />} />
              <Route path="/event-loop" element={<JSEventLoop />} />
              <Route path="/blogs/embeddings-vector-db" element={<EmbeddingsVectorDB />} />
              <Route path="/embeddings" element={<EmbeddingsVectorDB />} />
            </Routes>
          </main>
          <SmoothScroll />
        </div>
      )}
    </>
  );
}

export default App;
