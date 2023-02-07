/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx, js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        grayColor: "var(--gray)",
        bg: "var(--paper)",
        textColor: "var(--text)",
      },
    },
  },
  plugins: [],
};
