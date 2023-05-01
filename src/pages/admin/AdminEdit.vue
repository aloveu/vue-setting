<template>
    <q-card class="edit-modal">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">관리자 {{ isEditPage ? '수정' : '등록' }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
            <Table class="text-left">
                <template v-slot:body>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <div class="admin-id">
                                <q-input
                                    v-model="adminRegForm.adminId"
                                    :readonly="isEditPage || isDuplicatedConfirm"
                                    :error="vuelidate.adminId.$error"
                                    @blur="vuelidate.adminId.$touch"
                                    hide-bottom-space
                                    outlined
                                    dense
                                />
                                <q-btn @click="checkAdminId" v-if="!isEditPage" :disable="isDuplicatedConfirm" label="중복확인" color="negative" unelevated no-wrap />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>패스워드</th>
                        <td>
                            <q-input v-model="adminRegForm.adminPwd" :error="vuelidate.adminPwd.$error" @blur="vuelidate.adminPwd.$touch" type="password" hide-bottom-space outlined dense />
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
        </q-card-section>

        <q-card-actions align="right">
            <q-btn v-if="isEditPage" @click="updateAdmin" :disable="vuelidate.$invalid" label="관리자 수정" color="primary" unelevated />
            <q-btn v-else @click="createAdmin" :disable="vuelidate.$invalid" label="관리자 등록" color="primary" unelevated />
        </q-card-actions>

        <Loading v-if="isLoading" />
    </q-card>
</template>

<script setup lang="ts">
import { DTO } from '@/models';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { defineProps, defineEmits, computed, onMounted, reactive, ref } from 'vue';
import { CreateAdminRequest } from '@/models/admin';
import { useRoute } from 'vue-router';
import adminService from '@/services/admin.service';
import { ToastMessage } from '@/helper';
import { email, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const props = defineProps<{
    adminInfo?: DTO.Admin.AdminInfo;
}>();
const emit = defineEmits(['success']);
const route = useRoute();
const isLoading = ref<boolean>(false);
const isDuplicatedConfirm = ref<boolean>(false);
const isEditPage = !!props.adminInfo?.adminId;
const adminRegForm = reactive<CreateAdminRequest>({
    adminId: '',
    adminName: '',
    adminPhone: '',
    adminPwd: '',
    confirmPassword: '',
    adminEmail: '',
});
const adminRegRules = computed(() => ({
    adminId: { required },
    adminName: { required },
    adminPhone: { required },
    adminPwd: { required },
    confirmPassword: { required, sameAs: sameAs(adminRegForm.adminPwd) },
    adminEmail: { required, email },
}));
const vuelidate = useVuelidate(adminRegRules, adminRegForm);

onMounted(() => {
    if (isEditPage) {
        Object.assign(adminRegForm, props.adminInfo);
    }
});

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
        emit('success');
    } catch (e) {
        console.log(e);
        ToastMessage.error('관리자 수정에 실패 했습니다. 다시 시도해 주세요.');
    } finally {
        isLoading.value = false;
    }
}
async function checkAdminId() {
    try {
        isLoading.value = true;
        await adminService.checkAdminId({ adminId: adminRegForm.adminId });
        ToastMessage.success('사용하실 수 있는 아이디입니다');
        isDuplicatedConfirm.value = true;
    } catch (e) {
        console.log(e);
        ToastMessage.error(e);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped lang="scss">
.edit-modal {
    width: 600px;
    background-color: #fff;
    th {
        width: 130px;
    }
    .admin-id {
        display: flex;
        gap: 10px;
        .q-input {
            width: 100%;
        }
    }
}
</style>
