<template>
    <h2 class="title">{{ title }}</h2>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = computed(() => {
    return route.meta?.title || 'Admin';
});
</script>

<style scoped lang="scss">
h2 {
    &.title {
        padding: 0 20px;
        font-size: 26px;
        font-weight: 700;
        color: #000;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
    }
}
</style>
