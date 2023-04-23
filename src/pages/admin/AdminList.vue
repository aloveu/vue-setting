<template>
    <div class="content">
        <section class="filter-section">
            <q-input v-model="searchModel.searchText" label="아이디" @keydown.enter="getAdminList" outlined dense />
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
                <tr @click="$router.push(`detail/${admin.adminId}`)" v-for="(admin, i) in adminList" :key="i">
                    <td>{{ admin.adminId }}</td>
                    <td>{{ admin.adminName }}</td>
                    <td>{{ admin.adminPhone }}</td>
                    <td>{{ admin.adminRegistedAt }}</td>
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
            <q-btn to="admin/create" label="관리자 등록" color="primary" unelevated />
        </div>

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import adminService from '@/services/admin.service';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { ConfirmMessage, ToastMessage } from '@/helper';

const isLoading = ref<boolean>(false);
const searchModel = ref({
    searchText: '',
});
const adminList = ref([]);
const allSelect = ref<boolean>(false);

onMounted(() => {
    getAdminList();
});

async function getAdminList() {
    try {
        isLoading.value = true;

        const res = await adminService.getAdmins({});

        adminList.value = res;
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
}

function handleDeleteMember(adminInfo) {
    // 삭제
    ConfirmMessage({ title: '관리자 계정 삭제', message: `${adminInfo.adminName} 을 삭제하시겠습니까?` }).then(async () => {
        try {
            isLoading.value = true;

            await adminService.deleteAdmin({
                adminId: adminInfo.adminId,
            });
            ToastMessage.success('Success');
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
