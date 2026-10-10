import React, { useState, useEffect, useRef } from 'react';
import { parseAndSimulate, StepSnapshot } from './simulator';

const presets: Record<string, string> = {
  classic: `console.log('1: Sync Start');

setTimeout(() => {
  console.log('2: Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise microtask');
});

console.log('4: Sync End');`,

  promisePriority: `console.log('A');

setTimeout(() => {
  console.log('B: Task');
}, 0);

Promise.resolve().then(() => {
  console.log('C: Microtask 1');
});

Promise.resolve().then(() => {
  console.log('D: Microtask 2');
});

console.log('E');`,

  nestedMicrotask: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  Promise.resolve().then(() => {
    console.log('Nested Promise');
  });
});

console.log('End');`
};

export function Visualizer() {
  const [code, setCode] = useState(presets.classic);
  const [steps, setSteps] = useState<StepSnapshot[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const computedSteps = parseAndSimulate(code);
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [code]);

  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 1600);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, steps.length]);

  const current = steps[currentStepIndex] || {
    stepNumber: 1,
    title: 'Ready',
    description: 'Load code and run steps.',
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    logs: [],
    highlightSection: null
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <section className="mb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
          <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>01 //</span> Interactive Sandbox
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400">Presets:</span>
          <button
            onClick={() => setCode(presets.classic)}
            className="px-2.5 py-1 text-xs font-mono border border-white/10 hover:border-white text-zinc-300 hover:text-white transition-colors"
          >
            Classic Interview
          </button>
          <button
            onClick={() => setCode(presets.promisePriority)}
            className="px-2.5 py-1 text-xs font-mono border border-white/10 hover:border-white text-zinc-300 hover:text-white transition-colors"
          >
            Multiple Microtasks
          </button>
          <button
            onClick={() => setCode(presets.nestedMicrotask)}
            className="px-2.5 py-1 text-xs font-mono border border-white/10 hover:border-white text-zinc-300 hover:text-white transition-colors"
          >
            Nested Microtask
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-5 flex flex-col bg-zinc-950 border border-white/10 shadow-xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
              <i className="fas fa-code text-zinc-400"></i> Code Editor (Type or Paste)
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Live Simulation</span>
          </div>

          <div className="p-3 bg-black/80 flex-1 flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={11}
              className="w-full h-full bg-transparent text-xs md:text-sm font-mono text-zinc-200 outline-none resize-none p-2 border border-white/5 focus:border-white/20 transition-colors leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="p-3 border-t border-white/10 bg-zinc-900/40 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Lines: {code.split('\n').length}</span>
            <span>Total Steps: {steps.length}</span>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col bg-zinc-950 border border-white/10 shadow-xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
              <i className="fas fa-play text-zinc-400"></i> Playback Controls
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>

          <div className="p-4 bg-black/40 border-b border-white/10 flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 border border-white/20 text-xs font-mono text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300 transition-colors"
            >
              <i className="fas fa-step-backward mr-1"></i> Prev
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-1.5 border border-white/40 bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <>
                  <i className="fas fa-pause mr-1"></i> Pause
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-1"></i> Auto Step
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="px-3 py-1.5 border border-white/20 text-xs font-mono text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300 transition-colors"
            >
              Next <i className="fas fa-step-forward ml-1"></i>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors ml-auto"
            >
              <i className="fas fa-rotate-left mr-1"></i> Reset
            </button>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
              What Is Happening Now:
            </div>
            <div className="text-base font-bold text-white mb-2">
              {current.title}
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {current.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 bg-zinc-950 border transition-all duration-300 min-h-[220px] flex flex-col ${
          current.highlightSection === 'stack' ? 'border-white ring-1 ring-white/50' : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Call Stack
            </span>
            <span className="text-[10px] font-mono text-zinc-500">LIFO</span>
          </div>

          <div className="flex-1 flex flex-col-reverse gap-2 justify-start overflow-y-auto">
            {current.callStack.length === 0 ? (
              <span className="text-xs font-mono text-zinc-600 italic m-auto">Empty Stack</span>
            ) : (
              current.callStack.map((frame, idx) => (
                <div key={idx} className="p-2.5 bg-white/10 border border-white/20 text-xs font-mono text-white flex items-center justify-between">
                  <span className="truncate">{frame}</span>
                  <span className="text-[10px] text-zinc-400">frame</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`p-4 bg-zinc-950 border transition-all duration-300 min-h-[220px] flex flex-col ${
          current.highlightSection === 'webapi' ? 'border-white ring-1 ring-white/50' : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Web APIs / Timers
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Runtime</span>
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {current.webApis.length === 0 ? (
              <span className="text-xs font-mono text-zinc-600 italic m-auto">No Active Timers</span>
            ) : (
              current.webApis.map((api, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 border border-white/20 text-xs font-mono text-zinc-300">
                  {api}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`p-4 bg-zinc-950 border transition-all duration-300 min-h-[220px] flex flex-col ${
          current.highlightSection === 'microtask' ? 'border-white ring-1 ring-white/50' : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Microtask Queue</span>
              <span className="text-[9px] px-1 py-0.2 border border-white/30 text-white">HIGH</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500">FIFO</span>
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {current.microtaskQueue.length === 0 ? (
              <span className="text-xs font-mono text-zinc-600 italic m-auto">Queue Empty</span>
            ) : (
              current.microtaskQueue.map((task, idx) => (
                <div key={idx} className="p-2.5 bg-white/10 border border-white/20 text-xs font-mono text-white">
                  {task}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`p-4 bg-zinc-950 border transition-all duration-300 min-h-[220px] flex flex-col ${
          current.highlightSection === 'macrotask' ? 'border-white ring-1 ring-white/50' : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Macrotask Queue
            </span>
            <span className="text-[10px] font-mono text-zinc-500">FIFO</span>
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {current.macrotaskQueue.length === 0 ? (
              <span className="text-xs font-mono text-zinc-600 italic m-auto">Queue Empty</span>
            ) : (
              current.macrotaskQueue.map((task, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  {task}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-white/10 shadow-xl">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
            <i className="fas fa-terminal text-zinc-400"></i> Console Output
          </span>
          <span className="text-[10px] font-mono text-zinc-500">{current.logs.length} logged items</span>
        </div>
        <div className="p-4 bg-black/90 font-mono text-xs min-h-[90px] flex flex-col gap-1.5">
          {current.logs.length === 0 ? (
            <span className="text-zinc-600 italic">No output printed yet...</span>
          ) : (
            current.logs.map((log, idx) => (
              <div key={idx} className="text-zinc-200 flex items-center gap-2">
                <span className="text-zinc-600">&gt;</span>
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
