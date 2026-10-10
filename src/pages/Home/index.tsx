import React from 'react';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Skills } from '../../components/Skills';
import { Experience } from '../../components/Experience';
import { Projects } from '../../components/Projects';
import { Footer } from '../../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </>
  );
}
