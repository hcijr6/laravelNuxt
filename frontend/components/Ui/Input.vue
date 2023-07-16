<template>
  <div class="flex w-full relative">
    <input
      :value="modelValue"
      v-bind="$attrs"
      :class="inputClasses()"
      @input="updateValue"
    />
    <div class="absolute flex items-center h-full pl-1 mr-3 right-0">
      <div>
        <UiLoadingSpinner :loading="loading"></UiLoadingSpinner>
      </div>
    </div>
  </div>
</template>

<script>
import { cva } from "class-variance-authority";

export default {
  props: {
    modelValue: "",
    loading: false
  },
  computed: {
    inputClasses() {
      return cva(
        `
          flex transition-all h-10 w-full rounded-lg border border-input px-3 py-2 text-sm
          bg-solid-foreground text-solid fill-solid border border-input
          hover:border-solid 
          ring-offset-background 
          file:border-0 file:text-sm file:font-medium 
          placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 
          disabled:cursor-not-allowed disabled:opacity-50
          drop-shadow
        `
      );
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
