import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7A1E2B",
          dark: "#4A1119",
          light: "#9C2E3D",
        },
        marigold: {
          DEFAULT: "#E8A33D",
          light: "#F3C877",
          dark: "#C77F1F",
        },
        ivory: "#FBF3E7",
        ink: "#2B1A16",
        leaf: {
          DEFAULT: "#3D6B4A",
          light: "#568A63",
        },
        nightmaroon: "#1A0F0D",
        nightsurface: "#2B1714",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
      },
      keyframes: {
        steam: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)", opacity: "0.5" },
          "50%": { transform: "translateY(-8px) scaleY(1.05)", opacity: "0.9" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        steam: "steam 3.5s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
