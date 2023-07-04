/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0c0c0d",
        secondary_hover: "#b8aff9",
        secondary: "#757bc8",
        tertary: "#b8aca2",
        quaternary: "#1f1f1f",
      },
      boxShadow: {
        primary: "0px 0px 140px 5px #ffff",
        primary_hover:"0px 0px 10px 5px #1f1f1f",
        secondary_hover: "0px 0px 120px 5px #EFBF24",
        secondary: " 0px 0px 80px 5px #EFBF24",
      },
      textColor: {
        primary: "#5957ff",
        secondary: "#b8aca2",
      },
    },
  },
  plugins: [],
};
