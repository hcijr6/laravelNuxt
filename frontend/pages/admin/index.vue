<template>
  <div class="container text-center py-28">
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-primary sm:text-7xl"
    >
      <span class="relative"
        ><span class="underline">{{ $t("admin.title.0") }}</span></span
      >
      {{ $t("admin.title.1") }}
    </h1>
    <p class="max-w-2xl mx-auto mt-6 text-lg tracking-tight text-primary">
      {{ $t("admin.description.0") }}
      <a
        href="https://laravel.com/"
        class="font-semibold text-[#FF2D20] underline"
        >Laravel 10</a
      >
      {{ $t("admin.description.1") }}
      <a href="https://nuxt.com/" class="font-semibold text-[#00DC82] underline"
        >Nuxt 3</a
      >
      {{ $t("admin.description.2") }}
    </p>
    <p
      class="max-w-2xl mx-auto mt-6 text-lg font-semibold tracking-tight text-primary"
    >
      {{ $t("admin.subDescription") }} Auth & AccessDashboard
    </p>
    <div class="flex justify-center gap-3 mt-10">
      <UiButton to-link="/admin/i18n">
        {{ $t("i18n.pageName") }}
      </UiButton>
      <UiButton to-link="/admin/posts">
        {{ $t("admin.posts.pageName") }}
      </UiButton>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "main-layout",
      middleware: ["auth", "access-dashboard"],
    });
  },
};
</script>
