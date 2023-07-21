<template>
    <div class="container pt-2 flex justify-between items-center w-full" v-if="useRoute().fullPath != localePath('/')">
        <ol vocab="http://schema.org/" typeof="BreadcrumbList"
            class="flex gap-1 items-center text-xs max-w-full overflow-auto p-2 sm:p-0">
            <li property="itemListElement"
                class="border border-input hover:border-solid  bg-solid-foreground w-fit px-2 text-xs rounded-full py-1 leading-none italic whitespace-nowrap	"
                typeof="ListItem">
                <NuxtLink property="item" typeof="WebPage" :to="localePath('/')">
                    <span property="name">{{ $t('index.pageName') }}</span>
                </NuxtLink>
                <meta property="position" content="1" />
            </li>
            <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <li property="itemListElement" typeof="ListItem" :class="[
                    'border hover:border-solid  bg-solid-foreground w-fit px-2 text-xs rounded-full py-1 leading-none italic whitespace-nowrap	',
                    index == (breadcrumbs.length - 1) ? 'border-solid font-semibold' : 'border-input'
                ]">
                    <NuxtLink property="item" typeof="WebPage" :to="localePath(breadcrumb.path)">
                        <span property="name">{{ $t(breadcrumb.meta.i18nKey || breadcrumb.defaultKey + '.pageName') }}
                        </span>
                    </NuxtLink>
                    <meta property="position" :content="index + 2" />
                </li>
            </template>
        </ol>
        <span
            class="bg-solid w-fit px-2 text-xs rounded-full py-1 leading-none italic text-solid-foreground border-solid-foreground border whitespace-nowrap	">
            <span class="font-semibold">Middlewares:</span> 
            <span class="underline">{{
                useRoute().meta.middleware.join(',') }}</span>
        </span>
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
            var allUrls = this.getAllPossibleURLs(fullPath);
            console.log(routes)
            var matchedRoutes = routes.filter(obj => allUrls.includes(obj.path));
            var finalRoutes = matchedRoutes.reverse().map(route => {
                const segments = route.path.split('/').filter(segment => segment !== '');
                const defaultKey = segments.join('.');
                return { ...route, defaultKey };
            });
            return finalRoutes;
        }
    }
};
</script>
<style scoped>
.asdf {}
</style>