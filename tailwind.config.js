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
        primary_hover: "#7e57a5",

        secondary: "#5957ff",
        tertary: "#b8aca2",
      },
      boxShadow: {
        primary: "0px 0px 140px 5px #ffff",
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
