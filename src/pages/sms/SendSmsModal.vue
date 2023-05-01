<template>
    <q-dialog :model-value="props.isSendSmsModal" class="custom-modal" persistent>
        <q-card style="min-width: 485px">
            <q-bar class="header">
                <div class="title">SMS 보내기</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeModal" />
            </q-bar>

            <q-card-section>
                <p v-if="props.isAllMemberSend">회원 전체에게 발송 됩니다.</p>
                <Table v-else>
                    <template v-slot:header>
                        <tr>
                            <th>이름</th>
                            <th>발송 번호</th>
                            <th>고객 번호</th>
                        </tr>
                    </template>
                    <template v-slot:body>
                        <tr v-for="(member, i) in props.memberInfos" :key="i">
                            <td>{{ member.memberName }}</td>
                            <td>회사번호 필요</td>
                            <td>{{ member.memberPhone }}</td>
                        </tr>
                    </template>
                </Table>
                <q-input v-model="smsMessage" outlined type="textarea" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn :disable="!smsMessage" @click="sendSmsMessage" label="발송" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { ConfirmMessage, ToastMessage } from '@/helper';
import Table from '@/components/layout/Table.vue';
import { Member } from '@/models/member';
import memberService from '@/services/member.service';

const props = defineProps<{
    isSendSmsModal?: boolean;
    isAllMemberSend?: boolean;
    memberInfos?: Member[];
}>();
const emit = defineEmits(['update:isSendSmsModal']);
const isLoading = ref<boolean>(false);
const smsMessage = ref<string>('');

onMounted(() => {
    // getSmsTemplate();
});

async function getSmsTemplate() {
    try {
        isLoading.value = true;
        const res = await memberService.getSmsTemplate();
        smsMessage.value = res;
    } catch (e) {
        console.log(e);
        ToastMessage.error('문자 템플릿을 가져오는데 실패했습니다.. 다시 시도해주세요.');
    } finally {
        isLoading.value = false;
    }
}

// SMS 보내기
function sendSmsMessage() {
    ConfirmMessage({ title: 'Confirm', message: 'SMS 문자를 전송 하시겠습니까?' }).then(async () => {
        try {
            isLoading.value = true;
            const membverSeqList = props.memberInfos.map((x) => x.memberSeq);
            await memberService.sendSmsMessage({
                memberSeqList: membverSeqList,
                content: smsMessage.value,
                isAll: !!props.isAllMemberSend,
            });

            emit('update:isSendSmsModal', false);
        } catch (e) {
            console.log(e);
            ToastMessage.error('SMS 발송에 실패 했습니다. 다시 시도해주세요.');
        } finally {
            isLoading.value = false;
        }
    });
}

function closeModal() {
    emit('update:isSendSmsModal', false);
}
</script>

<style scoped lang="scss"></style>
