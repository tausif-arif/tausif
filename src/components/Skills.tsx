import React from 'react';

const skillsData = [
  { name: "React Native", icon: "fab fa-react" },
  { name: "LLM Integration", icon: "fas fa-brain" },
  { name: "Python", icon: "fab fa-python" },
  { name: "FastAPI", icon: "fas fa-bolt" },
  { name: "LangChain", icon: "fas fa-link" },
  { name: "Node.js", icon: "fab fa-node" },
  { name: "Next Js", icon: "fab fa-js" },
  { name: "Docker", icon: "fab fa-docker" },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-12 section-animate">
      <h2 className="text-4xl font-bold neon-text glitch-text mb-8">
        Tech Arsenal
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative">
        {skillsData.map((skill, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center">
            <i className={`${skill.icon} skill-icon`}></i>
            <h3 className="text-xl font-semibold">{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
