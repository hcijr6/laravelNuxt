<template>
    <div class="container pt-2 flex justify-star items-center w-full">
        <div class="w-full">
            <h1 class="mx-auto text-xl font-medium tracking-tight text-primary pt-4 pb-2">
                <span class="relative">
                    <span class="underline">{{ $t("admin.posts.title.0") }}</span>
                </span>
                {{ $t("admin.posts.title.1") }}
            </h1>
            <div class="flex gap-2 flex-wrap">
                <div class="grow sm:w-auto w-full">
                    <div class="w-full flex flex-col">
                        <UiInput v-model="search" type="text" @keyup="newSearch" :loading="loading"></UiInput>
                        <UiInputErrors v-if="errors.length" :errors="errors"></UiInputErrors>
                    </div>
                </div>
                <Listbox v-model="actualLocale" @update:modelValue="onLanguageChanged">
                    <Float :offset="5" flip>
                        <ListboxButton as="template">
                            <div class="flex h-fit">
                                <UiButton variant="invertSolid" class="gap-2">
                                    <img class="w-5 h-5 rounded-full transition-all" :src="actualLocale.image" alt="" />
                                    <span>{{ actualLocale.name }}</span>
                                </UiButton>
                            </div>
                        </ListboxButton>
                        <ListboxOptions :class="[
                            'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
                        ]">
                            <ListboxOption v-slot="{ selected }" v-for="loc in supportedLocales" :key="'tt_' + loc.code"
                                :value="loc" as="template">
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
                <div>
                    <UiButton>
                        <div class="flex gap-2 items-center justify-center">
                            <span class="leading-none">{{ $t("global.add") }}</span>
                            <PlusCircleIcon class="w-4 h-4"></PlusCircleIcon>
                        </div>
                    </UiButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container py-5">
        <div class="w-full grid-cols-fill-15 grid gap-2">
            <div v-if="loading"
                class="bg-solid-foreground border-input border hover:border-solid rounded-md drop-shadow p-3 flex flex-col justify-center items-center gap-2 cursor-pointer min-h-[10rem]">
                <UiLoadingSpinner :loading="loading"></UiLoadingSpinner>
            </div>
            <div v-for="post in postStore.posts"
                class="bg-solid-foreground border-input border hover:border-solid rounded-md drop-shadow p-3 flex flex-col justify-between gap-2 cursor-pointer">
                <div class="flex flex-col justify-start items-start h-full gap-1">
                    <span class="text-base font-semibold leading-1 line-clamp-2 min-h-[2rem]">{{ post.title }}</span>
                    <span class="text-sm line-clamp-6 hyphens-auto sm:min-h-[6.5625rem]">{{ post.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { PlusCircleIcon, ArrowUpCircleIcon } from "@heroicons/vue/24/outline";
import { Float } from "@headlessui-float/vue";
import { useAdminPostStore } from "~/stores/adminPost";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    TransitionRoot,
} from "@headlessui/vue";
export default {
    setup() {
        var postStore = useAdminPostStore();
        definePageMeta({
            layout: "main-layout",
            middleware: ["auth", "access-dashboard"],
        });
        const { locales, locale } = useI18n();
        var supportedLocales = locales.value.map((value) => value);
        var actualLocale = supportedLocales.find((local) => local.code === locale.value);

        return {
            actualLocale,
            supportedLocales,
            postStore,
        };
    },
    data() {
        return {
            loading: false,
            search: "",
            apiController: new AbortController(),
            editpostId: false,
            addModalIsOpen: false,
            errors: []
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
        onLanguageChanged(event) {
            this.newSearch();
        },
        async newSearch() {
            this.errors = [];
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
            try {
                var response = await submitRequest($larafetch("/api/v1/posts/search", petition));
                console.log(response)
                this.postStore.posts = [];
                if (response.data) {
                    this.postStore.posts = response.data;
                } else {
                    if (response.errors) {
                        this.errors = response.errors;
                    }
                }
                this.loading = false;
            } catch (error) {
            }
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
  