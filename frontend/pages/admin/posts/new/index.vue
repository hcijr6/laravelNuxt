<template>
    <div class="container pt-2 flex justify-start items-start w-full gap-2 flex-col">
        <h1 class=" text-xl font-medium tracking-tight text-primary pt-4 pb-2">
            <span class="relative">
                <span class="">{{ $t("admin.posts.new.title") }}</span>
            </span>
        </h1>
        <div class="w-full flex gap-2 flex-wrap">
            <div
                class="w-full sm:w-auto grow bg-solid-foreground border-input border  rounded-md drop-shadow p-3 flex flex-col justify-start">
                <div class="flex flex-col w-full">
                    <label for="title" class="block text-sm font-medium text-primary">
                        <div class="flex items-center gap-2">
                            {{ $t("global.forms.title.label") }}
                            <div></div>
                        </div>
                    </label>
                    <div class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm">
                        <UiInput v-model.lazy="form.title" type="text" name="title" autocomplete="off" required=""
                            spellcheck="false" :placeholder="$t('global.forms.title.placeholder')"
                            @change="handleInput('title', form.title)" />
                    </div>
                    <UiInputErrors v-if="validations.title" :errors="validations.title"></UiInputErrors>
                </div>
                <div class="flex flex-col w-full mt-4">
                    <label for="content" class="block text-sm font-medium text-primary">
                        <div class="flex items-center gap-2">
                            {{ $t("global.forms.content.label") }}
                            <div></div>
                        </div>
                    </label>
                    <div class="flex w-full mt-2 flex-col gap-3">
                        <UiTiptap v-model="form.content" :placeholder="$t('global.forms.content.placeholder')"></UiTiptap>
                    </div>
                    <UiInputErrors v-if="validations.title" :errors="validations.title"></UiInputErrors>
                </div>
            </div>
            <div
                class="w-full md:w-auto h-fit  bg-solid-foreground border-input border  rounded-md drop-shadow p-3 flex flex-col justify-between gap-2">
                <div class="flex flex-col w-full">
                    <label for="key" class="block text-sm font-medium text-primary">
                        <div class="flex items-center gap-2">
                            {{ $t("global.forms.langCode.label") }}
                        </div>
                    </label>
                    <div class="flex w-full mt-2">
                        <Listbox v-model="selectedLocale" as="div" @update:modelValue="changeLocale()">
                            <Float :offset="5" flip>
                                <ListboxButton as="template">
                                    <UiButton variant="invertSolid">
                                        <div class="flex">
                                            <span v-if="!selectedLocale">Select option</span>
                                            <span v-else class="flex gap-2">
                                                <img class="w-5 h-5 rounded-full transition-all" :src="selectedLocale.image"
                                                    alt="" />
                                                <span>{{ selectedLocale.name }}</span>
                                            </span>
                                        </div>
                                    </UiButton>
                                </ListboxButton>
                                <ListboxOptions :class="[
                                    'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
                                ]">
                                    <ListboxOption v-slot="{ selected }" v-for="loc in supportedLocales" :key="loc.code"
                                        :value="loc" as="template">
                                        <span :class="[
                                            'bg-solid-foreground cursor-pointer py-1 px-2 gap-2 hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                                            selected ? 'hover:bg-accent' : '',
                                        ]">
                                            <img :class="['w-5 h-5  rounded-full transition-all']" :src="loc.image"
                                                alt="" />{{
                                                    loc.name }}
                                        </span>
                                    </ListboxOption>
                                </ListboxOptions>
                            </Float>
                        </Listbox>
                    </div>
                    <UiInputErrors v-if="validations.code" :errors="validations.code"></UiInputErrors>
                </div>
                <div class="flex flex-col w-full">
                    <label for="key" class="block text-sm font-medium text-primary">
                        <div class="flex items-center gap-2">
                            {{ $t("global.actions") }}
                        </div>
                    </label>
                    <div class="mt-2 flex items-end w-full gap-2">
                        <UiButton variant="invertSolid" toLink="/">{{
                            $t("global.cancel")
                        }}</UiButton>
                        <UiButton @click="storeTranslation()">
                            <span v-show="!sendingForm">{{ $t("global.save") }}</span>
                            <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
                        </UiButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Float } from "@headlessui-float/vue";
import { useAdminPostStore } from "~/stores/adminPost";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
export default {
    setup() {
        var postStore = useAdminPostStore();
        const { locale, locales } = useI18n();
        definePageMeta({
            layout: "main-layout",
            middleware: ["auth", "access-dashboard"],
        });
        var supportedLocales = locales.value.map((value) => value);
        var selectedLocale = supportedLocales.find((local) => local.code === locale.value);
        return { postStore, supportedLocales, selectedLocale };
    },
    components: {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Float,
    },
    data() {
        return {
            form: {
                title: "",
                content: "",
                code: "",
            },
            validations: [],
            sendingForm: false,
            className: "Post\\StoreRequest",
            validationSource: "Request",
            loadingData: false,
        };
    },
    methods: {
        changeLocale() {
            if (this.selectedLocale && this.selectedLocale.hasOwnProperty("code")) {
                this.form.code = this.selectedLocale.code;
            }
            this.handleInput("code", this.form.code);
        },
        async storeTranslation() {
            this.sendingForm = true;
            this.changeLocale()
            var body = {
                title: this.form.title,
                content: this.form.content,
                locale: this.form.code,
            };
            const response = await this.postStore.store(body, false);
            resetErrors(this);
            this.sendingForm = false;
            if (response.data) {
                navigateTo(testLocale(`/admin/posts/${response.data.id}/${this.form.code}`));
            } else {
                this.validations = response.errors;
            }
        },
        async handleInput(field, data) {
            await checkSingleField(this, field, data);
        },
    },
};
</script>
<style></style>