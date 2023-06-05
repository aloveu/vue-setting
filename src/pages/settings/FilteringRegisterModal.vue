<template>
    <q-dialog :model-value="props.isRegisterModal" class="custom-modal" persistent>
        <q-card style="min-width: 485px">
            <q-bar class="header">
                <div class="title">댓글 차단 단어 등록</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeModal" />
            </q-bar>

            <q-card-section>
                <Table>
                    <template v-slot:body>
                        <tr>
                            <th>차단 단어</th>
                            <td>
                                <q-input v-model="regFilteringInfo.word" hide-bottom-space outlined dense />
                            </td>
                        </tr>
                        <tr>
                            <th>차단 여부</th>
                            <td class="text-left">
                                <q-checkbox v-model="regFilteringInfo.isBlock" />
                            </td>
                        </tr>
                    </template>
                </Table>
                <div class="infomation">차단 단어 등록 이후 App 서비스에서 댓글 작성시 단어 필터 적용됩니다.</div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn :disable="!regFilteringInfo.word" @click="addReplyFilterInfo" label="등록" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { ConfirmMessage, ToastMessage } from '@/helper';
import Table from '@/components/layout/Table.vue';
import { AddReplyFilterInfoRequest, FilterInfo } from '@/models/settings';
import settingsService from '@/services/settings.service';

const props = defineProps<{
    isRegisterModal?: boolean;
    filterInfo?: FilterInfo;
}>();
const emit = defineEmits(['update:isRegisterModal']);
const isLoading = ref<boolean>(false);
const regFilteringInfo = ref<AddReplyFilterInfoRequest>({
    word: '',
    isBlock: false,
});

onMounted(() => {
    if (props.filterInfo) {
        regFilteringInfo.value.word = props.filterInfo?.filterWord;
        regFilteringInfo.value.isBlock = !!props.filterInfo?.filterStatus;
    }
});

function addReplyFilterInfo() {
    ConfirmMessage({ title: 'Confirm', message: 'SMS 문자를 전송 하시겠습니까?' }).then(async () => {
        try {
            isLoading.value = true;
            await settingsService.addReplyFilterInfo({ ...regFilteringInfo.value });

            closeModal();
        } catch (e) {
            console.log(e);
            ToastMessage.error('단어 등록에 실패 했습니다. 다시 시도해주세요.');
        } finally {
            isLoading.value = false;
        }
    });
}

function closeModal() {
    emit('update:isRegisterModal', false);
}
</script>

<style scoped lang="scss">
.infomation {
    padding: 20px 0;
    text-align: center;
}
</style>
