<template>
    <div class="content">
        <div class="common-btn-area">
            <q-btn @click="openSendSmsModal(false)" :disable="!selectedMemberList.length" label="선택 문자 보내기" color="secondary" unelevated />
            <q-btn @click="openSendSmsModal(true)" label="전체 문자 보내기" color="secondary" unelevated />
            <q-space />
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
            </div>
        </div>
        <div class="status-box">
            <strong>전체목록</strong>
            <strong>총회원수 {{ memberStatus?.totalCount ? Filters.numberFormat(memberStatus.totalCount) : 0 }}명</strong>
            <strong>차단 {{ memberStatus?.blockCount ? Filters.numberFormat(memberStatus.blockCount) : 0 }}명</strong>
            <strong>탈퇴 {{ memberStatus?.withdrawCount ? Filters.numberFormat(memberStatus.withdrawCount) : 0 }}명</strong>
        </div>

        <Table class="member-list">
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

        <div class="paging-section">
            <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
        </div>

        <SendSmsModal v-if="isSendSmsModal" v-model:isSendSmsModal="isSendSmsModal" :isAllMemberSend="isAllMemberSend" :memberInfos="selectedMemberList" />

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { DTO } from '@/models';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { computed, onMounted, ref } from 'vue';
import SendSmsModal from '@/pages/sms/SendSmsModal.vue';
import { Member } from '@/models/member';
import memberService from '@/services/member.service';
import PageNavigation from '@/components/PageNavigation.vue';
import { Filters, ToastMessage } from '@/helper';

const isLoading = ref<boolean>(false);
const pageOptions = ref<DTO.Common.PageOptions>({
    pageNumber: 1,
    pageSize: 15,
    totalCount: 0,
});
const memberStatus = ref<DTO.Member.GetMemberStatusResponse>(null);
const memberList = ref([]);
const allSelect = ref<boolean>(false);
const selectedMemberList = computed(() => {
    return memberList.value.filter((x) => x.isSelected);
});
const isSendSmsModal = ref<boolean>(false);
const isAllMemberSend = ref<boolean>(false);

onMounted(() => {
    getMemberStatus();
    getMemberList();
});

async function getMemberStatus() {
    try {
        const res = await memberService.getMemberStatus();

        memberStatus.value = res;
    } catch (e) {
        ToastMessage.error(e);
    }
}
async function getMemberList(emitPageOptions = null) {
    try {
        if (emitPageOptions) {
            pageOptions.value = emitPageOptions;
        }
        isLoading.value = true;

        const res = await memberService.getMembers({ searchType: '', searchKeyword: '', ...pageOptions.value });

        pageOptions.value.totalCount = res.totalCount;
        memberList.value = res.list.map((x) => {
            x.isSelected = false;
            return x;
        });
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
.member-list {
    margin-bottom: 20px;
    tr {
        cursor: pointer;
    }
}
</style>
