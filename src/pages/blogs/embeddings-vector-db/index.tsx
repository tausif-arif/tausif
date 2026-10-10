import React from 'react';
import { Header } from './components/Header';
import { VectorVisualizer } from './components/VectorVisualizer';
import { EmbeddingConcept } from './components/EmbeddingConcept';
import { VectorDatabaseGuide } from './components/VectorDatabaseGuide';
import { RagWorkflow } from './components/RagWorkflow';

export default function EmbeddingsVectorDB() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-28 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Header />
      <VectorVisualizer />
      <EmbeddingConcept />
      <VectorDatabaseGuide />
      <RagWorkflow />
    </article>
  );
}
