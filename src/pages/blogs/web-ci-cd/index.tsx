import React from 'react';
import { BlogHeader } from './components/BlogHeader';
import { PipelineDiagram } from './components/PipelineDiagram';
import { NodeVersionGuide } from './components/NodeVersionGuide';
import { SshKeySetup } from './components/SshKeySetup';
import { SecretsReference } from './components/SecretsReference';
import { WorkflowTabs } from './components/WorkflowTabs';
import { FrameworkOutputs } from './components/FrameworkOutputs';
import { GotchasSection } from './components/GotchasSection';
import { NginxConfigSection } from './components/NginxConfigSection';

export default function WebCICD() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-28 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <BlogHeader />
      <PipelineDiagram />
      <NodeVersionGuide />
      <SshKeySetup />
      <SecretsReference />
      <WorkflowTabs />
      <FrameworkOutputs />
      <GotchasSection />
      <NginxConfigSection />
    </article>
  );
}
