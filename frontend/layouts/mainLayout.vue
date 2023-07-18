<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Body
      class="flex flex-col items-center justify-start h-screen w-screen max-w-screen bg-primary-foreground"
    >
      <header class="py-2 border-b border-input container">
        <nav class="relative z-50 flex justify-between">
          <div class="flex items-center md:gap-x-12">
            <UiButton size="logo" variant="invertSolid" to-link="/">
              <SvgLogo class="w-5 h-5"></SvgLogo>
            </UiButton>
          </div>
          <div class="flex items-center gap-x-5 md:gap-x-8">
            <div class="flex gap-2">
              <Menu>
                <Float :offset="5" flip>
                  <MenuButton as="template" v-if="authStore.isLoggedIn">
                    <UiButton size="logo" variant="invertSolid">
                      <span class="h-5 w-5 text-center">
                        {{ authStore.user?.name.charAt(0).toUpperCase() }}
                      </span>
                    </UiButton>
                  </MenuButton>
                  <MenuButton as="template" v-else>
                    <UiButton size="logo" variant="invertSolid">
                      <UserCircleIcon
                        class="h-5 w-5 text-center"
                      ></UserCircleIcon>
                    </UiButton>
                  </MenuButton>
                  <MenuItems
                    v-if="authStore.isLoggedIn"
                    :class="[
                      'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
                    ]"
                  >
                    <MenuItem as="template">
                      <NuxtLink
                        :class="[
                          'bg-solid-foreground cursor-pointer py-1 px-2 gap-2  hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                        ]"
                        :to="localePath('/admin')"
                        >{{ $t("admin.pageName") }}</NuxtLink
                      >
                    </MenuItem>
                    <MenuItem as="template">
                      <NuxtLink
                        :class="[
                          'bg-solid-foreground cursor-pointer py-1 px-2 gap-2  hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                        ]"
                        :to="localePath('/profile')"
                      >
                        {{ $t("profile.index.pageName") }}
                      </NuxtLink>
                    </MenuItem>
                    <MenuItem as="template">
                      <span
                        :class="[
                          'bg-solid-foreground cursor-pointer py-1 px-2 gap-2  hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                        ]"
                        @click="logout()"
                        >{{ $t("global.logout") }}</span
                      >
                    </MenuItem>
                  </MenuItems>
                  <MenuItems
                    v-else
                    :class="[
                      'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
                    ]"
                  >
                    <MenuItem as="template">
                      <NuxtLink
                        :class="[
                          'bg-solid-foreground cursor-pointer py-1 px-2 gap-2  hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                        ]"
                        :to="localePath('/login')"
                      >
                        {{ $t("global.login") }}
                      </NuxtLink>
                    </MenuItem>
                  </MenuItems>
                </Float>
              </Menu>

              <ThemeSwitchMode></ThemeSwitchMode>
              <LangSwitchLocale></LangSwitchLocale>
            </div>
          </div>
        </nav>
      </header>
      <ThemeBreadcrumbs></ThemeBreadcrumbs>
      <slot />
    </Body>
  </Html>
</template>
<script>
import { useAuthStore } from "~~/stores/auth";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";

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
  components: {
    Float,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    UserCircleIcon,
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
