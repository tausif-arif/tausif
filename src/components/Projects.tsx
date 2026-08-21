import React from 'react';

const projectsData = [
  {
    name: "Tufcon XT",
    category: "Professional Product",
    link: "https://play.google.com/store/apps/dev?id=7374322144752918906",
    description: "Independently delivered five mobile products supporting loyalty programs, dealer engagement, and B2B ordering. Scaled Tufcon Saathi to over 2,500 active users."
  },
  {
    name: "Fittest Club",
    category: "Professional Product",
    link: "https://play.google.com/store/apps/details?id=com.takethestep&hl=en_IN",
    description: "Developed and maintained mobile and web platforms for a fitness challenge ecosystem, integrating AI Coach support and leaderboard experiences."
  },
  {
    name: "Instamarkt",
    category: "Professional Product",
    link: "#",
    description: "Built three distinct applications for a US food delivery platform: consumer ordering, merchant management, and courier operations."
  },
  {
    name: "CNC Home",
    category: "Professional Product",
    link: "#",
    description: "Developed a clinic management platform covering appointment scheduling, patient records, and prescription generation."
  },
  {
    name: "iFixImg",
    category: "Personal Project",
    link: "https://www.ifiximg.com",
    description: "Developed a privacy-focused web application offering optimized image compression, AI background removal, and PDF manipulation."
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="mb-40 section-animate relative z-10">
      <div className="flex flex-col gap-4 mb-20">
        <h2 className="text-sm font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
          03 // Deployments
        </h2>
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tighter">
          Selected Works
        </h3>
      </div>

      <div className="flex flex-col border-b border-white/10">
        {projectsData.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target={project.link !== "#" ? "_blank" : "_self"}
            rel="noreferrer"
            className="group flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-t border-white/10 hover:bg-white/5 transition-colors duration-500 px-4 md:px-8 relative overflow-hidden"
          >
            {/* Hover Background Accent */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, var(--accent) 0%, transparent 100%)' }}
            ></div>

            {/* Left Side: Massive Title */}
            <div className="flex flex-col gap-2 relative z-10 w-full md:w-1/2 mb-6 md:mb-0">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                {String(idx + 1).padStart(2, '0')} // {project.category}
              </span>
              <h4 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter text-white group-hover:translate-x-4 transition-transform duration-500">
                {project.name}
              </h4>
            </div>

            {/* Right Side: Description and Arrow */}
            <div className="flex items-center gap-8 relative z-10 w-full md:w-1/2 md:justify-end">
              <p className="text-zinc-400 font-light text-sm md:text-base max-w-md group-hover:text-zinc-300 transition-colors duration-300">
                {project.description}
              </p>

              {project.link !== "#" && (
                <div className="hidden md:flex w-16 h-16 rounded-full border border-white/20 items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 shrink-0">
                  <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-500"></i>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
