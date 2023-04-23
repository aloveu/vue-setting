<template>
    <div class="content">
        <Table class="text-left">
            <template v-slot:body>
                <tr>
                    <th>아이디</th>
                    <td>
                        <q-input v-model="adminRegForm.adminId" :readonly="isEditPage" :error="vuelidate.adminId.$error" @blur="vuelidate.adminId.$touch" hide-bottom-space outlined dense />
                    </td>
                </tr>
                <tr>
                    <th>패스워드</th>
                    <td>
                        <q-input v-model="adminRegForm.adminPassword" :error="vuelidate.adminPassword.$error" @blur="vuelidate.adminPassword.$touch" type="password" hide-bottom-space outlined dense />
                    </td>
                </tr>
                <tr>
                    <th>패스워드 확인</th>
                    <td>
                        <q-input
                            v-model="adminRegForm.confirmPassword"
                            :error="vuelidate.confirmPassword.$error"
                            @blur="vuelidate.confirmPassword.$touch"
                            error-message="패스워드가 다릅니다."
                            type="password"
                            hide-bottom-space
                            outlined
                            dense
                        />
                    </td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td><q-input v-model="adminRegForm.adminName" :error="vuelidate.adminName.$error" @blur="vuelidate.adminName.$touch" hide-bottom-space outlined dense /></td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>
                        <q-input v-model="adminRegForm.adminPhone" :error="vuelidate.adminPhone.$error" @blur="vuelidate.adminPhone.$touch" mask="###-####-####" hide-bottom-space outlined dense />
                    </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td><q-input v-model="adminRegForm.adminEmail" :error="vuelidate.adminEmail.$error" @blur="vuelidate.adminEmail.$touch" hide-bottom-space outlined dense /></td>
                </tr>
            </template>
        </Table>

        <div class="common-btn-area">
            <q-btn v-if="isEditPage" @click="updateAdmin" :disable="vuelidate.$invalid" label="관리자 수정" color="primary" unelevated />
            <q-btn v-else @click="createAdmin" :disable="vuelidate.$invalid" label="관리자 등록" color="primary" unelevated />
        </div>

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { CreateAdminRequest } from '@/models/admin';
import { useRoute } from 'vue-router';
import adminService from '@/services/admin.service';
import { ToastMessage } from '@/helper';
import { email, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const route = useRoute();
const isLoading = ref<boolean>(false);
const adminId = route.params?.adminId;
const isEditPage = !!adminId;
const adminRegForm = reactive<CreateAdminRequest>({
    adminId: '',
    adminName: '',
    adminPhone: '',
    adminPassword: '',
    confirmPassword: '',
    adminEmail: '',
});
const adminRegRules = computed(() => ({
    adminId: { required },
    adminName: { required },
    adminPhone: { required },
    adminPassword: { required },
    confirmPassword: { required, sameAs: sameAs(adminRegForm.adminPassword) },
    adminEmail: { required, email },
}));
const vuelidate = useVuelidate(adminRegRules, adminRegForm);

onMounted(() => {
    if (isEditPage) {
        getAdminInfo();
    }
});

async function getAdminInfo() {
    try {
        isLoading.value = true;
        const res = await adminService.getAdminInfo({ adminId: String(adminId) });

        Object.assign(adminRegForm, res);
    } catch (e) {
        console.log(e);
        ToastMessage.error('관리자 정보 호출에 실패 했습니다. 다시 시도해 주세요.');
    } finally {
        isLoading.value = false;
    }
}

async function createAdmin() {
    try {
        isLoading.value = true;
        await adminService.createAdmin(adminRegForm);
        ToastMessage.success('Success');
    } catch (e) {
        console.log(e);
        ToastMessage.error('관리자 등록에 실패 했습니다. 다시 시도해 주세요.');
    } finally {
        isLoading.value = false;
    }
}

async function updateAdmin() {
    try {
        isLoading.value = true;
        await adminService.updateAdmin(adminRegForm);
        ToastMessage.success('Success');
    } catch (e) {
        console.log(e);
        ToastMessage.error('관리자 수정에 실패 했습니다. 다시 시도해 주세요.');
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped lang="scss">
th {
    width: 130px;
}
</style>
