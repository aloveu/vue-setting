<template>
    <q-dialog :model-value="props.isModifyModal" class="custom-modal" persistent>
        <q-card style="min-width: 485px">
            <q-bar class="header">
                <div class="title">수정</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeModal" />
            </q-bar>

            <q-card-section>
                <q-input :disable="!isVerifyCodeSended" v-model="verifyCode" label="인증번호 입력" v-digit-only.decimal="6" v-focus outlined lazy-rules autocomplete="off"> </q-input>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-if="isVerifyCodeSended" @click="confirmVerificationCode" label="인증 완료" color="primary" />
                <q-btn v-else @click="sendVerificationCode" label="인증 번호 발송" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { ToastMessage } from '@/helper';

const props = defineProps<{
    isModifyModal?: boolean;
}>();
const emit = defineEmits(['update:isModifyModal']);
const authStore = useAuthStore();
const isVerifyCodeSended = ref<boolean>(false);
const verifyCode = ref<string>('');
const tempVerifyCode = ref<string>('');

// SMS 보내기
async function sendVerificationCode() {
    try {
        const res = await authService.smsAuth({ authValue: authStore.userInfo.adminPhone });
        console.log(res);
        tempVerifyCode.value = '111111';
        isVerifyCodeSended.value = true;
    } catch (e) {
        console.log(e);
        ToastMessage.error('인증 번호 발송에 실패 했습니다. 다시 시도해주세요.');
    }
}

// 인증 코드 확인
function confirmVerificationCode() {
    if (verifyCode.value === tempVerifyCode.value) {
        authStore.signIn();
    } else {
        ToastMessage.error('인증에 실패 했습니다. 다시 시도해주세요.');
    }
    closeModal();
}

function closeModal() {
    emit('update:isModifyModal', false);
}
</script>

<style scoped lang="scss"></style>
