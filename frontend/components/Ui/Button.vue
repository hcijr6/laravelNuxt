<template>
  <button v-if="!toLink" :class="buttonClasses({ variant, size, group })">
    <slot />
  </button>
  <NuxtLink
    v-else
    :to="localePath(toLink)"
    :class="buttonClasses({ variant, size, group })"
  >
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
    group: {
      type: String,
      required: false,
    },
  },
  computed: {
    buttonClasses() {
      return cva(
        "inline-flex drop-shadow items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background",
        {
          variants: {
            variant: {
              default: "bg-primary text-primary-foreground hover:bg-primary/90",
              solid:
                "bg-solid text-solid-foreground fill-solid-foreground hover:border hover:border-solid-foreground",
              invertSolid:
                "bg-solid-foreground text-solid fill-solid border border-input hover:border-solid",
              destructive:
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              outline:
                "bg-solid-foreground text-solid fill-solid border border-input hover:border-solid",
              secondary:
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              ghost:
                "hover:bg-accent hover:text-accent-foreground text-accent-foreground",
              link: "hover:underline text-primary",
            },
            size: {
              default: "py-2 px-4",
              sm: "h-9 px-3",
              md: "h-11 px-5",
              lg: "h-11 px-8",
              full: "w-full",
              logo: "p-2",
              logoXl: "p-3",
            },
            group: {
              default: "",
              true: "group",
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
