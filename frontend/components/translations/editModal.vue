<template>
  <UiModal
    :isOpen="isOpen"
    :title="$t('translations.editModal.title')"
    size="xl"
    @close="closeModal()"
    :loading="loadingData"
  >
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
      <UiButton @click="updateTranslation">
        <span v-show="!sendingForm">{{ $t("global.save") }}</span>
        <UiLoadingSpinner :loading="sendingForm"></UiLoadingSpinner>
      </UiButton>
    </div>
  </UiModal>
</template>

<script>
import { useTranslationStore } from "~/stores/translation";
export default {
  setup() {
    var translationStore = useTranslationStore();
    return { translationStore };
  },
  props: {
    translationId: {
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      form: {
        key: "",
        value: "",
      },
      validations: [],
      sendingForm: false,
      className: "Translation",
      validationSource: "Model",
      loadingData: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.isOpen = false;
      this.validations = [];
    },
    async updateTranslation() {
      this.sendingForm = true;
      const response = await this.translationStore.update(this.form);
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
    async refreshTranslation() {
      this.form = {
        key: "",
        value: "",
      };
      if (this.translationId) {
        this.loadingData = true;
        this.isOpen = true;
        var response = await this.translationStore.show(this.translationId);
        if (response) {
          this.form = response;
        } else {
          this.closeModal();
        }
        this.loadingData = false;
      }
    },
  },
  watch: {
    async translationId() {
      await this.refreshTranslation();
    },
  },
};
</script>
<style></style>
