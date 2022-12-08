<template>
    <q-breadcrumbs class="text-black" active-color="black">
        <template v-slot:separator>
            <q-icon size="1.2em" name="chevron_right" color="black" />
        </template>

        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el v-for="(item, i) in breadcrumbItems" :key="i" :label="item.label" :to="item.to" />
    </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
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
