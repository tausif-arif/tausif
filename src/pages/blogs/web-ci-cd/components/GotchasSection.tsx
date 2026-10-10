import React from 'react';

export function GotchasSection() {
  const gotchas = [
    {
      title: 'Runner hangs indefinitely on SSH connection',
      reason: 'When connecting to a new IP for the first time, SSH asks interactively: "Are you sure you want to continue connecting (yes/no)?". CI has no interactive prompt, so it stalls until timeout.',
      fix: 'ssh-keyscan -p $PORT -H $HOST >> ~/.ssh/known_hosts'
    },
    {
      title: 'ESLint warnings crash the build',
      reason: 'Most CI environments automatically set CI=true, which instructs bundlers like Vite or React Scripts to treat unused variable warnings as breaking compilation errors.',
      fix: 'CI=false npm run build'
    },
    {
      title: 'SSH key invalid format error',
      reason: 'Pasting the private key through web browsers can introduce invisible Windows carriage returns (\\r\\n). OpenSSH fails with "Load key: invalid format".',
      fix: 'echo "$SSH_KEY" | tr -d \'\\r\' > ~/.ssh/id_rsa'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>07 //</span> Real-World Gotchas
      </h2>

      <div className="space-y-6">
        {gotchas.map((item, index) => (
          <div key={index} className="p-6 bg-zinc-950/60 border border-white/10">
            <h4 className="text-base font-bold text-white font-mono mb-2 flex items-center gap-2">
              <i className="fas fa-triangle-exclamation text-xs text-zinc-400"></i>
              {item.title}
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              {item.reason}
            </p>
            <div className="bg-black/60 p-3 border border-white/10 font-mono text-xs text-zinc-200 overflow-x-auto">
              <code>{item.fix}</code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
