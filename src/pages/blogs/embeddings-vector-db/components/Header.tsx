import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="mb-14 border-b border-white/10 pb-12">
      <div className="mb-10">
        <Link 
          to="/blogs" 
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to all blogs
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest text-zinc-400 mb-6 uppercase">
        <span className="px-2.5 py-1 border border-white/20 text-zinc-300">AI & Vectors</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>Interactive Visualizer</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>Semantic Search</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>Oct 10, 2026</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight mb-4 text-white">
        Embeddings & Vector Databases Explained
      </h1>

      <p className="text-base md:text-lg font-mono mb-6" style={{ color: 'var(--accent)' }}>
        Interactive 2D Space Visualizer: Storing Coordinates & Querying by Meaning
      </p>

      <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
        A simple, interactive mental model of how language models turn text into numbers, how vector databases store coordinates in semantic space, and how queries find answers based on meaning rather than keyword matches.
      </p>
    </header>
  );
}
