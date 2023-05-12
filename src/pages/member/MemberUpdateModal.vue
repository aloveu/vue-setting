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
                <q-btn @click="handleUpdateMember" label="수정" color="primary" />
            </q-card-actions>
            <Loading v-if="isLoading" />
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import { DTO } from '@/models';
import { ToastMessage } from '@/helper';
import memberService from '@/services/member.service';
import Loading from '@/components/Loading.vue';

const props = defineProps<{
    memberInfo: DTO.Member.Member;
    isModifyModal?: boolean;
}>();
const emit = defineEmits(['update:isModifyModal']);
const isLoading = ref<boolean>(false);
const isVerifyCodeSended = ref<boolean>(false);
const verifyCode = ref<string>('');
const tempVerifyCode = ref<string>('');

async function handleUpdateMember(memberInfo) {
    // 수정
    try {
        isLoading.value = true;

        await memberService.updateMemberInfo({
            memberId: memberInfo.memberId,
        });
        ToastMessage.success('Success');
    } catch (e) {
        console.log(e);
        ToastMessage.error('실패했습니다.');
    } finally {
        isLoading.value = false;
        closeModal();
    }
}
function closeModal() {
    emit('update:isModifyModal', false);
}
</script>

<style scoped lang="scss"></style>
