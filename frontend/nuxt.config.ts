export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/i18n", "nuxt-headlessui"],
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
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en.json",
        image: "/img/lang/en.png",
      },
      {
        name: "Español",
        code: "es",
        iso: "es-ES",
        file: "es.json",
        image: "/img/lang/es.png",
      },
    ],
    lazy: true,
    langDir: "lang",
  },
});
