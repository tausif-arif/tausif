import React from 'react';

export function GoogleCloudSetup() {
  const steps = [
    {
      num: '01',
      title: 'Create a Dedicated Project in Google Cloud',
      desc: 'Open Google Cloud Console, click the project selector, and select New Project. Name it something clear like client-play-store-cicd. You do not need a separate Google Cloud project for every app. One project can host the service account for multiple apps.'
    },
    {
      num: '02',
      title: 'Enable Google Play Android Developer API',
      desc: 'Navigate to APIs & Services > Library. Search for "Google Play Android Developer API", open it, and click Enable. This is the API Fastlane calls to communicate with Play Console.'
    },
    {
      num: '03',
      title: 'Create the Service Account',
      desc: 'Go to IAM & Admin > Service Accounts. Click Create Service Account. Name it android-release-cicd with a description like "Fastlane releases for React Native". Click Create and Continue.'
    },
    {
      num: '04',
      title: 'Leave GCP IAM Roles Empty',
      desc: 'When prompted to grant this service account access to project roles (Owner, Editor, etc.), leave it completely empty and click Continue, then Done. Google Cloud roles have no effect on Play Console permissions. Never assign Owner or Editor.'
    },
    {
      num: '05',
      title: 'Generate and Download the JSON Key',
      desc: 'Click on your newly created service account in the list. Go to the Keys tab, click Add Key > Create new key, choose JSON, and download it. This file contains the private key that authenticates Fastlane.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-4 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>02 //</span> Google Cloud Console Setup
      </h2>

      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        Follow these steps in Google Cloud to set up the identity and download your key:
      </p>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="p-5 md:p-6 bg-zinc-950/60 border border-white/10 flex flex-col md:flex-row gap-4">
            <span className="font-mono font-bold text-sm shrink-0" style={{ color: 'var(--accent)' }}>{step.num}</span>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
        <span className="text-zinc-400">Service account email format:</span>
        <code className="text-zinc-200">android-release-cicd@your-project-id.iam.gserviceaccount.com</code>
      </div>
    </section>
  );
}
