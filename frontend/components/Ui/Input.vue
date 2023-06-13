<template>
  <input
    type="text"
    :value="modelValue"
    v-bind="$attrs"
    :class="inputClasses()"
    @input="updateValue"
  />
</template>

<script>
import { cva } from "class-variance-authority";

export default {
  props: {
    modelValue: "",
  },
  computed: {
    inputClasses() {
      return cva(
        `
          flex transition-all h-10 w-full rounded-md border border-input px-3 py-2 text-sm
          bg-solid-foreground text-solid fill-solid border border-input
          hover:border-solid 
          ring-offset-background 
          file:border-0 file:text-sm file:font-medium 
          placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 
          disabled:cursor-not-allowed disabled:opacity-50
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
