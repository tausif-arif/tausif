import React, { useEffect } from 'react';

export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    });

    // We target elements with the 'section-animate' class (which we added to section tags)
    document.querySelectorAll(".section-animate").forEach((section) => {
      section.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-500"
      );
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};
