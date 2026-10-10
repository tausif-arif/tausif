import React from 'react';
import { Link } from 'react-router-dom';

export function NginxConfigSection() {
  const nginxConfig = `server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}`;

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>08 //</span> Nginx SPA Fallback
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-4">
        If you deploy React Router or Vue Router with history mode, hitting refresh on <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">/blogs/web-ci-cd</code> gives a 404 unless Nginx falls back to <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">index.html</code>:
      </p>

      <div className="bg-zinc-950 border border-white/10 overflow-hidden my-6 shadow-xl">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center">
          <span className="text-xs font-mono text-zinc-400">/etc/nginx/sites-available/default</span>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed bg-black/60">
          <code>{nginxConfig}</code>
        </pre>
      </div>

      <div className="mt-12 p-8 bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">That is the whole setup.</h4>
          <p className="text-sm text-zinc-400">Pushes to main will build in the cloud and copy clean bundles to your server in seconds.</p>
        </div>
        <Link 
          to="/blogs" 
          className="px-6 py-2.5 border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono uppercase tracking-wider shrink-0"
        >
          Back to all blogs
        </Link>
      </div>
    </section>
  );
}
