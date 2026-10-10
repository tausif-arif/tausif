import React from 'react';
import { Link } from 'react-router-dom';

export function RagWorkflow() {
  const steps = [
    {
      num: '01',
      title: 'Split & Embed Documents',
      desc: 'Take your PDFs, articles, or codebase. Split them into chunks (e.g. 500 words). Send each chunk to an embedding model to get its vector representation.'
    },
    {
      num: '02',
      title: 'Store in Vector Database',
      desc: 'Save the vector coordinates alongside the original text chunk in your vector store (like pgvector or Pinecone) with an HNSW index.'
    },
    {
      num: '03',
      title: 'Embed User Question at Runtime',
      desc: 'When a user asks "How do I setup Fastlane?", convert that question into a query vector using the same embedding model.'
    },
    {
      num: '04',
      title: 'Retrieve Nearest Neighbors (RAG)',
      desc: 'Search the vector database to find the top 3 closest chunks in semantic space. Pass those chunks into your LLM prompt as context to generate a hallucination-free answer.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-6 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>04 //</span> How RAG (AI Search) Uses This Pipeline
      </h2>

      <div className="space-y-4 mb-10">
        {steps.map((step) => (
          <div key={step.num} className="p-5 md:p-6 bg-zinc-950/60 border border-white/10 flex flex-col md:flex-row gap-4">
            <span className="font-mono font-bold text-sm shrink-0" style={{ color: 'var(--accent)' }}>{step.num}</span>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Explore More Interactive Engineering Guides</h4>
          <p className="text-sm text-zinc-400 font-light">Check out the JavaScript Event Loop visualizer or mobile CI/CD pipelines.</p>
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
