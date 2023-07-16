<template>
  <div
    role="status"
    :class="{
      hidden: !loading,
      active: loading,
    }"
  >
    <div class="flex items-center justify-center  h-5 gap-2 loader">
      <div
        class="w-[7px] h-[7px] bg-primary rounded-lg"
        :class="{ 'animate-pulse': loading }"
      ></div>
      <div
        class="w-[7px] h-[7px] bg-primary rounded-lg"
        :class="{ 'animate-pulse': loading }"
      ></div>
      <div
        class="w-[7px] h-[7px] bg-primary rounded-lg"
        :class="{ 'animate-pulse': loading }"
      ></div>
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
.active > .loader div {
  animation-duration: 1s;
}

.active > .loader div:first-child {
  animation-delay: 0.2s;
}

.active > .loader div:nth-child(2) {
  animation-delay: 0.4s;
}

.active > .loader div:nth-child(3) {
  animation-delay: 0.6s;
}
</style>
