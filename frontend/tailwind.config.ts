import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", 
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        background: '#0a0a0a',  // Huvudbakgrund
        primary: '#1f2937',     // Elementbakgrund
        accent: '#14b8a6',      // Neon-accentfärg
        text: '#ffffff',        // Standard textfärg
      },
    },
  },
  plugins: [],
};

export default config;
