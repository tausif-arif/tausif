import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function CiPipelineSnippet() {
  const [platform, setPlatform] = useState<'github' | 'gitlab'>('github');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const ghSnippet = `name: Deploy Android Release

on:
  push:
    branches:
      - main

jobs:
  deploy_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
          working-directory: android

      - run: npm ci

      - name: Build and Upload via Fastlane
        working-directory: android
        env:
          GOOGLE_PLAY_JSON: \${{ secrets.GOOGLE_PLAY_JSON }}
        run: |
          bundle exec fastlane android deploy_internal`;

  const glSnippet = `deploy_android:
  stage: deploy
  image: reactnativecommunity/react-native-android:latest
  before_script:
    - npm ci
    - cd android
    - bundle install
  script:
    - bundle exec fastlane android deploy_internal
  only:
    - main`;

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>06 //</span> Triggering in CI/CD
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        With the secrets and Fastlane lanes configured, your CI runner can build and publish the release directly:
      </p>

      <div className="flex items-center gap-3 mb-6 font-mono text-xs md:text-sm">
        <button
          onClick={() => setPlatform('github')}
          className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 ${
            platform === 'github'
              ? 'border-white text-white bg-white/10'
              : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
          }`}
        >
          <i className="fab fa-github text-sm"></i>
          <span>GitHub Actions</span>
        </button>

        <button
          onClick={() => setPlatform('gitlab')}
          className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 ${
            platform === 'gitlab'
              ? 'border-white text-white bg-white/10'
              : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
          }`}
        >
          <i className="fab fa-gitlab text-sm"></i>
          <span>GitLab CI/CD</span>
        </button>
      </div>

      <div className="bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-zinc-900/90 px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-400">
            {platform === 'github' ? '.github/workflows/android-deploy.yml' : '.gitlab-ci.yml'}
          </span>
          <button
            onClick={() => copy(platform === 'github' ? ghSnippet : glSnippet, 'ci-copy')}
            className="text-xs font-mono px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
          >
            {copied === 'ci-copy' ? 'Copied' : 'Copy Snippet'}
          </button>
        </div>
        <pre className="p-6 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
          <code>{platform === 'github' ? ghSnippet : glSnippet}</code>
        </pre>
      </div>

      <div className="mt-12 p-8 bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Your releases are now automated.</h4>
          <p className="text-sm text-zinc-400">Push to main or trigger your release tag to compile the bundle and upload to Play Console without manual clicks.</p>
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
