<template>
    <div class="content">
        <div class="common-btn-area">
            <q-btn @click="openSendSmsModal(false)" :disable="!selectedMemberList.length" label="선택 문자 보내기" color="secondary" unelevated />
            <q-btn @click="openSendSmsModal(true)" label="전체 문자 보내기" color="secondary" unelevated />
        </div>
        <div>전체목록 | 총회원수 20,570명 중 차단 12명 탈퇴 50명</div>

        <Table>
            <template v-slot:header>
                <tr>
                    <th>
                        <q-checkbox @click="handleAllSelect" v-model="allSelect" />
                    </th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>휴대폰번호</th>
                    <th>E-Mail</th>
                    <th>주소</th>
                </tr>
            </template>
            <template v-slot:body>
                <tr @click="sendSmsThisMemeber(member)" v-for="(member, i) in memberList" :key="i">
                    <td>
                        <q-checkbox v-model="member.isSelected" />
                    </td>
                    <td>{{ member.memberId }}</td>
                    <td>{{ member.memberName }}</td>
                    <td>{{ member.memberPhone }}</td>
                    <td>{{ member.memberEmail }}</td>
                    <td>{{ member.memberAddr }}</td>
                </tr>
                <tr v-if="!memberList.length & !isLoading">
                    <td colspan="100%">No Data</td>
                </tr>
            </template>
        </Table>

        <SendSmsModal v-if="isSendSmsModal" v-model:isSendSmsModal="isSendSmsModal" :isAllMemberSend="isAllMemberSend" :memberInfos="selectedMemberList" />

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { computed, onMounted, ref } from 'vue';
import SendSmsModal from '@/pages/sms/SendSmsModal.vue';
import { Member } from '@/models/member';

const isLoading = ref<boolean>(false);
const memberList = ref([]);
const allSelect = ref<boolean>(false);
const selectedMemberList = computed(() => {
    return memberList.value.filter((x) => x.isSelected);
});
const isSendSmsModal = ref<boolean>(false);
const isAllMemberSend = ref<boolean>(false);

onMounted(() => {
    getMemberList();
});

async function getMemberList() {
    try {
        isLoading.value = true;

        // const res = await memberService.getMembers({});

        memberList.value = [
            {
                memberId: 'asdfas',
                memberName: '정상천',
                memberPhone: '010-1111-2222',
                memberEmail: 'asdf@sdfas.com',
                memberAddr: '서울특별시,.....',
                isSelected: false,
            },
        ];
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
}
function handleAllSelect() {
    memberList.value.forEach((x) => {
        x.isSelected = allSelect.value;
    });
}

// SMS 보내기
function openSendSmsModal(isAllMemberSendParam) {
    isAllMemberSend.value = isAllMemberSendParam;
    isSendSmsModal.value = true;
}

function sendSmsThisMemeber(member: Member) {
    member.isSelected = true;
    isSendSmsModal.value = true;
}
</script>

<style scoped lang="scss">
tr {
    cursor: pointer;
}
</style>
