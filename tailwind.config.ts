import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0A1F3D", light: "#16315C", deep: "#06152B" },
        gold: { DEFAULT: "#C9A961", warm: "#B89348", soft: "#E2CE9C" },
        cyan: { DEFAULT: "#2DD4E0", light: "#A8E6F0", deep: "#0F8E9C" },
        cream: { DEFAULT: "#F5F1E8", warm: "#EFE9D8" },
        offwhite: "#FAF7EE",
        charcoal: "#1A1A1A",
        ink: "#4A4A4A",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(10,31,61,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,31,61,0.06) 1px, transparent 1px)",
      },
      backgroundSize: { "grid-fine": "32px 32px" },
      animation: {
        "spin-slow": "spin 28s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        float: "float 6s ease-in-out infinite",
        "dash-slow": "dash 14s linear infinite",
        "pulse-soft": "pulseSoft 2.6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        dash: { to: { strokeDashoffset: "-200" } },
        pulseSoft: {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
