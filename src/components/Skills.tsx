import React from 'react';

const skillsData = [
  { name: "React Native", category: "Mobile App Development", icon: "fab fa-react" },
  { name: "LLM Integration", category: "Artificial Intelligence", icon: "fas fa-brain" },
  { name: "Python", category: "Backend / Scripting", icon: "fab fa-python" },
  { name: "FastAPI", category: "High-Performance APIs", icon: "fas fa-bolt" },
  { name: "LangChain", category: "AI Orchestration", icon: "fas fa-link" },
  { name: "Node.js", category: "Server-side Javascript", icon: "fab fa-node" },
  { name: "Next.js", category: "Fullstack Web", icon: "fab fa-js" },
  { name: "Docker", category: "Containerization", icon: "fab fa-docker" },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-32 mt-12 section-animate relative z-10">
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-sm font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
          01 // Capabilities
        </h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
          Tech Arsenal
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillsData.map((skill, idx) => (
          <div 
            key={idx} 
            className="group relative p-8 border border-white/10 hover:border-white/30 backdrop-blur-md bg-black/20 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle gradient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
              <i className={`${skill.icon} text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1`} style={{ color: 'var(--accent)' }}></i>
              
              <div>
                <h4 className="text-xl font-display font-medium tracking-tight mb-1 group-hover:text-white transition-colors">
                  {skill.name}
                </h4>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {skill.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
