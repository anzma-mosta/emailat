/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000c7c",
        "background-light": "#f5f6f8",
        "background-dark": "#0f1123",
        "card-light": "#ffffff",
        "card-dark": "#1a2432",
        "surface-light": "#ffffff",
        "surface-dark": "#1a202c",
        "border-light": "#e6ebf4",
        "border-dark": "#2d3748",
        "text-primary-light": "#0c121d",
        "text-primary-dark": "#f7fafc",
        "text-secondary-light": "#4563a1",
        "text-secondary-dark": "#a0aec0",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

