/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "600px": "600px", // Add a custom screen size for 400px
    },
    extend: {
      colors: {
        customBlue: "#022540",
      },
    },
  },
  plugins: [],
};
