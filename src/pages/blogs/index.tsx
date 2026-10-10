import React from 'react';
import { Link } from 'react-router-dom';

const blogsData = [
  // {
  //   slug: "embeddings-vector-db",
  //   title: "Embeddings & Vector Databases Explained",
  //   subtitle: "Interactive 2D Space Visualizer: Storing Coordinates & Querying by Meaning",
  //   category: "AI & Vectors",
  //   readTime: "Interactive Tool",
  //   date: "Oct 10, 2026",
  //   description: "An interactive, visual mental model showing how language models convert text into numbers, store coordinates in vector space, and perform semantic search without keyword matching."
  // },
  // {
  //   slug: "js-event-loop",
  //   title: "JavaScript Event Loop Visualizer",
  //   subtitle: "Interactive Call Stack, Web APIs, Microtask & Task Queue Simulator",
  //   category: "JavaScript",
  //   readTime: "Interactive Tool",
  //   date: "Oct 10, 2026",
  //   description: "Type or paste any JavaScript code to step through how the Call Stack, Web APIs, Microtask Queue, and Macrotask Queue interact in real time."
  // },
  {
    slug: "react-native-ci-cd",
    title: "React Native CI/CD",
    subtitle: "Automating Android Releases with Fastlane & Google Play Console",
    category: "React Native",
    readTime: "8 min read",
    date: "Oct 10, 2026",
    description: "Step-by-step setup connecting Google Cloud service accounts and Google Play Console permissions so Fastlane can automatically upload Android App Bundles (.aab) without manual intervention."
  },
  {
    slug: "web-ci-cd",
    title: "Web Application CI/CD",
    subtitle: "Deploying Frontend Apps with GitHub Actions & GitLab CI",
    category: "Web DevOps",
    readTime: "9 min read",
    date: "Oct 10, 2026",
    description: "Production guide for compiling frontend assets in isolated CI runners with project-specific Node versions and deploying to remote Linux servers using SSH and SCP."
  }
];

export default function BlogsIndex() {
  return (
    <section className="min-h-screen pt-32 pb-24 max-w-5xl mx-auto px-4 relative z-10 animate-in fade-in duration-500">
      <div className="mb-14 border-b border-white/10 pb-8">
        <span
          className="text-xs font-mono tracking-widest uppercase mb-2 block"
          style={{ color: 'var(--accent)' }}
        >
          Engineering Logs
        </span>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
          Technical Articles & Guides
        </h1>
        {/* <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-light">
          Practical guides on release automation, deployment pipelines, and mobile engineering without unnecessary fluff.
        </p> */}
      </div>

      <div className="flex flex-col gap-6">
        {blogsData.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blogs/${blog.slug}`}
            className="group block p-6 md:p-8 bg-zinc-950/60 hover:bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono border border-white/20 text-zinc-300">
                  {blog.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {blog.readTime}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {blog.date}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:translate-x-1 transition-transform mb-2 tracking-tight">
              {blog.title}
            </h2>

            <p className="text-sm font-mono text-zinc-400 mb-4">
              {blog.subtitle}
            </p>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl font-light">
              {blog.description}
            </p>

            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              <span>Read article</span>
              <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
