import React from 'react';

export function EventLoopTheory() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl mb-6 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>02 //</span> How The Event Loop Actually Works
      </h2>

      <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
        <p>
          JavaScript is single-threaded. That means it has one Call Stack and can only do one thing at a time. It cannot execute two lines of code in parallel.
        </p>
        <p>
          However, the browser and Node.js environments are not single-threaded. When you call <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">fetch()</code> or <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">setTimeout()</code>, the JavaScript engine hands off that work to background threads handled by C++ (Web APIs in the browser or libuv in Node.js).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="p-6 bg-zinc-950/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-white"></span> Call Stack (LIFO)
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Last In, First Out. Every time a function is called, a new execution frame is pushed to the top of the stack. When the function returns, its frame is popped. If you run a massive loop or slow synchronous calculation here, the entire browser tab freezes because nothing else can run.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-white"></span> Web APIs Container
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Timers, HTTP requests, and DOM event listeners do not live inside the JS engine. They live in the browser runtime. When <code className="text-zinc-200">setTimeout(fn, 1000)</code> runs, the browser starts a 1000ms timer in the background while the JS call stack moves on immediately.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-white"></span> Microtask Queue (High Priority)
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Callbacks from <code className="text-zinc-200">Promise.then()</code>, <code className="text-zinc-200">Promise.catch()</code>, and <code className="text-zinc-200">queueMicrotask()</code> go here. When the Call Stack empties, the Event Loop drains the Microtask Queue completely before picking any macrotask.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-white"></span> Macrotask / Task Queue
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Callbacks from <code className="text-zinc-200">setTimeout</code>, <code className="text-zinc-200">setInterval</code>, and I/O events go here. The Event Loop processes only ONE macrotask at a time, then checks the microtask queue again and renders DOM updates.
            </p>
          </div>
        </div>

        <div className="p-6 bg-zinc-950 border border-white/20 my-6">
          <h4 className="text-base font-bold text-white font-mono uppercase tracking-tight mb-2">
            The Execution Rule Every Developer Must Remember
          </h4>
          <ol className="list-decimal pl-5 text-sm space-y-2 text-zinc-300">
            <li>Execute all synchronous code on the Call Stack until the stack is completely empty.</li>
            <li>Check the Microtask Queue. Run every microtask until the queue is completely empty (even if microtasks schedule more microtasks).</li>
            <li>Run the browser render/paint step if needed.</li>
            <li>Pick the oldest callback from the Macrotask Queue and push it onto the Call Stack to execute.</li>
            <li>Repeat the cycle infinitely. That is the Event Loop.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
