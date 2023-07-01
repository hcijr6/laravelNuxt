<template>
  <Listbox
    v-model="actualLocale"
    @update:modelValue="onLocaleChanged"
    v-slot="{ open }"
  >
    <Float :offset="5">
      <ListboxButton as="template"
        ><UiButton variant="invertSolid" size="logo"
          ><img
            class="w-5 h-5 rounded-full transition-all"
            
            :src="actualLocaleObject.image"
            alt="" /></UiButton
      ></ListboxButton>
      <ListboxOptions
        :class="[
          'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
          open ? 'border-solid' : '',
        ]"
      >
        <ListboxOption
          v-slot="{ active, selected }"
          v-for="loc in supportedLocales"
          :key="loc.code"
          :value="loc.code"
          as="template"
        >
          <span
            :class="[
              'bg-solid-foreground cursor-pointer py-1 px-2 group gap-2   hover:border-solid inline-flex items-center justify-center rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
              selected ? 'border border-solid' : 'border border-input',
            ]"
            ><img
              :class="[
                'w-5 h-5  rounded-full transition-all',
                selected ? '' : ' ',
              ]"
              :src="loc.image"
              alt=""
            />{{ loc.name }}</span
          >
        </ListboxOption>
      </ListboxOptions>
    </Float>
  </Listbox>
</template>

<script>
import { Float } from "@headlessui-float/vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
export default {
  data() {
    return {
      actualLocale: false,
      supportedLocales: [],
      actualLocaleObject: false,
    };
  },
  mounted() {
    const { locale, locales } = useI18n();
    this.actualLocale = locale.value;
    this.supportedLocales = locales.value;
    this.actualLocaleObject = computed(() =>
      this.supportedLocales.find((locale) => locale.code === this.actualLocale)
    );
    console.log(this.supportedLocales);
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Float,
  },
  methods: {
    onLocaleChanged(event) {
      const target = event;
      const router = useRouter();
      const switchLocalePath = useSwitchLocalePath();
      router.push({ path: switchLocalePath(target) });
    },
  },
};
</script>
