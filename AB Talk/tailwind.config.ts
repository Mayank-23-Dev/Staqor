import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e8602e",
          50: "#fff3ec",
          100: "#ffdccb",
          200: "#ffb899",
          300: "#ff9466",
          500: "#e8602e",
          600: "#c95326",
          700: "#a34420",
          800: "#7d3519",
        },
        surface: {
          canvas: "#1a1a1a",
          card: "#2a2a2a",
          dark: "#0f0f0f",
          elevated: "#1f2937",
          soft: "#f5f5f5",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          dark: "#2a2a2a",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#e8602e",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0a6df0",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#2a2a2a",
          foreground: "#979797",
        },
        accent: {
          DEFAULT: "#e8602e",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#2a2a2a",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#2a2a2a",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        field: "10px",
        box: "16px",
        selector: "32px",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "'Helvetica Neue'", "sans-serif"],
        machina: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        sans: ["'Inter'", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "'Helvetica Neue'", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
