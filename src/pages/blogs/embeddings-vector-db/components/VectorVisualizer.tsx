import React, { useState } from 'react';
import { VectorPoint, initialPoints, computeMockEmbedding, cosineSimilarity } from './vectorMath';

export function VectorVisualizer() {
  const [points, setPoints] = useState<VectorPoint[]>(initialPoints);
  const [mode, setMode] = useState<'search' | 'embed'>('search');

  const [inputText, setInputText] = useState('Golden Retriever puppy');
  const [newVector, setNewVector] = useState<[number, number] | null>(null);

  const [queryText, setQueryText] = useState('a cute furry pet');
  const [queryVector, setQueryVector] = useState<[number, number] | null>([0.76, 0.83]);
  const [results, setResults] = useState<VectorPoint[]>([]);
  const [explanation, setExplanation] = useState('Query converted to vector [0.76, 0.83]. Nearest neighbors detected.');

  const handleEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const vec = computeMockEmbedding(inputText);
    setNewVector(vec);

    const newPoint: VectorPoint = {
      id: String(Date.now()),
      text: inputText.trim(),
      category: 'custom',
      vector: vec
    };

    setPoints(prev => [newPoint, ...prev]);
    setExplanation(`Text "${inputText}" was embedded into coordinates [${vec[0].toFixed(2)}, ${vec[1].toFixed(2)}] and saved in the Vector DB.`);
    setInputText('');
  };

  const handleSearch = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : queryText;
    if (!q.trim()) return;

    const vec = computeMockEmbedding(q);
    setQueryVector(vec);

    const scored = points.map(pt => ({
      ...pt,
      similarity: Number((cosineSimilarity(vec, pt.vector) * 100).toFixed(1))
    }));

    scored.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
    const topMatches = scored.slice(0, 4);
    setResults(topMatches);

    setExplanation(`Query "${q}" turned into vector [${vec[0].toFixed(2)}, ${vec[1].toFixed(2)}]. Found nearest neighbors based on distance in semantic space.`);
  };

  const toPercentX = (val: number) => ((val + 1) / 2) * 100;
  const toPercentY = (val: number) => (1 - (val + 1) / 2) * 100;

  return (
    <section className="mb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
          <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>01 //</span> Interactive Vector Space
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('search')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              mode === 'search'
                ? 'border-white text-white bg-white/10'
                : 'border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Mode 1: Semantic Query
          </button>
          <button
            onClick={() => setMode('embed')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              mode === 'embed'
                ? 'border-white text-white bg-white/10'
                : 'border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Mode 2: Embed & Store
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8 flex flex-col bg-zinc-950 border border-white/10 shadow-xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
              <i className="fas fa-crosshairs text-zinc-400"></i> 2D Semantic Space Grid
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Points grouped by meaning</span>
          </div>

          <div className="p-4 bg-black/80 relative h-[440px] border-b border-white/5 overflow-hidden select-none">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-20">
              <div className="border-r border-b border-white/20 p-2 text-[10px] font-mono text-zinc-400">Tech & Code Cluster [-X, +Y]</div>
              <div className="border-b border-white/20 p-2 text-[10px] font-mono text-zinc-400 text-right">Animals & Pets [+X, +Y]</div>
              <div className="border-r border-white/20 p-2 text-[10px] font-mono text-zinc-400 flex items-end">Food & Snacks [-X, -Y]</div>
              <div className="p-2 text-[10px] font-mono text-zinc-400 flex items-end justify-end">Nature & Plants [+X, -Y]</div>
            </div>

            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>

            {queryVector && (
              points.slice(0, 3).map((pt) => (
                <svg key={`line-${pt.id}`} className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <line
                    x1={`${toPercentX(queryVector[0])}%`}
                    y1={`${toPercentY(queryVector[1])}%`}
                    x2={`${toPercentX(pt.vector[0])}%`}
                    y2={`${toPercentY(pt.vector[1])}%`}
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="4"
                    strokeWidth="1"
                  />
                </svg>
              ))
            )}

            {points.map((pt) => {
              const isMatch = results.some(r => r.id === pt.id);
              return (
                <div
                  key={pt.id}
                  style={{
                    left: `${toPercentX(pt.vector[0])}%`,
                    top: `${toPercentY(pt.vector[1])}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute z-20 flex flex-col items-center group cursor-pointer transition-all duration-500"
                >
                  <div className={`w-3 h-3 border ${
                    isMatch
                      ? 'bg-white border-white ring-4 ring-white/20'
                      : 'bg-zinc-800 border-white/40 group-hover:border-white'
                  }`}></div>
                  <span className={`text-[10px] font-mono mt-1 px-1 whitespace-nowrap border ${
                    isMatch
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-black/90 text-zinc-400 border-white/10'
                  }`}>
                    {pt.text}
                  </span>
                </div>
              );
            })}

            {queryVector && (
              <div
                style={{
                  left: `${toPercentX(queryVector[0])}%`,
                  top: `${toPercentY(queryVector[1])}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-30 flex flex-col items-center pointer-events-none"
              >
                <div className="w-5 h-5 border-2 border-white bg-black/60 flex items-center justify-center animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
                <span className="text-[10px] font-mono mt-1 px-1.5 py-0.5 border border-white bg-black text-white font-bold">
                  QUERY: "{queryText}"
                </span>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
            <span>Points in Vector DB: {points.length}</span>
            <span className="text-zinc-500 text-[11px]">Notice how words with similar meaning cluster close to each other.</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-5 bg-zinc-950 border border-white/10 shadow-xl flex-1 flex flex-col">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">
              {mode === 'search' ? 'Test Semantic Queries' : 'Add New Embedding'}
            </div>

            {mode === 'search' ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                    Type a query (even with zero exact keyword match):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      placeholder="e.g. delicious fruit snack"
                      className="flex-1 bg-black/60 border border-white/20 p-2 text-xs font-mono text-white outline-none focus:border-white"
                    />
                    <button
                      onClick={() => handleSearch()}
                      className="px-3 py-2 border border-white bg-white/10 hover:bg-white hover:text-black transition-colors text-xs font-mono text-white"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-zinc-500">Quick presets to test:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'cute furry pet',
                      'programming code',
                      'sweet fruit snack',
                      'wild green forest'
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setQueryText(preset);
                          handleSearch(preset);
                        }}
                        className="px-2 py-1 text-[11px] font-mono border border-white/10 hover:border-white/40 text-zinc-300 hover:text-white transition-colors"
                      >
                        "{preset}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmbed} className="flex flex-col gap-3">
                <label className="text-[11px] font-mono text-zinc-400">
                  Type any word or concept to convert into numbers:
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. Kitten, Smartphone, Pasta"
                  className="bg-black/60 border border-white/20 p-2 text-xs font-mono text-white outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-white bg-white/10 hover:bg-white hover:text-black transition-colors text-xs font-mono text-white"
                >
                  Embed & Store into Vector DB
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex-1 flex flex-col justify-end">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                Engine Status:
              </span>
              <p className="text-xs font-mono text-zinc-300 leading-relaxed font-light">
                {explanation}
              </p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950 border border-white/10 shadow-xl">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
              <span>Nearest Matches (Top Results)</span>
              <span className="text-[10px] text-zinc-500">Cosine Match</span>
            </div>

            <div className="flex flex-col gap-2">
              {results.length === 0 ? (
                <span className="text-xs font-mono text-zinc-600 italic py-2">Click search to compute cosine similarity.</span>
              ) : (
                results.map((res, i) => (
                  <div key={res.id} className="p-2 border border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{i + 1}.</span>
                      <span className="text-white font-bold">{res.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400">[{res.vector[0].toFixed(2)}, {res.vector[1].toFixed(2)}]</span>
                      <span className="px-1.5 py-0.5 border border-white/30 text-white font-bold">
                        {res.similarity}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
