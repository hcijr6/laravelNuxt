<template>
  <div class="flex flex-wrap gap-x-[2px] gap-y-[4px] mt-2">
    <span
      v-for="message in errors"
      class="px-1 py-[3px] font-semibold text-xs italic text-red-600 border border-red-500 rounded-full leading-none bg-solid-foreground drop-shadow-sm"
      >{{ message }}</span
    >
  </div>
</template>
<script>
export default {
  props: ["errors"],
};
</script>
