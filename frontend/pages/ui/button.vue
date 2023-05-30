<template>
  <div class="flex gap-2">
    <UiButton>Test</UiButton>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "main-layout",
      middleware: ["guest"],
    });
  },
};
</script>

<style lang="scss" scoped></style>
