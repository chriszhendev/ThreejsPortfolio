// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "c49d7f",
        darkPrimary: "a08068",
        lightPrimary: "e6c4aa",
      },
    },
  },
  plugins: [],
};
