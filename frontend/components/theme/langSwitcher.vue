<!-- components/LangSwitcher.vue -->

<script setup lang="ts">
// Used for type casting
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

// Get active locale and supported locales
const { locale, locales } = useI18n();
// Cast to avoid TypeScript errors in template
const supportedLocales = locales.value as Array<LocaleObject>;

const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

// When the visitor selects a new locale, route to
// to the new locale's path e.g. /en-CA/foo → /ar-EG/foo
function onLocaleChanged(event: Event) {
  const target = event.target as HTMLInputElement;

  // switchLocalePath('ar-EG') will return Arabic equivalent
  // for the *current* URL path e.g. if we're at /en-CA/about,
  // switchLocalePath('ar-EG') will return '/ar-EG/about'
  router.push({ path: switchLocalePath(target.value) });
}
</script>

<template>
  <div>
    <select :value="locale" @change="onLocaleChanged">
      <option v-for="loc in supportedLocales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
