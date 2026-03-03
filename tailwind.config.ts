import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1240px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "#384E36",
          foreground: "#f7f4ec"
        },
        secondary: {
          DEFAULT: "#9E4E1E",
          foreground: "#3f2f2a"
        },
        danger: "#B54B42"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.35rem",
        "3xl": "1.8rem"
      },
      boxShadow: {
        soft: "0 10px 30px -20px rgba(80, 70, 55, 0.32)",
        glass: "0 18px 42px -28px rgba(72, 61, 46, 0.26)",
        glow: "0 0 22px rgba(56, 78, 54, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
