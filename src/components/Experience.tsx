import React from 'react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="mb-12 section-animate">
      <h2 className="text-4xl font-bold neon-text glitch-text mb-8">
        Work Experience
      </h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-content">
            <h3 className="text-xl font-semibold">Junior FullStack Engineer - Aeon Logiciel</h3>
            <p className="text-gray-400">Jan 2020 - Jan 2023</p>
            <p className="mt-2">
              Built cross-platform mobile apps with React Native for iOS and Android, Built apis for node js.
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h3 className="text-xl font-semibold">
              Software Engineer - Aeon Logiciel
            </h3>
            <p className="text-gray-400">Jan 2023 - Present</p>
            <p className="mt-2">
              Built cross-platform mobile apps with React Native for iOS and Android, integrating LLM APIs for
              AI-powered features. Also provided web app support using React.js for seamless cross-platform performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
