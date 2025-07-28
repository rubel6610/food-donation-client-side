/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        foodsavetheme: {
          "primary": "#4CAF50",
          "primary-content": "#ffffff",
          "secondary": "#FF9800",
          "secondary-content": "#ffffff",
          "accent": "#00ACC1",
          "accent-content": "#ffffff",

          "base-100": "#F9FAFB",
          "base-200": "#E5E7EB",
          "base-300": "#FFFFFF",
          "base-content": "#1F2937",

          "info": "#2196F3",
          "success": "#4CAF50",
          "warning": "#FFC107",
          "error": "#F44336",
        },
      },
    ],
  },
};
