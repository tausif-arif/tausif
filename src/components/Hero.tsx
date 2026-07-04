import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center section-animate">
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <h1 className="text-5xl font-bold neon-text glitch-text mt-6">
        Building the Future, One Line at a Time
      </h1>
      <p className="text-xl text-gray-400 mt-4">
        Where React Native, AI & Backend Tech Forge the Next Evolution
      </p>
    </section>
  );
};
