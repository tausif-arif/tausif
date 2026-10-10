import React, { useState } from 'react';

export function FastlaneConfig() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const appfile = `json_key_data(ENV["GOOGLE_PLAY_JSON"])
package_name("com.yourcompany.yourapp")`;

  const fastfile = `default_platform(:android)

platform :android do
  lane :deploy_internal do
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android/"
    )

    upload_to_play_store(
      track: "internal",
      aab: "android/app/build/outputs/bundle/release/app-release.aab",
      skip_upload_metadata: true,
      skip_upload_images: true,
      skip_upload_screenshots: true
    )
  end

  lane :deploy_production do
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android/"
    )

    upload_to_play_store(
      track: "production",
      aab: "android/app/build/outputs/bundle/release/app-release.aab"
    )
  end
end`;

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>05 //</span> React Native Fastlane Setup
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Inside your React Native project, navigate to <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">android/fastlane</code>. You only need two files: <code className="text-white">Appfile</code> and <code className="text-white">Fastfile</code>. Fastlane accepts the raw JSON credential directly from an environment variable via <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">json_key_data</code> without saving the secret file to disk.
      </p>

      <div className="space-y-6">
        <div className="bg-zinc-950 border border-white/10 overflow-hidden shadow-xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
              <i className="fas fa-file-code text-zinc-400"></i> android/fastlane/Appfile
            </span>
            <button
              onClick={() => copy(appfile, 'appfile')}
              className="text-xs font-mono px-2 py-0.5 border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors"
            >
              {copied === 'appfile' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
            <code>{appfile}</code>
          </pre>
        </div>

        <div className="bg-zinc-950 border border-white/10 overflow-hidden shadow-xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
              <i className="fas fa-file-code text-zinc-400"></i> android/fastlane/Fastfile
            </span>
            <button
              onClick={() => copy(fastfile, 'fastfile')}
              className="text-xs font-mono px-2 py-0.5 border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors"
            >
              {copied === 'fastfile' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
            <code>{fastfile}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
