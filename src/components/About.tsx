import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section min-h-screen flex flex-col justify-center items-center px-4 relative section-animate">
      <div className="absolute inset-0 z-0">
        <img src="my_pic.PNG" alt="Tausif Arif" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <h2 className="text-4xl font-bold neon-text glitch-text mb-8">About Me</h2>

        <p className="text-lg leading-relaxed text-gray-300">
          In a world where code is the lifeblood of innovation, one tech maverick stands at the crossroads of <strong
            className="text-blue-400"> React Native and AI.</strong>
          <strong className="text-blue-400">Tausif Arif</strong>—part developer, part futurist—crafts solutions with the
          precision of **Stark tech** and the ingenuity of **Wakandan design**.

          When others see limits, he sees a **sandbox of infinite possibilities**. Integrating **LLMs** with seamless user
          experiences,
          he doesn’t just write code—he **engineers the next evolution** of mobile technology.

          <span className="text-red-500 font-bold block mt-2">Suit up. The future isn't going to build itself. 🚀</span>
        </p>

        <div className="social-container mt-6 flex justify-center space-x-6">
          <a href="https://x.com/__tausif" target="_blank" rel="noreferrer" className="social-link social-twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/og.tausif" target="_blank" rel="noreferrer" className="social-link social-facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://github.com/tausif-arif" target="_blank" rel="noreferrer" className="social-link social-github">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/original-tausif" target="_blank" rel="noreferrer" className="social-link social-linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
