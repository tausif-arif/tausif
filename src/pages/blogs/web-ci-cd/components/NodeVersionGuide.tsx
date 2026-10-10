import React from 'react';

export function NodeVersionGuide() {
  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>02 //</span> Node Versions: Match Your Project Spec
      </h2>

      <div className="bg-zinc-950 border border-white/20 p-6 md:p-8 my-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 border border-white/20 bg-zinc-900 flex items-center justify-center text-white shrink-0 mt-0.5">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
              Match Your Active Node Version
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-3">
              Avoid hardcoding generic Node versions from tutorials. If your local machine and package locks run Node 20, 22, or 24, using an older container will cause dependency errors or break build tools.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Check what you actually run locally with <code className="text-white bg-white/5 px-2 py-0.5 border border-white/10">node -v</code> or inspect your <code className="text-white bg-white/5 px-2 py-0.5 border border-white/10">.nvmrc</code> or <code className="text-white bg-white/5 px-2 py-0.5 border border-white/10">"engines"</code> key in package.json, and plug that exact version into your CI config.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-zinc-950/60 border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-3 text-white font-mono text-sm font-bold">
            <i className="fab fa-github text-lg"></i> GitHub Actions Config
          </div>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            In GitHub Actions, use <code className="text-zinc-200">actions/setup-node</code>. You can set your version explicitly or tell it to read from your <code className="text-zinc-200">.nvmrc</code> file directly:
          </p>
          <pre className="bg-black/60 p-4 text-xs font-mono text-zinc-200 overflow-x-auto border border-white/10 leading-relaxed">
            <code>{`- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'`}</code>
          </pre>
        </div>

        <div className="bg-zinc-950/60 border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-3 text-white font-mono text-sm font-bold">
            <i className="fab fa-gitlab text-lg"></i> GitLab CI Config
          </div>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            In GitLab CI, extract the Node version into a pipeline variable at the top of your YAML so it is not buried inside build steps:
          </p>
          <pre className="bg-black/60 p-4 text-xs font-mono text-zinc-200 overflow-x-auto border border-white/10 leading-relaxed">
            <code>{`variables:
  NODE_VERSION: "20"

build_app:
  image: node:\${NODE_VERSION}-alpine`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
