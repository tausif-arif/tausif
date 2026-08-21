import React from 'react';

const groupedSkills = [
  {
    category: "Mobile Apps",
    number: "01",
    skills: [
      { name: "React Native", icon: "fab fa-react" },
      { name: "Expo", icon: "fas fa-mobile-alt" },
      { name: "iOS", icon: "fab fa-apple" },
      { name: "Android", icon: "fab fa-android" }
    ]
  },
  {
    category: "Frontend",
    number: "02",
    skills: [
      { name: "React.js", icon: "fab fa-react" },
      { name: "Next.js", icon: "fab fa-js" },
      { name: "TypeScript", icon: "fas fa-code" }
    ]
  },
  {
    category: "Backend",
    number: "03",
    skills: [
      { name: "Node.js", icon: "fab fa-node-js" },
      { name: "Supabase", icon: "fas fa-database" },
      { name: "Firebase", icon: "fas fa-fire" }
    ]
  },
  {
    category: "Tools & AI",
    number: "04",
    skills: [
      { name: "Git", icon: "fab fa-git-alt" },
      { name: "CI/CD", icon: "fas fa-infinity" },
      { name: "Fastlane", icon: "fas fa-space-shuttle" },
      { name: "LLMs", icon: "fas fa-brain" },
      { name: "AI Integration", icon: "fas fa-robot" }
    ]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-32 mt-12 section-animate relative z-10 w-full">
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-sm font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
          01 // Capabilities
        </h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
          Tech Arsenal
        </h3>
      </div>
      
      <div className="flex flex-col border-t border-zinc-800 w-full">
        {groupedSkills.map((group, idx) => (
          <div 
            key={idx} 
            className="group relative border-b border-zinc-800 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:bg-white/[0.02]"
          >
            {/* Left side: Category Name */}
            <div className="flex items-center gap-4 mb-6 md:mb-0 w-full md:w-1/3">
              <span className="text-xs font-mono text-zinc-600 group-hover:text-[var(--accent)] transition-colors duration-300">
                {group.number}
              </span>
              <h4 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-zinc-400 group-hover:text-white transition-colors duration-300">
                {group.category}
              </h4>
            </div>
            
            {/* Right side: Skills tags with Icons */}
            <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-2/3 justify-start md:justify-end">
              {group.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-4 py-2.5 rounded-none font-mono text-[10px] md:text-xs uppercase tracking-wider bg-black/40 border border-zinc-800 text-zinc-400 group-hover:border-[var(--accent)] group-hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <i className={`${skill.icon} text-sm group-hover:text-[var(--accent)] transition-colors duration-300`}></i>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
