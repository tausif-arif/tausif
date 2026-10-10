import React, { useState } from 'react';

export function SshKeySetup() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const keygenCmd = 'ssh-keygen -t ed25519 -C "deploy-web-app" -f ~/.ssh/web_deploy_key -N ""';
  const serverCmd = `cat ~/.ssh/web_deploy_key.pub >> ~/.ssh/authorized_keys\nchmod 700 ~/.ssh\nchmod 600 ~/.ssh/authorized_keys`;

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>03 //</span> Setting Up Server SSH Access
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-4">
        Do not use your personal SSH key. Generate a dedicated key pair specifically for deployments so you can revoke it if a repository gets compromised.
      </p>

      <div className="bg-zinc-950 border border-white/10 overflow-hidden my-4 shadow-xl">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
            <i className="fas fa-terminal text-zinc-400"></i> Local Machine
          </span>
          <button
            onClick={() => copy(keygenCmd, 'keygen')}
            className="text-xs font-mono px-2 py-0.5 border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors"
          >
            {copied === 'keygen' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto bg-black/60">
          <code>{keygenCmd}</code>
        </pre>
      </div>

      <p className="text-zinc-300 text-sm leading-relaxed mb-4">
        Take the public key (<code className="text-zinc-200">web_deploy_key.pub</code>) and append it to the target user's authorized keys file on your server:
      </p>

      <div className="bg-zinc-950 border border-white/10 overflow-hidden my-4 shadow-xl">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
            <i className="fas fa-server text-zinc-400"></i> Server Terminal
          </span>
          <button
            onClick={() => copy(serverCmd, 'server')}
            className="text-xs font-mono px-2 py-0.5 border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors"
          >
            {copied === 'server' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
          <code>{serverCmd}</code>
        </pre>
      </div>
    </section>
  );
}
