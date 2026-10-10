import React from 'react';

export function EmbeddingConcept() {
  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl mb-6 font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
        <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>02 //</span> What Is An Embedding? (The Simple Mental Model)
      </h2>

      <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
        <p>
          Computers do not understand language. They only understand math and numbers. If you store sentences in a traditional SQL database, the computer has zero idea what words actually mean.
        </p>

        <div className="p-6 bg-zinc-950 border border-white/10 my-6">
          <h3 className="text-base font-bold text-white mb-2 font-mono uppercase tracking-tight">
            The Keyword Search Failure
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">
            Imagine searching your product catalog for <code className="text-white bg-white/5 px-1.5 py-0.5 border border-white/10">"a tiny barking pet"</code>.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            A traditional SQL query (<code className="text-zinc-200">WHERE description LIKE '%tiny barking pet%'</code>) returns <strong>0 results</strong>, even if you have hundreds of products described as <em>"playful chihuahua puppies"</em>. The letters do not match, so the database assumes they have nothing in common.
          </p>
        </div>

        <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight mt-8 mb-3">
          Turning Meaning Into Map Coordinates
        </h3>

        <p>
          An <strong>Embedding Model</strong> is an AI trained to read text and assign it coordinates based on semantic meaning.
        </p>
        <p>
          In our 2D demo above, we used 2 numbers <code className="text-zinc-200">[x, y]</code>. In production models (like OpenAI <code className="text-zinc-200">text-embedding-3-small</code> or open-source HuggingFace models), an embedding is a list of <strong>1,536 or 3,072 numbers</strong> (dimensions).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-5 bg-zinc-950/60 border border-white/10">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Dimension 1: Living vs Object</span>
            <div className="text-sm font-bold text-white mb-2">Dog: +0.92 | Laptop: -0.85</div>
            <p className="text-xs text-zinc-400">Animals and living things score high, mechanical objects score low.</p>
          </div>

          <div className="p-5 bg-zinc-950/60 border border-white/10">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Dimension 2: Domestic vs Wild</span>
            <div className="text-sm font-bold text-white mb-2">Puppy: +0.88 | Wolf: -0.74</div>
            <p className="text-xs text-zinc-400">Captures whether the animal lives in homes or in the wilderness.</p>
          </div>

          <div className="p-5 bg-zinc-950/60 border border-white/10">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Combined Meaning</span>
            <div className="text-sm font-bold text-white mb-2">Semantic Proximity</div>
            <p className="text-xs text-zinc-400">When you plot thousands of concepts, words that mean similar things land right next to each other.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
