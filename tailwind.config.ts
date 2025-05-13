import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
      keyframes: {
        lineAnim: {
          '0%': { left: '-40%' },
          '50%': { left: '20%', width: '40%' },
          '100%': { left: '100%', width: '60%' },
        },
        blink: {
          "0%": {
            opacity: "0.3",
          },
          "20%": {
            opacity: "0.5",
          },
          "50%": {
            opacity: " 0.6",
          },
          "60%": {
            opacity: "0.7",
          },
          "70%": {
            opacity: "0.5",
          },
          "90%": {
            opacity: "0.3",
          },
          "100%": {
            opacity: "0.2",
          },
        },
      },
      animation: {
        spin: "spin 2s linear infinite", // This is the default animation-spin class provided by Tailwind
        slow: "spin 4s linear infinite", // Custom slow animation class
        blinker: "blink 1s linear infinite",
        lineAnim: 'lineAnim 1.2s linear infinite',
      },
      colors: {
        prime: {
          "blue-100": "#0047DA",
          "blue": "#0052ff",
          "background-100": "#24282d",
          "background-200": "#0D0F10",
          "background-300": "#15181B",
          "background": "#1A1D21",
          "zinc": "#F9F9F9",
          "zinc-50": "#CDCECF",
          "zinc-100": "#686B6E",
          "zinc-200": "#5a5a5a",
          "zinc-300": "#444444",
          "zinc-400": "#323538",
          "zinc-500": "#2c2d31",
          "gray-200": "#686B6E",
          "gray-400": "#F9F9F9",
          "green": "#3FB179",
          "red": "#E2695F"
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
