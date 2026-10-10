import React from 'react';

export function FrameworkOutputs() {
  const frameworks = [
    {
      name: 'Vite (React / Vue / Svelte)',
      output: 'dist/',
      note: 'Default for standard modern frontend toolchains.'
    },
    {
      name: 'Create React App',
      output: 'build/',
      note: 'Change artifact path and scp source from dist/ to build/.'
    },
    {
      name: 'Next.js (Static Export)',
      output: 'out/',
      note: 'Requires output: "export" inside next.config.js.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>06 //</span> Framework Output Folders
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Make sure the path you upload in the build stage matches the folder your bundler actually produces:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <div key={fw.name} className="p-5 bg-zinc-950/60 border border-white/10">
            <div className="text-sm font-bold text-white mb-1">{fw.name}</div>
            <div className="text-xs font-mono text-white mb-2 bg-white/5 inline-block px-1.5 py-0.5 border border-white/10">{fw.output}</div>
            <p className="text-xs text-zinc-400 leading-relaxed">{fw.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
