import React from 'react';
import { Header } from './components/Header';
import { Visualizer } from './components/Visualizer';
import { EventLoopTheory } from './components/EventLoopTheory';
import { InterviewQuestions } from './components/InterviewQuestions';

export default function JSEventLoop() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-28 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Header />
      <Visualizer />
      <EventLoopTheory />
      <InterviewQuestions />
    </article>
  );
}
