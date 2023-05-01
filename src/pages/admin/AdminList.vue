<template>
    <div class="content">
        <section class="filter-section">
            <q-input v-model="searchModel.searchKeyword" label="아이디" @keydown.enter="getAdminList" outlined dense />
            <q-btn @click="getAdminList" label="검색" color="primary" icon="search" unelevated />
        </section>
        <Table class="text-center">
            <template v-slot:header>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>가입일</th>
                    <th>삭제 여부</th>
                </tr>
            </template>
            <template v-slot:body>
                <tr @click="openEditAdminModal(admin)" v-for="(admin, i) in adminList" :key="i">
                    <td>{{ admin.adminId }}</td>
                    <td>{{ admin.adminName }}</td>
                    <td>{{ admin.adminPhone }}</td>
                    <td>{{ dayjs(admin.createDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                    <td>
                        <q-btn
                            @click="
                                $event.stopPropagation();
                                handleDeleteMember(admin);
                            "
                            label="계정삭제"
                            color="negative"
                            unelevated
                        />
                    </td>
                </tr>
                <tr v-if="!adminList.length">
                    <td colspan="100%">No Data</td>
                </tr>
            </template>
        </Table>

        <div class="common-btn-area">
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
            </div>
            <q-space />
            <q-btn @click="openEditAdminModal" label="관리자 등록" color="primary" unelevated />
        </div>

        <Loading v-if="isLoading" />
    </div>

    <q-dialog v-if="isShowEditModal" v-model="isShowEditModal" @hide="selectedInfo = null" persistent>
        <AdminEdit :adminInfo="selectedInfo" @success="adminEditSuccess" />
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { DTO } from '@/models';
import adminService from '@/services/admin.service';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { ConfirmMessage, ToastMessage } from '@/helper';
import PageNavigation from '@/components/PageNavigation.vue';
import dayjs from 'dayjs';
import AdminEdit from '@/pages/admin/AdminEdit.vue';

const isLoading = ref<boolean>(false);
const pageOptions = ref<DTO.Common.PageOptions>({
    pageNumber: 1,
    pageSize: 15,
    totalCount: 0,
});
const searchModel = ref({
    searchType: 'adminId',
    searchKeyword: '',
});
const adminList = ref([]);
const allSelect = ref<boolean>(false);
const isShowEditModal = ref<boolean>(false);
const selectedInfo = ref<DTO.Admin.AdminInfo>(null);

onMounted(() => {
    getAdminList();
});

async function getAdminList(emitPageOptions = null) {
    try {
        if (emitPageOptions?.totalCount) {
            pageOptions.value = emitPageOptions;
        }
        isLoading.value = true;

        const res = await adminService.getAdmins({ ...searchModel.value, ...pageOptions.value });

        adminList.value = res.list;
        pageOptions.value.totalCount = res.totalCount;
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
}

function openEditAdminModal(adminInfo = null) {
    // 등록/수정 모달
    isShowEditModal.value = true;
    selectedInfo.value = adminInfo;
}

function handleDeleteMember(adminInfo) {
    // 삭제
    ConfirmMessage({ title: '관리자 계정 삭제', message: `${adminInfo.adminName} 을 삭제하시겠습니까?` }).then(async () => {
        try {
            isLoading.value = true;

            await adminService.deleteAdmin({ adminSeq: adminInfo.adminSeq });
            ToastMessage.success('삭제 성공했습니다.');
        } catch (e) {
            console.log(e);
            ToastMessage.error('삭제 실패했습니다.');
        } finally {
            isLoading.value = false;
        }
    });
}

function adminEditSuccess() {
    isShowEditModal.value = false;
    selectedInfo.value = null;
    getAdminList();
}
</script>

<style scoped lang="scss">
tbody {
    tr {
        cursor: pointer;
    }
}
</style>
