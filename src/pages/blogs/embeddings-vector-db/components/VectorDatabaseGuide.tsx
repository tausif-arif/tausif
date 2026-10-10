import React from 'react';

export function VectorDatabaseGuide() {
  const indexes = [
    {
      name: 'Cosine Similarity',
      desc: 'Measures the cosine of the angle between two vectors. Values range from -1 to 1 (or 0% to 100%). Best when document length should not distort meaning.'
    },
    {
      name: 'Euclidean Distance (L2)',
      desc: 'Measures the straight-line distance between two points in space. Shorter distance means higher similarity.'
    },
    {
      name: 'HNSW Indexing (Hierarchical Navigable Small World)',
      desc: 'How vector databases search millions of vectors in under 10ms without checking every single row one-by-one. It builds multi-layered graphs like an express subway system.'
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-6 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>03 //</span> What Does A Vector Database Actually Do?
      </h2>

      <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
        <p>
          Once an AI model generates arrays of numbers for your documents, you need a place to store and search them.
        </p>
        <p>
          If you have 1,000,000 documents, comparing your search vector against every single vector one-by-one (brute force K-Nearest Neighbors) would take seconds or minutes and crash your server under heavy load.
        </p>

        <div className="p-6 bg-zinc-950 border border-white/20 my-6">
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-tight mb-2">
            Why Traditional Databases Struggle With Vectors
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">
            Relational databases (PostgreSQL, MySQL) index data with B-Trees. B-Trees work when numbers are 1-dimensional (e.g. <code className="text-white bg-white/5 px-1 py-0.5 border border-white/10">age &gt; 25</code> or alphabetical order).
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            When each record has 1,536 dimensions, you cannot sort with a standard B-Tree. Vector databases (such as <code className="text-zinc-200">pgvector</code>, <code className="text-zinc-200">Pinecone</code>, <code className="text-zinc-200">Qdrant</code>, or <code className="text-zinc-200">Milvus</code>) use specialized multidimensional geometric indexes like HNSW.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {indexes.map((item) => (
            <div key={item.name} className="p-5 bg-zinc-950/60 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 font-mono">{item.name}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
