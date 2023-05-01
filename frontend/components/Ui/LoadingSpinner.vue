<template>
  <div
    role="status"
    :class="{
      hidden: !loading,
    }"
  >
    <div class="loader flex gap-2 h-5 items-center justify-center w-20">
      <div class="w-[7px] h-[7px] bg-white rounded-lg animate-pulse"></div>
      <div class="w-[7px] h-[7px] bg-white rounded-lg animate-pulse"></div>
      <div class="w-[7px] h-[7px] bg-white rounded-lg animate-pulse"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  props: ["loading"],
};
</script>

<style>
.loader div {
  animation-duration: 1s;
}

.loader div:first-child {
  animation-delay: 0.2s;
}

.loader div:nth-child(2) {
  animation-delay: 0.4s;
}

.loader div:nth-child(3) {
  animation-delay: 0.6s;
}
</style>
