import React from 'react';
import { Header } from './components/Header';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { GoogleCloudSetup } from './components/GoogleCloudSetup';
import { PlayConsolePermissions } from './components/PlayConsolePermissions';
import { SecretStorageGuide } from './components/SecretStorageGuide';
import { FastlaneConfig } from './components/FastlaneConfig';
import { CiPipelineSnippet } from './components/CiPipelineSnippet';

export default function ReactNativeCICD() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-28 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Header />
      <ArchitectureFlow />
      <GoogleCloudSetup />
      <PlayConsolePermissions />
      <SecretStorageGuide />
      <FastlaneConfig />
      <CiPipelineSnippet />
    </article>
  );
}
