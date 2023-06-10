<template>
    <div class="content">
        <section class="filter-section">
            <q-input v-model="searchModel.searchKeyword" label="단어" @keydown.enter="getFilterList" outlined dense />
            <q-btn @click="getFilterList" label="검색" color="primary" icon="search" unelevated />
            <q-space />
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getFilterList($event)" />
            </div>
        </section>

        <Table class="filter-info-list">
            <template v-slot:header>
                <tr>
                    <th>필터 명</th>
                    <th>제어 여부</th>
                    <th>등록일</th>
                    <th>삭제 여부</th>
                </tr>
            </template>
            <template v-slot:body>
                <tr @click="openFilteringModifyModal(filterInfo)" v-for="(filterInfo, i) in filteringTextList" :key="i">
                    <td>{{ filterInfo.filterWord }}</td>
                    <td class="text-center">{{ filterInfo.isActive ? '필터 적용' : '필터 미적용' }}</td>
                    <td>{{ dayjs(filterInfo.createDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                    <td class="text-center">
                        <q-btn
                            @click="
                                $event.stopPropagation();
                                deleteFilteringText(filterInfo);
                            "
                            label="삭제"
                            color="negative"
                            unelevated
                        />
                    </td>
                </tr>
                <tr class="text-center" v-if="!filteringTextList.length & !isLoading">
                    <td colspan="100%">No Data</td>
                </tr>
            </template>
        </Table>

        <div class="common-btn-area">
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getFilterList($event)" />
            </div>
            <q-space />
            <q-btn @click="openFilteringRegisterModal" label="단어 등록" color="primary" unelevated />
        </div>

        <FilteringRegisterModal v-if="isRegisterModal" v-model:isRegisterModal="isRegisterModal" :filterInfo="selectedFilterInfo" @successRegister="getFilterList" />
        <Loading v-if="isLoading" />
    </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { DTO } from '@/models';
import { onMounted, ref } from 'vue';
import settingsService from '@/services/settings.service';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import { ConfirmMessage, ToastMessage } from '@/helper';
import FilteringRegisterModal from '@/pages/settings/FilteringRegisterModal.vue';

const isLoading = ref<boolean>(false);
const pageOptions = ref<DTO.Common.PageOptions>({
    pageNumber: 1,
    pageSize: 15,
    totalCount: 0,
});
const searchModel = ref({
    searchKeyword: '',
});
const filteringTextList = ref([]);
const isRegisterModal = ref(false);
const selectedFilterInfo = ref(null);

onMounted(() => {
    getFilterList();
});

async function getFilterList(emitPageOptions = null) {
    try {
        if (emitPageOptions?.totalCount) {
            pageOptions.value = emitPageOptions;
        }
        isLoading.value = true;

        const res = await settingsService.getReplyFilterInfoList({
            word: searchModel.value.searchKeyword,
            ...pageOptions.value,
        });

        filteringTextList.value = res.list;
        pageOptions.value.totalCount = res.totalCount;
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
}

function openFilteringRegisterModal() {
    selectedFilterInfo.value = null;
    isRegisterModal.value = true;
}

function openFilteringModifyModal(filterInfo) {
    selectedFilterInfo.value = filterInfo;
    isRegisterModal.value = true;
}

function deleteFilteringText(filterInfo) {
    ConfirmMessage({ title: '단어 삭제', message: `\'${filterInfo.filterWord}\' 을(를) 삭제하시겠습니까?` }).then(async () => {
        try {
            isLoading.value = true;

            await settingsService.deleteReplyFilterInfo({
                filterSeq: filterInfo.filterSeq,
            });
            ToastMessage.success('Success');
            getFilterList();
        } catch (e) {
            console.log(e);
            ToastMessage.error('삭제 실패했습니다.');
        } finally {
            isLoading.value = false;
        }
    });
}
</script>
<style scoped lang="scss">
tbody {
    tr {
        cursor: pointer;
    }
}
</style>
