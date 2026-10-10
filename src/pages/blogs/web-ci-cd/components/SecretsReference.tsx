import React from 'react';

export function SecretsReference() {
  const secrets = [
    {
      name: 'SSH_PRIVATE_KEY',
      desc: 'The entire contents of web_deploy_key, starting with -----BEGIN and ending with -----END',
      gh: 'Settings > Secrets and variables > Actions',
      gl: 'Settings > CI/CD > Variables (Masked)'
    },
    {
      name: 'DEPLOY_HOST',
      desc: 'Server IP address or pointed domain (e.g. 198.51.100.24)',
      gh: 'Repository Secret',
      gl: 'CI/CD Variable'
    },
    {
      name: 'DEPLOY_USER',
      desc: 'Username with write permissions to web directory (e.g. deploy or ubuntu)',
      gh: 'Repository Secret',
      gl: 'CI/CD Variable'
    },
    {
      name: 'DEPLOY_PATH',
      desc: 'Destination path on VPS (e.g. /var/www/my-app/html)',
      gh: 'Repository Secret',
      gl: 'CI/CD Variable'
    },
    {
      name: 'DEPLOY_PORT',
      desc: 'SSH port (use 22 unless you changed default port in sshd_config)',
      gh: 'Repository Secret',
      gl: 'CI/CD Variable'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>04 //</span> Repository Secrets & Variables
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Store your credentials in your repository settings so they are never committed to git. Here is how they map between GitHub and GitLab:
      </p>

      <div className="overflow-x-auto border border-white/10 bg-zinc-950/60 shadow-xl">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-zinc-300 font-mono">
              <th className="p-4 font-bold">Key</th>
              <th className="p-4 font-bold">Description</th>
              <th className="p-4 font-bold text-white">GitHub</th>
              <th className="p-4 font-bold text-white">GitLab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-zinc-400">
            {secrets.map((item) => (
              <tr key={item.name}>
                <td className="p-4 font-bold text-white">{item.name}</td>
                <td className="p-4 text-zinc-300 font-sans">{item.desc}</td>
                <td className="p-4">{item.gh}</td>
                <td className="p-4">{item.gl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
