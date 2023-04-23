<template>
    <q-dialog :model-value="props.isShowPlayerInfo" class="custom-modal" persistent>
        <q-card style="min-width: 485px">
            <q-bar class="header">
                <div class="title">휴대폰 인증</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeModal" />
            </q-bar>

            <q-card-section>
                <q-input :disable="!isVerifyCodeSended" v-model="verifyCode" label="인증번호 입력" v-digit-only.decimal="6" v-focus outlined lazy-rules autocomplete="off"> </q-input>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-if="isVerifyCodeSended" :loading="isLoading" @click="confirmVerificationCode" label="인증 완료" color="primary" />
                <q-btn v-else :loading="isLoading" @click="sendVerificationCode" label="인증 번호 발송" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { ToastMessage } from '@/helper';
import { useRouter } from 'vue-router';

const props = defineProps<{
    isShowPlayerInfo?: boolean;
    adminSeq: number;
}>();
const emit = defineEmits(['update:isShowPlayerInfo']);
const authStore = useAuthStore();
const isVerifyCodeSended = ref<boolean>(false);
const verifyCode = ref<string>('');
const isLoading = ref<boolean>(false);
const router = useRouter();

// SMS 보내기
async function sendVerificationCode() {
    try {
        isLoading.value = true;
        const res = await authService.getLoginAuthNumber({ adminSeq: props.adminSeq });
        isVerifyCodeSended.value = true;
    } catch (e) {
        console.log(e);
        ToastMessage.error('인증 번호 발송에 실패 했습니다. 다시 시도해주세요.');
    } finally {
        isLoading.value = false;
    }
}

// 인증 코드 확인
async function confirmVerificationCode() {
    try {
        isLoading.value = true;
        await authService.certifyLoginAuthNumber({ adminSeq: props.adminSeq, authNumber: verifyCode.value });
        authStore.signIn();
        router.push('/management/members/list');
    } catch (e) {
        console.log(e);
        ToastMessage.error('인증에 실패 했습니다. 다시 시도해주세요.');
    } finally {
        isLoading.value = false;
        closeModal();
    }
}

function closeModal() {
    emit('update:isShowPlayerInfo', false);
}
</script>

<style scoped lang="scss"></style>
