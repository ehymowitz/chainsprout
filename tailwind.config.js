/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["monospace"],
    },
    extend: {
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
