<template>
  <div
    class="px-4 pt-20 pb-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:pt-32"
  >
    <h1
      class="max-w-4xl mx-auto text-5xl font-medium tracking-tight text-primary sm:text-7xl"
    >
      Test
      <span class="relative"><span class="underline">Page</span></span>
      that requires no auth.
    </h1>
    <div class="flex justify-center gap-3 mt-10">
      <button
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
        @click="test()"
      >
        Test
      </button>
    </div>
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
  data() {
    return {
      rules: {
        name: ["required", "string", "max:255"],
        email: ["required", "string", "email", "max:255", "unique:User"],
        password: ["required", "confirmed", "min:8"],
      },
      form: {
        name: "Hernan",
        email: "hcijr6@gmail.com",
        password: "Hernán",
      },
    };
  },
  methods: {
    async test() {
      this.checkField("name");
    },
    checkField(field) {
      if (field in this.rules && field in this.form) {
        if (Array.isArray(this.rules[field])) {
          this.rules[field].forEach((rule) => {
            console.log(checkRule(this.form[field], rule, field));
          });
        }
      }
    },
  },
};
</script>
