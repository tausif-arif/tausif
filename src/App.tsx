import React from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { ParticlesBackground } from './components/ParticlesBackground';
import { SmoothScroll } from './components/SmoothScroll';

function App() {
  return (
    <>
      <ThemeSwitcher />
      <div className="neon-grid"></div>
      <ParticlesBackground />
      <Navbar />
      
      <Hero />
      <About />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <Skills />
        <Experience />
      </main>

      <Footer />
      <SmoothScroll />
    </>
  );
}

export default App;
