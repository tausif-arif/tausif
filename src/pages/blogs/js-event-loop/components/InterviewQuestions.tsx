import React from 'react';
import { Link } from 'react-router-dom';

export function InterviewQuestions() {
  const questions = [
    {
      q: 'Why does Promise.then() run before setTimeout(..., 0)?',
      ans: 'Promise callbacks are classified as Microtasks, whereas setTimeout callbacks are Macrotasks. When the synchronous Call Stack empties, the Event Loop specification requires draining the entire Microtask Queue before processing any task from the Macrotask Queue. Therefore, Promise.then() always beats setTimeout(..., 0).'
    },
    {
      q: 'What is Microtask Starvation and how does it freeze a browser?',
      ans: 'Because the Event Loop drains all available microtasks before touching macrotasks or UI renders, an infinite loop of microtasks (such as a recursive Promise.then or queueMicrotask) will prevent the Event Loop from ever reaching the render stage or processing user clicks. The browser tab locks up completely.'
    },
    {
      q: 'Does setTimeout(fn, 0) guarantee execution in 0 milliseconds?',
      ans: 'No. The delay parameter specifies the minimum time before the callback is moved from the Web API container to the Macrotask Queue, not when it actually runs. If the Call Stack is busy running synchronous calculations or draining microtasks, the callback waits until the thread is free. Additionally, nested timers are clamped to a minimum of 4ms by the HTML spec.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-6 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>03 //</span> Top Event Loop Interview Questions
      </h2>

      <div className="space-y-4">
        {questions.map((item, idx) => (
          <div key={idx} className="p-6 bg-zinc-950/60 border border-white/10">
            <h4 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-mono">Q{idx + 1}.</span> {item.q}
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-light pl-6 border-l border-white/10 mt-3">
              {item.ans}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Explore More Articles</h4>
          <p className="text-sm text-zinc-400 font-light">Check out automated deployment guides for React Native and Web applications.</p>
        </div>
        <Link 
          to="/blogs" 
          className="px-6 py-2.5 border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono uppercase tracking-wider shrink-0"
        >
          Back to all blogs
        </Link>
      </div>
    </section>
  );
}
