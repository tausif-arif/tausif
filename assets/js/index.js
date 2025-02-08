<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

const skills = [
    { name: "React Native", icon: "fab fa-react" },
    { name: "LLM Integration", icon: "fas fa-brain" },
    { name: "Python", icon: "fab fa-python" },
    { name: "FastAPI", icon: "fas fa-bolt" },
    { name: "LangChain", icon: "fas fa-link" },
    { name: "Node.js", icon: "fab fa-node" },
    { name: "Next Js", icon: "fab fa-js" },
    { name: "React Js", icon: "fab fa-react" },
    { name: "Docker", icon: "fab fa-docker" },
];

skills.forEach((skill) => {
    document.write(`
     <div class="flex flex-col items-center justify-center text-center">
  <i class="${skill.icon} skill-icon"></i>
  <h3 class="text-xl font-semibold">${skill.name}</h3>
</div> `);
});

particlesJS.load("particles-js", "particles.json", function () {
    console.log("Particles.js loaded!");
});

// Make particles interactive
particlesJS.interact("particles-js", {
    onhover: {
        enable: true,
        mode: "bubble",
    },
});


const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themes = [
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
    // {
    //   name: "Synthwave",
    //   background: "#1a0a2a",
    //   text: "#ffffff",
    //   accent: "#ff00ff",
    // },
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
    },
    // {
    //   name: "Guardians of the Galaxy",
    //   background: "#1a0a1a",
    //   text: "#ffffff",
    //   accent: "#ff6f61",
    // },
];

let currentTheme = 0; // Start with Neon Purple

function applyTheme(index) {
    const theme = themes[index];
    body.style.background = theme.background;
    body.style.color = theme.text;
    document.documentElement.style.setProperty("--accent", theme.accent);
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.background = theme.background; // Set footer background
    }
    themeToggle.innerText = `${theme.name}`; // Update button text
}

// Apply default theme on load
window.onload = () => {
    applyTheme(currentTheme);
};

themeToggle.addEventListener("click", () => {
    currentTheme = (currentTheme + 1) % themes.length;
    applyTheme(currentTheme);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
        }
    });
});

document.querySelectorAll("section").forEach((section) => {
    section.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-500"
    );
    observer.observe(section);
});