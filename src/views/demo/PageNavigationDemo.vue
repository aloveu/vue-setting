<template>
    <h2 class="title">Page Nav</h2>
    <div class="content">
        <ul>
            <li v-for="i in pageOptions.pageSize" :key="i">{{ i + (pageOptions.currentPage - 1) * pageOptions.pageSize }}</li>
        </ul>
        <PageNavigation :pageOptions="pageOptions" :isListLoading="isListLoading" @listChange="onListChangeRequested($event)" />
    </div>

    <Loading v-if="isListLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DTO } from '@/models';
import PageNavigation from '@/components/PageNavigation.vue';
import Loading from '@/components/Loading.vue';

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
            isListLoading.value = false;
        }, 500);
    } catch (e) {
        console.log(e);
    } finally {
        // isListLoading.value = false;
    }
}
</script>

<style scoped lang="scss"></style>
