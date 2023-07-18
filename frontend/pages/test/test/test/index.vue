<template>
    <div class="container pt-2 flex justify-star items-center w-full">
        <div class="w-full">
            <h1 class="mx-auto text-xl font-medium tracking-tight text-primary pt-4 pb-2">
                <span class="relative">
                    <span class="underline">Test</span>
                </span>
                test
            </h1>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        const { t } = useI18n();
        definePageMeta({
            layout: "main-layout",
            middleware: ["guest"],
            i18nKey: 'index'
        });
    }
};
</script>

<style scoped>
.asfd {}
</style>