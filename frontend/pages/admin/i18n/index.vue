<template>
  <div class="container pt-2 flex justify-star items-center w-full">
    <div class="w-full">
      <h1 class="mx-auto text-xl font-medium tracking-tight text-primary pt-4 pb-2">
        <span class="relative">
          <span class="underline">{{ $t("i18n.title.0") }}</span>
        </span>
        {{ $t("i18n.title.1") }}
      </h1>
      <div class="flex gap-2 flex-wrap">
        <div class="grow sm:w-auto w-full">
          <UiInput v-model="search" type="text" @keyup="newSearch" :loading="loading"></UiInput>
        </div>
        <Listbox v-model="actualLocale" @update:modelValue="onLanguageChanged">
          <Float :offset="5" flip>
            <ListboxButton as="template">
              <UiButton variant="invertSolid" class="gap-2">
                <img class="w-5 h-5 rounded-full transition-all" :src="actualLocale.image" alt="" />
                <span>{{ actualLocale.name }}</span>
              </UiButton>
            </ListboxButton>
            <ListboxOptions :class="[
              'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
            ]">
              <ListboxOption v-slot="{ selected }" v-for="loc in supportedLocales" :key="'tt_' + loc.code" :value="loc"
                as="template">
                <span :class="[
                  'bg-solid-foreground cursor-pointer py-1 px-2 gap-2 hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                  selected ? 'bg-accent' : '',
                ]">
                  <img :class="['w-5 h-5  rounded-full transition-all']" :src="loc.image" alt="" />
                  <span class="leading-none">{{ loc.name }}</span>
                </span>
              </ListboxOption>
            </ListboxOptions>
          </Float>
        </Listbox>
        <UiButton @click="openAddModal()">
          <div class="flex gap-2 items-center justify-center">
            <span class="leading-none">{{ $t("global.add") }}</span>
            <PlusCircleIcon class="w-4 h-4"></PlusCircleIcon>
          </div>
        </UiButton>
        <UiButton variant="invertSolid" @click="setAllTranslation()">
          <div class="flex gap-2 items-center justify-center">
            <span class="leading-none">{{ $t("i18n.setAll") }}</span>
            <ArrowUpCircleIcon class="w-4 h-4"></ArrowUpCircleIcon>
          </div>
        </UiButton>
      </div>
    </div>
  </div>
  <div class="container py-5">
    <div class="w-full grid-cols-fill-15 grid gap-2">
      <div v-if="loading"
        class="bg-solid-foreground border-input border hover:border-solid rounded-md drop-shadow p-3 flex flex-col justify-center items-center gap-2 cursor-pointer min-h-[10rem]">
        <UiLoadingSpinner :loading="loading"></UiLoadingSpinner>
      </div>
      <div v-for="translation in translationStore.translations"
        class="bg-solid-foreground border-input border hover:border-solid rounded-md drop-shadow p-3 flex flex-col justify-between gap-2 cursor-pointer"
        @click="openEditModal(translation.id)">
        <div class="flex flex-col gap-2">
          <span class="border border-solid w-fit px-2 text-xs rounded-full py-1 leading-none italic">{{ translation.key
          }}</span>
          <span class="line-clamp-3 text-sm">{{ translation.value }}</span>
        </div>

        <div class="flex justify-end items-center">
          <span class="bg-solid text-solid-foreground w-fit px-2 text-xs rounded-full font-semibold py-1 leading-none">
            {{ translation.code }}</span>
        </div>
      </div>
    </div>
  </div>
  <TranslationsEditModal :translationId="editTranslationId" @close="editTranslationId = false"></TranslationsEditModal>
  <TranslationsAddModal :isOpen="addModalIsOpen" @close="addModalIsOpen = false"></TranslationsAddModal>
</template>

<script>
import { PlusCircleIcon, ArrowUpCircleIcon } from "@heroicons/vue/24/outline";
import { Float } from "@headlessui-float/vue";
import { useTranslationStore } from "~/stores/translation";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  setup() {
    var translationStore = useTranslationStore();
    definePageMeta({
      layout: "main-layout",
      middleware: ["auth", "access-dashboard"],
    });
    const { locales } = useI18n();
    var supportedLocales = locales.value.map((value) => value);
    var actualLocale = {
      name: "All",
      code: "all",
      image: "/img/lang/world.png",
    };
    supportedLocales.unshift(actualLocale);
    return {
      actualLocale,
      supportedLocales,
      translationStore,
    };
  },
  data() {
    return {
      loading: false,
      search: "",
      apiController: new AbortController(),
      editTranslationId: false,
      addModalIsOpen: false,
    };
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Float,
    TransitionRoot,
    PlusCircleIcon,
    ArrowUpCircleIcon,
  },
  methods: {
    setAllTranslation() {
      $fetch("/api/v1/refreshTranslations");
    },
    openAddModal() {
      this.addModalIsOpen = true;
    },
    openEditModal(translationId) {
      this.editTranslationId = translationId;
    },
    onLanguageChanged(event) {
      this.newSearch();
    },
    newSearch() {
      if (this.loading) {
        this.apiController.abort();
        this.apiController = new AbortController();
      }
      const petition = {
        response: true,
        method: "post",
        body: {
          langCode: this.actualLocale.code,
          search: this.search,
        },
        signal: this.apiController.signal,
      };
      this.loading = true;
      $larafetch("/api/v1/translations/search", petition)
        .then((res) => {
          this.translationStore.translations = [];
          if (res.data) {
            this.translationStore.translations = res.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.translationStore.translations = [];
          // console.log(error);
          if (error.name === "AbortError") {
            console.log("Request canceled");
          } else {
            // console.log(error);
            this.loading = false;
          }
        });
    },
  },
  destroyed() {
    this.apiController.abort();
  },
  mounted() {
    this.newSearch();
  }
};
</script>
<style>
.asdf {}
</style>
