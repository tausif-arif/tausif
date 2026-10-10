import React from 'react';

export function PlayConsolePermissions() {
  const permissions = [
    {
      name: 'View app information (read-only)',
      status: 'Required',
      desc: 'Allows Fastlane to check bundle status and existing version codes.'
    },
    {
      name: 'Release apps to testing tracks',
      status: 'Required',
      desc: 'Required if you upload builds to Internal testing, Closed alpha, or Open beta tracks.'
    },
    {
      name: 'Release to production, exclude devices, and use Play App Signing',
      status: 'Production Only',
      desc: 'Enable this only if your automated pipeline directly releases to the public production track.'
    },
    {
      name: 'Admin (all permissions)',
      status: 'Do Not Enable',
      desc: 'Violates least-privilege security. An automation account should never have administrative account rights.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>03 //</span> Google Play Console Permissions
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Once you have the service account email from Google Cloud, link it inside Google Play Console at the developer account level:
      </p>

      <ol className="list-decimal pl-5 text-zinc-300 text-sm md:text-base space-y-3 mb-8">
        <li>Open <strong>Google Play Console</strong> and go to <strong>Users and permissions</strong> from the left sidebar.</li>
        <li>Click <strong>Invite new users</strong> and paste your service account email.</li>
        <li>Under <strong>App permissions</strong>, click <strong>Add app</strong> and select your React Native project. One service account can manage multiple apps.</li>
        <li>Assign only the essential permissions listed below. Do not grant full admin rights.</li>
        <li>Click <strong>Apply</strong>, then click <strong>Invite user</strong> to save.</li>
      </ol>

      <div className="overflow-x-auto border border-white/10 bg-zinc-950/60 shadow-xl">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-zinc-300 font-mono">
              <th className="p-4 font-bold">Permission</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-zinc-400">
            {permissions.map((p) => (
              <tr key={p.name}>
                <td className="p-4 font-bold text-white font-sans">{p.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[11px] border ${
                    p.status === 'Do Not Enable'
                      ? 'border-zinc-700 text-zinc-500 bg-zinc-900'
                      : 'border-white/30 text-white bg-white/5'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-zinc-300 font-sans">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
