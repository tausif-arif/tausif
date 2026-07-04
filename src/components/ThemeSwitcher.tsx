import React, { useState, useEffect } from 'react';

const themes = [
  {
    name: "Dark Knight",
    background: "#0a0a0a",
    text: "#d4d4d4",
    accent: "#b0b0b0"
  },
  {
    name: "Neon Purple",
    background: "#1a1a2e",
    text: "#ffffff",
    accent: "#9c27b0",
  },
  {
    name: "Cyberpunk",
    background: "#0a0a0a",
    text: "#ffffff",
    accent: "#00ffea",
  },
  {
    name: "Matrix",
    background: "#000000",
    text: "#00ff00",
    accent: "#00ff00",
  },
  {
    name: "Iron Man",
    background: "#2a0a0a",
    text: "#ffcc00",
    accent: "#ff4444",
  },
  {
    name: "Captain America",
    background: "#0a0a2a",
    text: "#ffffff",
    accent: "#0044ff",
  },
  {
    name: "Knowhere",
    background: "#1a0a2a",
    text: "#ffffff",
    accent: "#ff9500",
  },
  {
    name: "Wakanda Forever",
    background: "#0a1a2a",
    text: "#ffffff",
    accent: "#b39ddb",
  },
  {
    name: "Nidavellir",
    background: "#0a1a1a",
    text: "#ffffff",
    accent: "#4caf50",
  },
  {
    name: "Neon Tokyo",
    background: "#1a1a2e",
    text: "#ffffff",
    accent: "#ff6f61",
  },
  {
    name: "Retro Futurism",
    background: "#0a1a2a",
    text: "#ffffff",
    accent: "#ffcc00",
  },
  {
    name: "Hulk",
    background: "#0a2a0a",
    text: "#ffffff",
    accent: "#4caf50",
  },
  {
    name: "Endgame",
    background: "#1a0a0a",
    text: "#ffffff",
    accent: "#ff4444",
  },
  {
    name: "Glacier",
    background: "#e7ebf8",
    text: "#004d40",
    accent: "#00bcd4",
  },
  {
    name: "ImGroot",
    background: "#0a0a1a",
    text: "#ffffff",
    accent: "#4caf50",
  }
];

export const ThemeSwitcher: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  useEffect(() => {
    const applyTheme = (index: number) => {
      const theme = themes[index];
      document.body.style.background = theme.background;
      document.body.style.color = theme.text;
      document.documentElement.style.setProperty("--accent", theme.accent);
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.background = theme.background;
      }
    };

    applyTheme(currentThemeIndex);
  }, [currentThemeIndex]);

  const toggleTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme} id="theme-toggle">
        {themes[currentThemeIndex].name}
      </button>
    </div>
  );
};
