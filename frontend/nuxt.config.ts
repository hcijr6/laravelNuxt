export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/i18n"],
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
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    vueI18n: "./i18n.config.ts",
  },
  plugins: [{ src: "./plugins/i18n-plugin.js", mode: "client" }],
});
