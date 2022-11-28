<template>
    <h2 class="title">Page Nav</h2>
    <div class="content">
        <ul>
            <li v-for="i in pageOptions.pageSize" :key="i">{{ i + (pageOptions.currentPage - 1) * pageOptions.pageSize }}</li>
        </ul>
        <PageNavigation :pageOptions="pageOptions" :isListLoading="isListLoading" @listChange="onListChangeRequested($event)" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageNavigation from '@/components/PageNavigation.vue';
import { DTO } from '@/models';

const isListLoading = ref(true);
const pageOptions = ref({
    currentPage: 1,
    pageSize: 10,
} as DTO.Common.PageOptions);

onMounted(() => {
    getList(1);
});

async function onListChangeRequested(options: DTO.Common.PageOptions) {
    pageOptions.value = options;

    await getList(pageOptions.value.currentPage);
}

async function getList(page: number) {
    try {
        isListLoading.value = true;

        // list api 호출
        // await ... list(page);
        setTimeout(() => {
            pageOptions.value.totalCount = 300;
        }, 500);
    } catch (e) {
        console.log(e);
    } finally {
        isListLoading.value = false;
    }
}
</script>

<style scoped lang="scss"></style>
