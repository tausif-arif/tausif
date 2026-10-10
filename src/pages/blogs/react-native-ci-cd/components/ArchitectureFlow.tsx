import React from 'react';

export function ArchitectureFlow() {
  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>01 //</span> How Authentication Works
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Your React Native app does not live inside Google Cloud. Google Cloud only provides the machine identity (Service Account). Google Play Console is where your app exists and where permissions are granted to that identity. Fastlane uses the downloaded JSON credentials to talk to the Google Play Developer API.
      </p>

      <div className="p-6 md:p-8 bg-zinc-950/80 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div className="min-w-[700px] flex items-center justify-between font-mono text-sm py-2 overflow-x-auto">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-14 h-14 bg-zinc-900 border border-white/20 flex items-center justify-center text-white">
              <i className="fas fa-code-commit text-xl"></i>
            </div>
            <span className="text-xs font-bold text-white">git push</span>
            <span className="text-[10px] text-zinc-500">React Native repo</span>
          </div>

          <div className="h-px bg-white/20 flex-1 mx-4 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45"></div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-40 p-4 bg-zinc-900 border border-white/20 flex flex-col items-center justify-center text-white">
              <i className="fas fa-mobile-screen text-lg mb-1"></i>
              <span className="font-bold text-xs uppercase tracking-wider">Gradle Build</span>
              <span className="text-[10px] text-zinc-400 font-mono">./gradlew bundleRelease</span>
              <span className="text-[9px] text-zinc-300 bg-black/60 px-2 py-0.5 mt-1 border border-white/10">.aab output</span>
            </div>
          </div>

          <div className="h-px bg-white/20 flex-1 mx-4 relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 bg-zinc-900 border border-white/10 px-2 py-0.5 font-mono">
              Fastlane
            </span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45"></div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-40 p-4 bg-zinc-900 border border-white/20 flex flex-col items-center justify-center text-white">
              <i className="fas fa-key text-lg mb-1"></i>
              <span className="font-bold text-xs uppercase tracking-wider">Service Account</span>
              <span className="text-[10px] text-zinc-400 font-mono">JSON Private Key</span>
              <span className="text-[9px] text-zinc-300 bg-black/60 px-2 py-0.5 mt-1 border border-white/10">Play Developer API</span>
            </div>
          </div>

          <div className="h-px bg-white/20 flex-1 mx-4 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45"></div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-14 h-14 bg-zinc-900 border border-white/20 flex items-center justify-center text-white">
              <i className="fab fa-google-play text-xl"></i>
            </div>
            <span className="text-xs font-bold text-white">Play Console</span>
            <span className="text-[10px] text-zinc-500">Internal / Prod Track</span>
          </div>
        </div>
      </div>
    </section>
  );
}
