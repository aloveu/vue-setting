<template>
    <div>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const items = [
    {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
    },
    {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
    },
    {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
    },
];

const breadcrumbItems = computed(() => {
    const pathArray = route.path.split('/');

    pathArray.shift();
    const itemsCount = pathArray.length;

    return pathArray.reduce(
        (breadcrumbArray, splitPath, idx) => {
            const count = idx + 2;
            breadcrumbArray.push({
                path: splitPath,
                disabled: count > itemsCount,
                href: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${splitPath}` : `/${splitPath}`,
                text: (route.matched[idx] && route.matched[idx].meta.title) || splitPath,
            });
            return breadcrumbArray;
        },
        [{ path: '/', diabled: false, href: '/', text: 'HOME' }]
    );
});
</script>

<style scoped lang="scss"></style>
