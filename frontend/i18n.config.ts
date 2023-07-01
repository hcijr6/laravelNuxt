import en from "./lang/en.json";
import es from "./lang/es.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  baseUrl: "http://localhost:3000/",
}));
