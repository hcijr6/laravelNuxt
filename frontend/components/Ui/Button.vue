<template>
  <button v-if="!toLink" :class="buttonClasses({ variant, size })">
    <slot />
  </button>
  <NuxtLink v-else :to="toLink" :class="buttonClasses({ variant, size })">
    <slot />
  </NuxtLink>
</template>

<script>
import { cva } from "class-variance-authority";

export default {
  props: {
    variant: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "default",
    },
    toLink: {
      type: String,
      required: false,
    },
  },
  computed: {
    buttonClasses() {
      return cva(
        "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          variants: {
            variant: {
              default: "bg-primary text-primary-foreground hover:bg-primary/90",
              destructive:
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              outline:
                "border border-input hover:border-primary",
              secondary:
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              ghost: "hover:bg-accent hover:text-accent-foreground",
              link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
              default: "py-2 px-4",
              sm: "h-9 px-3",
              md: "h-11 px-5",
              lg: "h-11 px-8",
              logo: 'p-2'
            },
          },
        }
      );
    },
  },
};
</script>

<style scoped>
.cva {
}
</style>
