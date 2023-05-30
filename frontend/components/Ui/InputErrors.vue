<template>
  <div class="flex flex-wrap gap-[2px] mt-2">
    <span v-for="message in errors" class="px-1 text-xs font-medium text-red-500 border border-red-300 rounded bg-red-50">{{
      message
    }}</span>
  </div>
</template>
<script>
export default {
  props: ["errors"],
};
</script>
