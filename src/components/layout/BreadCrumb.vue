<template>
    <Breadcrumb :home="home" :model="breadcrumbItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';

const route = useRoute();
const home = { icon: 'pi pi-home', to: '/' };
const breadcrumbItems = computed(() => {
    const pathArray = route.path.split('/');

    pathArray.shift();

    return pathArray.reduce((breadcrumbArray, splitPath, idx) => {
        breadcrumbArray.push({
            path: splitPath,
            to: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${splitPath}` : `/${splitPath}`,
            label: (route.matched[idx] && route.matched[idx].meta.title) || splitPath,
        });
        return breadcrumbArray;
    }, []);
});
</script>

<style scoped lang="scss">
.p-breadcrumb {
    padding: 1rem 0;
    background-color: transparent;
    border: 0 none;
}
</style>
