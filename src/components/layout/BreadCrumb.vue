<template>
    <q-breadcrumbs class="breadcrumb text-black" active-color="black">
        <template v-slot:separator>
            <q-icon size="1.2em" name="chevron_right" color="grey" />
        </template>

        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el v-for="(item, i) in breadcrumbItems" :key="i" :label="item.label" :to="item.to" />
    </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbItems = computed(() => {
    const pathArray = route.path.split('/');
    const slicePathArray = pathArray.slice(1);
    let finalData = [];

    finalData = slicePathArray.reduce((breadcrumbArray, splitPath, idx) => {
        breadcrumbArray.push({
            to: breadcrumbArray[idx - 1] ? `${breadcrumbArray[idx - 1].to}/${splitPath}` : `/${splitPath}`,
            label: splitPath,
        });
        return breadcrumbArray;
    }, []);

    return finalData;
});
</script>

<style scoped lang="scss">
.breadcrumb {
    padding: 0 0 9px 0;
    background-color: transparent;
    border: 0 none;
    :deep {
        .q-gutter-y-sm,
        .q-gutter-sm {
            margin: 0;
            & > * {
                margin: 0;
            }
        }
        .q-breadcrumbs__el {
            color: $black;
        }
        .q-breadcrumbs--last {
            font-weight: bold;
        }
    }
}
</style>
