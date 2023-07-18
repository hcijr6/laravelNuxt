<template>
    <ol vocab="http://schema.org/" typeof="BreadcrumbList">
        <li property="itemListElement" typeof="ListItem">
            <NuxtLink property="item" typeof="WebPage" to="/">
                <span property="name">Home</span>
            </NuxtLink>
            <meta property="position" content="1" />
        </li>
        <li v-for="(crumb, index) in crumbs" :key="index" property="itemListElement" typeof="ListItem">
            <NuxtLink property="item" typeof="WebPage" :to="crumb.path">
                <span property="name">{{
                    $route.fullPath === crumb.path && title !== null ? title : crumb.name
                }}</span>
            </NuxtLink>
            <meta property="position" :content="index + 2" />
        </li>
    </ol>
</template>
  
<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },
    },
    computed: {
        crumbs() {
            const fullPath = this.$route.fullPath
            const params = fullPath.startsWith('/')
                ? fullPath.substring(1).split('/')
                : fullPath.split('/')
            const crumbs = [];
            let path = '';
            params.forEach((param, index) => {
                path = `${path}/${param}`
                var paramName = param.charAt(0).toUpperCase() + param.slice(1);
                crumbs.push({
                    name: paramName,
                    path: path
                });
            })
            return crumbs;
        }
    },
};
</script>
<style scoped>
.asdf {}
</style>