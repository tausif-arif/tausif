import React from 'react';

const experienceData = [
  {
    role: "Software Engineer",
    company: "Aeon Logiciel",
    date: "March 2024 - Present",
    description: "Built cross-platform mobile apps with React Native for iOS and Android, integrating LLM APIs for AI-powered features. Also provided web app support using React.js for seamless cross-platform performance."
  },
  {
    role: "Junior FullStack Engineer",
    company: "Aeon Logiciel",
    date: "Jan 2022 - March 2024",
    description: "Built cross-platform mobile apps with React Native for iOS and Android, Built APIs for Node.js focusing on scalability and robust backend architecture."
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="mb-32 section-animate relative z-10">
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-sm font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
          02 // History
        </h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
          Work Experience
        </h3>
      </div>
      
      <div className="flex flex-col">
        {experienceData.map((job, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12 py-8 group">
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-500"></div>
            
            {/* Timeline node */}
            <div 
              className="absolute left-[-4px] top-10 w-[9px] h-[9px] rounded-full transition-transform duration-500 group-hover:scale-150"
              style={{ backgroundColor: 'var(--accent)' }}
            ></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
              <div>
                <h4 className="text-2xl font-display font-bold tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                  {job.role}
                </h4>
                <p className="text-lg text-zinc-400 font-display">
                  {job.company}
                </p>
              </div>
              <div className="text-sm font-mono text-zinc-500 tracking-widest uppercase">
                {job.date}
              </div>
            </div>
            
            <p className="text-zinc-400 leading-relaxed font-light max-w-3xl">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
