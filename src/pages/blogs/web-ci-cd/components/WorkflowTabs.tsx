import React, { useState } from 'react';

export function WorkflowTabs() {
  const [activePlatform, setActivePlatform] = useState<'github' | 'gitlab'>('github');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const githubYaml = `name: Web Deployment

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build Application
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci || npm install --legacy-peer-deps

      - env:
          CI: false
        run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist/
          retention-days: 1

  deploy:
    name: Deploy Over SSH
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: web-dist
          path: ./dist

      - env:
          SSH_KEY: \${{ secrets.SSH_PRIVATE_KEY }}
          HOST: \${{ secrets.DEPLOY_HOST }}
          PORT: \${{ secrets.DEPLOY_PORT || '22' }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" | tr -d '\\r' > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -p $PORT -H $HOST >> ~/.ssh/known_hosts 2>/dev/null || true
          chmod 644 ~/.ssh/known_hosts

      - env:
          USER: \${{ secrets.DEPLOY_USER }}
          HOST: \${{ secrets.DEPLOY_HOST }}
          PORT: \${{ secrets.DEPLOY_PORT || '22' }}
          TARGET: \${{ secrets.DEPLOY_PATH || '/var/www/html' }}
        run: |
          scp -P $PORT -r ./dist/* $USER@$HOST:$TARGET`;

  const gitlabYaml = `variables:
  NODE_VERSION: "20"
  DEPLOY_PORT: "22"
  DEPLOY_PATH: "/var/www/html"

stages:
  - build
  - deploy

build_app:
  stage: build
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci || npm install --legacy-peer-deps
    - apk add --no-cache curl
    - if [ -n "$ENV_PROD" ]; then echo "$ENV_PROD" > .env.production; fi
    - CI=false npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 day
  only:
    - main

deploy_to_server:
  stage: deploy
  image: alpine:latest
  dependencies:
    - build_app
  before_script:
    - apk add --no-cache openssh-client
    - if [ -z "$SSH_PRIVATE_KEY" ]; then echo "Missing SSH_PRIVATE_KEY" && exit 1; fi
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - echo "$SSH_PRIVATE_KEY" | tr -d '\\r' > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - eval $(ssh-agent -s)
    - ssh-add ~/.ssh/id_rsa
    - ssh-keyscan -p \${DEPLOY_PORT} $DEPLOY_HOST >> ~/.ssh/known_hosts 2>/dev/null || true
    - chmod 644 ~/.ssh/known_hosts
  script:
    - scp -P \${DEPLOY_PORT} -r dist/* $DEPLOY_USER@$DEPLOY_HOST:\${DEPLOY_PATH}
  only:
    - main`;

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>05 //</span> Pipeline Configuration Files
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Here are the exact configurations. Click the tabs below to choose between GitHub Actions and GitLab CI:
      </p>

      <div className="flex items-center gap-3 mb-6 font-mono text-xs md:text-sm">
        <button
          onClick={() => setActivePlatform('github')}
          className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 ${
            activePlatform === 'github'
              ? 'border-white text-white bg-white/10'
              : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
          }`}
        >
          <i className="fab fa-github text-sm"></i>
          <span>GitHub Actions</span>
        </button>

        <button
          onClick={() => setActivePlatform('gitlab')}
          className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 ${
            activePlatform === 'gitlab'
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
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
            <span>{activePlatform === 'github' ? '.github/workflows/deploy.yml' : '.gitlab-ci.yml'}</span>
          </div>
          <button
            onClick={() => copy(activePlatform === 'github' ? githubYaml : gitlabYaml, 'copy-code')}
            className="text-xs font-mono px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
          >
            {copied === 'copy-code' ? 'Copied' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-6 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
          <code>{activePlatform === 'github' ? githubYaml : gitlabYaml}</code>
        </pre>
      </div>
    </section>
  );
}
