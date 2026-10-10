import React from 'react';

export function SecretStorageGuide() {
  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>04 //</span> Storing The JSON Key in CI/CD
      </h2>

      <div className="bg-zinc-950 border border-white/20 p-6 mb-6">
        <h3 className="text-base font-bold text-white uppercase tracking-tight mb-1">
          Never Commit The JSON Key To Git
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Anyone with this JSON key can upload releases to your Play Store listing. Add <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 border border-white/10">*.json</code> or <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 border border-white/10">play-store-key.json</code> to your <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 border border-white/10">.gitignore</code> immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-zinc-950/60 border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-3 text-white font-mono text-sm font-bold">
            <i className="fab fa-github text-lg"></i> GitHub Actions Secret
          </div>
          <ol className="text-xs text-zinc-300 space-y-2 list-decimal pl-4 leading-relaxed">
            <li>Go to <strong>Settings &gt; Secrets and variables &gt; Actions</strong>.</li>
            <li>Click <strong>New repository secret</strong>.</li>
            <li>Name: <code className="text-white bg-white/5 px-1 py-0.5">GOOGLE_PLAY_JSON</code></li>
            <li>Value: Open the downloaded JSON file, copy the entire raw JSON text, and paste it here.</li>
          </ol>
        </div>

        <div className="bg-zinc-950/60 border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-3 text-white font-mono text-sm font-bold">
            <i className="fab fa-gitlab text-lg"></i> GitLab CI Variable
          </div>
          <ol className="text-xs text-zinc-300 space-y-2 list-decimal pl-4 leading-relaxed">
            <li>Go to <strong>Settings &gt; CI/CD &gt; Variables</strong>.</li>
            <li>Click <strong>Add variable</strong>.</li>
            <li>Key: <code className="text-white bg-white/5 px-1 py-0.5">GOOGLE_PLAY_JSON</code></li>
            <li>Value: Paste the entire JSON string. Check <strong>Protected</strong> if building from release branches.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
