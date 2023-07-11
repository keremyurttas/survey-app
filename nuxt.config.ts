// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    private: {},
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  },
  modules: ["@pinia/nuxt"],

  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/font.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
