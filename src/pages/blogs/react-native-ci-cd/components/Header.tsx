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
        <span className="px-2.5 py-1 border border-white/20 text-zinc-300">React Native</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>Fastlane & Play Store</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>10 min read</span>
        <span className="w-1 h-1 bg-zinc-600"></span>
        <span>Oct 10, 2026</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight mb-4 text-white">
        React Native CI/CD
      </h1>

      <p className="text-base md:text-lg font-mono mb-6" style={{ color: 'var(--accent)' }}>
        Google Play Console & Google Cloud Service Account Setup for Fastlane
      </p>

      <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
        How to configure Google Cloud service accounts and Google Play Console permissions so Fastlane can authenticate and automatically upload React Native Android App Bundles (.aab) to testing and production tracks.
      </p>
    </header>
  );
}
