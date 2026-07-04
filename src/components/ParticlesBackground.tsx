import React, { useEffect } from 'react';

// Declare particlesJS on Window for TS
declare global {
  interface Window {
    particlesJS: any;
  }
}

export const ParticlesBackground: React.FC = () => {
  useEffect(() => {
    // Wait for the script to load if it hasn't already
    const initParticles = () => {
      if (window.particlesJS) {
        window.particlesJS.load("particles-js", "particles.json", function () {
          console.log("Particles.js loaded!");
        });

        try {
          if (typeof window.particlesJS.interact === 'function') {
            // Make particles interactive
            window.particlesJS.interact("particles-js", {
              onhover: {
                enable: true,
                mode: "bubble",
              },
            });
          }
        } catch (error) {
          console.warn("particlesJS.interact is not available", error);
        }
      } else {
        setTimeout(initParticles, 100);
      }
    };
    initParticles();
  }, []);

  return <div id="particles-js" className="particles-js"></div>;
};
