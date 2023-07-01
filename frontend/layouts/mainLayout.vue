<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Body
      class="flex flex-col items-center justify-start min-h-screen min-w-screen bg-primary-foreground"
    >
      <header class="py-2 border-b border-input container">
        <nav class="relative z-50 flex justify-between">
          <div class="flex items-center md:gap-x-12">
            <UiButton size="logo" variant="invertSolid" to-link="/">
              <SvgLogo class="w-7 h-7"></SvgLogo>
            </UiButton>
          </div>
          <div class="flex items-center gap-x-5 md:gap-x-8">
            <div class="flex gap-2">
              <UiButton
                v-if="authStore.isLoggedIn"
                size="logo"
                variant="invertSolid"
                to-link="/profile"
              >
                <span class="h-5 w-5 text-center">{{
                  authStore.user?.name.charAt(0)
                }}</span>
              </UiButton>

              <UiButton v-if="authStore.isLoggedIn" @click="logout()">{{
                $t("global.logout")
              }}</UiButton>
              <UiButton v-else to-link="/login">
                {{ $t("global.login") }}
              </UiButton>
              <ThemeSwitchMode></ThemeSwitchMode>
              <LangSwitchLocale></LangSwitchLocale>
            </div>
          </div>
        </nav>
      </header>
      <slot />
    </Body>
  </Html>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();
    const head = useLocaleHead({
      addDirAttribute: true,
      identifierAttribute: "id",
      addSeoAttributes: true,
    });
    const htmlAttrs = computed(() => head.value.htmlAttrs);

    return { authStore, head, htmlAttrs };
  },
  data() {
    return {
      darkTheme: true,
    };
  },
  methods: {
    async logout() {
      const response = await this.authStore.logout(this.$route.meta.middleware);
    },
  },
};
</script>
