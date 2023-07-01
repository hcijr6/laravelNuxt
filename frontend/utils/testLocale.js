export function testLocale(path) {
    const { $i18n } = useNuxtApp();
    let locale =
        $i18n.locale.value === $i18n.fallbackLocale.value
            ? ""
            : "/" + $i18n.locale.value;
    return locale + path;
};