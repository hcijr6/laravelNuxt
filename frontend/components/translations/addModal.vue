<template>
  <UiModal
    :isOpen="isOpen"
    :title="$t('translations.addModal.title')"
    size="xl"
    @close="closeModal()"
  >
    <div class="mt-4 flex flex-col w-full">
      <label for="key" class="block text-sm font-medium text-primary"
        ><div class="flex items-center gap-2">
          {{ $t("global.forms.langCode.label") }}
        </div>
      </label>
      <div class="flex w-full mt-2">
        <Listbox
          v-model="selectedLocale"
          as="div"
          @update:modelValue="changeLocale()"
        >
          <Float :offset="5" flip>
            <ListboxButton as="template">
              <UiButton
                variant="invertSolid"
              >
                <div class="flex">
                  <span v-if="!selectedLocale">Select option</span>
                  <span v-else class="flex gap-2">
                    <img
                      class="w-5 h-5 rounded-full transition-all"
                      :src="selectedLocale.image"
                      alt=""
                    />
                    <span>{{ selectedLocale.name }}</span>
                  </span>
                </div>
              </UiButton>
            </ListboxButton>
            <ListboxOptions
              :class="[
                'bg-solid-foreground rounded-lg p-1 border border-input flex flex-col gap-1 drop-shadow',
              ]"
            >
              <ListboxOption
                v-slot="{ selected }"
                v-for="loc in supportedLocales"
                :key="loc.code"
                :value="loc"
                as="template"
              >
                <span
                  :class="[
                    'bg-solid-foreground cursor-pointer py-1 px-2 gap-2 hover:bg-accent inline-flex items-center justify-start rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-80 disabled:pointer-events-none ring-offset-background',
                    selected ? 'hover:bg-accent' : '',
                  ]"
                >
                  <img
                    :class="['w-5 h-5  rounded-full transition-all']"
                    :src="loc.image"
                    alt=""
                  />{{ loc.name }}
                </span>
              </ListboxOption>
            </ListboxOptions>
          </Float>
        </Listbox>
      </div>
      <UiInputErrors
        v-if="validations.code"
        :errors="validations.code"
      ></UiInputErrors>
    </div>
    <div class="mt-4 flex flex-col w-full">
      <label for="key" class="block text-sm font-medium text-primary"
        ><div class="flex items-center gap-2">
          {{ $t("global.forms.key.label") }}
          <div></div>
        </div>
      </label>
      <div class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm">
        <UiInput
          v-model.lazy="form.key"
          type="text"
          name="key"
          autocomplete="off"
          required=""
          spellcheck="false"
          :placeholder="$t('global.forms.key.placeholder')"
          @change="handleInput('key', form.key)"
        />
      </div>
      <UiInputErrors
        v-if="validations.key"
        :errors="validations.key"
      ></UiInputErrors>
    </div>
    <div class="mt-2 flex flex-col w-full">
      <label for="value" class="block text-sm font-medium text-primary"
        ><div class="flex items-center gap-2">
          {{ $t("global.forms.value.label") }}
          <div></div>
        </div>
      </label>
      <div class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm">
        <UiTextarea
          v-model.lazy="form.value"
          type="text"
          name="value"
          autocomplete="off"
          required=""
          spellcheck="false"
          :placeholder="$t('global.forms.value.placeholder')"
          @change="handleInput('value', form.value)"
        />
      </div>
      <UiInputErrors
        v-if="validations.value"
        :errors="validations.value"
      ></UiInputErrors>
    </div>
    <div class="mt-4 flex items-end w-full justify-end gap-2">
      <UiButton variant="invertSolid" @click="closeModal()">{{
        $t("global.cancel")
      }}</UiButton>
      <UiButton @click="storeTranslation">
        <span v-show="!sendingForm">{{ $t("global.add") }}</span>
        <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
      </UiButton>
    </div>
  </UiModal>
</template>
<script>
import { Float } from "@headlessui-float/vue";
import { useTranslationStore } from "~/stores/translation";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
export default {
  setup() {
    var translationStore = useTranslationStore();
    const { locales } = useI18n();
    var supportedLocales = locales.value.map((value) => value);
    return { translationStore, supportedLocales };
  },
  props: {
    isOpen: {
      required: true,
    },
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
        key: "",
        value: "",
        code: "",
      },
      selectedLocale: null,
      validations: [],
      sendingForm: false,
      className: "Translation",
      validationSource: "Model",
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
    closeModal() {
      this.form = {
        key: "",
        value: "",
      };
      this.selectedLocale = null;
      this.validations = [];
      this.$emit("close");
    },
    async storeTranslation() {
      this.sendingForm = true;
      const response = await this.translationStore.store(this.form, false);
      console.log(response);
      resetErrors(this);
      this.sendingForm = false;
      if (response.data) {
        this.closeModal();
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
