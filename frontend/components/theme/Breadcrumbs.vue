<template>
    <div class="container pt-2 flex justify-start items-center w-full">
        <ol vocab="http://schema.org/" typeof="BreadcrumbList" class="flex gap-1 items-center text-xs">
            <li property="itemListElement"
                class="border border-solid w-fit px-2 text-xs rounded-full py-1 leading-none italic" typeof="ListItem">
                <NuxtLink property="item" typeof="WebPage" :to="localePath('/')">
                    <span property="name">{{ $t('index.pageName') }}</span>
                </NuxtLink>
                <meta property="position" content="1" />
            </li>
            <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <!-- <span class="text-xs">|
                </span> -->

                <li property="itemListElement" typeof="ListItem" :class="[
                    'border border-solid w-fit px-2 text-xs rounded-full py-1 leading-none italic',
                    index == (breadcrumbs.length - 1) ? '' : ''
                ]">
                    <NuxtLink property="item" typeof="WebPage" :to="localePath(breadcrumb.path)">
                        <span property="name">{{ $t(breadcrumb.meta.i18nKey || breadcrumb.defaultKey + '.pageName') }}
                        </span>
                    </NuxtLink>
                    <meta property="position" :content="index + 2" />
                </li>
            </template>

        </ol>
    </div>
</template>
  
<script>
export default {
    methods: {
        getAllPossibleURLs(url) {
            const { locale } = useI18n();
            var actualLocale = locale.value;
            const segments = url.split('/').filter(segment => segment !== '');
            if (segments.length > 0 && segments[0] === actualLocale) {
                segments.shift();
            }
            const possibleURLs = [];
            segments.reduce((accumulator, segment) => {
                const newURL = `${accumulator}/${segment}`;
                possibleURLs.push(newURL);
                return newURL;
            }, '');
            return possibleURLs;
        }
    },
    computed: {
        breadcrumbs() {
            var route = useRoute();
            var routes = this.$router.getRoutes();
            var fullPath = route.fullPath;
            console.log(fullPath)
            var allUrls = this.getAllPossibleURLs(fullPath);
            console.log(allUrls)
            var matchedRoutes = routes.filter(obj => allUrls.includes(obj.path));
            var finalRoutes = matchedRoutes.reverse().map(route => {
                const segments = route.path.split('/').filter(segment => segment !== '');
                const defaultKey = segments.join('.');
                return { ...route, defaultKey };
            });
            console.log(finalRoutes)
            return finalRoutes;
        }
    }
};
</script>
<style scoped>
.asdf {}
</style>