/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clear: "rgba(255, 255, 255, 0.8)",
        "clear-light": "rgba(255, 255, 255, 0.2)",
        "clear-dark": "rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
