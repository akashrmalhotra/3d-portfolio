import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1E3D", light: "#1E2F4F", deep: "#081226" },
        deepGreen: "#3A5A2B",
        sage: "#97A97C",
        olive: "#6B7C4A",
        cream: { DEFAULT: "#F5F1E8", warm: "#F0E9DB" },
        sand: "#D4C4A0",
        terracotta: "#B85042",
        offwhite: "#FAFAF7",
        charcoal: "#1A1A1A",
        skyblue: "#E8F2F7",
        sky2: "#C4DCE8",
        brown: { DEFAULT: "#6B4E3D", dark: "#4A3426" },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "iso-grid":
          "linear-gradient(60deg, rgba(15,30,61,0.06) 1px, transparent 1px), linear-gradient(-60deg, rgba(15,30,61,0.06) 1px, transparent 1px)",
      },
      backgroundSize: { "iso-grid": "40px 70px" },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 36s linear infinite",
        float: "float 6s ease-in-out infinite",
        "dash-slow": "dash 14s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        dash: { to: { strokeDashoffset: "-200" } },
      },
    },
  },
  plugins: [],
};

export default config;
