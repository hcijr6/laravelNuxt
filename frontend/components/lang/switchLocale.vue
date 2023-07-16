<template>
  <Listbox
    v-model="actualLocale"
    @update:modelValue="onLocaleChanged"
    v-slot="{ open }"
  >
    <Float :offset="5" flip>
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
          open ? '' : '',
        ]"
      >
        <ListboxOption
          v-slot="{ selected }"
          v-for="loc in supportedLocales"
          :key="'switcher' + loc.code"
          :value="loc.code"
          as="template"
        >
          <span
            :class="[
              'bg-solid-foreground cursor-pointer py-1 px-2 gap-2  hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
            ]"
          >
            <img
              :class="[
                'w-5 h-5  rounded-full transition-all',
                selected ? '' : ' ',
              ]"
              :src="loc.image"
              alt=""
            />{{ loc.name }}
          </span>
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
      actualLocale: {},
      supportedLocales: [],
      actualLocaleObject: {},
    };
  },
  mounted() {
    const { locale, locales } = useI18n();
    this.actualLocale = locale.value;
    this.supportedLocales = locales.value;
    this.actualLocaleObject = computed(() =>
      this.supportedLocales.find((locale) => locale.code === this.actualLocale)
    );
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
