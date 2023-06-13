export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_BASE_VERSION: process.env.API_BASE_VERSION,
      BASE_URL: process.env.BASE_URL,
    },
  },
  imports: {
    dirs: ["./utils"],
  },
});
