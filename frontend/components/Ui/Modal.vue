<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[100]">
      <div class="fixed inset-0 overflow-y-auto">
        <div :class="layoutClasses({ position })">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="[dialogClasses({ size, position })]">
              <DialogTitle
                v-if="title"
                as="h3"
                class="text-lg font-medium leading-6 text-foreground"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2" v-if="description">
                <p class="text-sm text-primary/70 text-left">
                  {{ description }}
                </p>
              </div>
              <div class="flex flex-col w-full">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { cva } from "class-variance-authority";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

export default {
  components: {
    Dialog,
    DialogTitle,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "default",
    },
    position: {
      type: String,
      default: "default",
    },
  },
  computed: {
    layoutClasses() {
      return cva("flex min-h-full h-full  text-center bg-black/40", {
        variants: {
          position: {
            default: "items-center justify-center p-4",
            right: "items-end justify-end px-8 py-4",
          },
        },
      });
    },
    dialogClasses() {
      return cva(
        "w-full transform max-w-full overflow-hidden rounded-lg bg-primary-foreground p-6 shadow-xl transition-all flex flex-col items-start align-start border border-input",
        {
          variants: {
            position: {
              default: "",
              right: "min-h-full",
            },
            size: {
              default: "sm:max-w-md",
              auto: "sm:max-w-auto",
              lg: "sm:max-w-lg",
              xl: "sm:max-w-xl",
            },
          },
        }
      );
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveChanges() {
      this.$emit("save");
    },
  },
};
</script>
