<template>
    <div class="content">
        <div class="status-box">
            <strong>전체목록</strong>
            <strong>총회원수 {{ memberStatus?.totalCount ? Filters.numberFormat(memberStatus.totalCount) : 0 }}명</strong>
            <strong>차단 {{ memberStatus?.blockCount ? Filters.numberFormat(memberStatus.blockCount) : 0 }}명</strong>
            <strong>탈퇴 {{ memberStatus?.withdrawCount ? Filters.numberFormat(memberStatus.withdrawCount) : 0 }}명</strong>
        </div>
        <section class="filter-section">
            <q-select v-model="searchModel.searchType" :options="searchByOptions" map-options emit-value outlined dense />
            <q-select v-if="MemberSearchType.Sex === searchModel.searchType" v-model="searchModel.searchKeyword" :options="sexOptions" map-options emit-value outlined dense />
            <q-select
                v-else-if="MemberSearchType.MemberTendency === searchModel.searchType"
                v-model="searchModel.searchKeyword"
                :options="MemberTendencyOptions"
                map-options
                emit-value
                outlined
                dense
            />
            <q-input v-else v-model="searchModel.searchKeyword" label="검색어" @keydown.enter="getMemberList" outlined dense />
            <q-btn @click="getMemberList" label="검색" color="primary" icon="search" unelevated />
            <q-space />
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
            </div>
        </section>

        <div class="common-btn-area">
            <q-btn @click="openSendSmsModal(false)" :disable="!selectedMemberList.length" label="선택 문자 보내기" color="secondary" unelevated />
            <q-btn @click="openSendSmsModal(true)" label="전체 문자 보내기" color="secondary" unelevated />
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
import { computed, onMounted, reactive, ref } from 'vue';
import SendSmsModal from '@/pages/sms/SendSmsModal.vue';
import { Member } from '@/models/member';
import memberService from '@/services/member.service';
import PageNavigation from '@/components/PageNavigation.vue';
import { Filters, ToastMessage } from '@/helper';
import { MemberSearchType } from '@/models/enums';

const isLoading = ref<boolean>(false);
const pageOptions = ref<DTO.Common.PageOptions>({
    pageNumber: 1,
    pageSize: 15,
    totalCount: 0,
});
const searchModel = ref({
    searchType: '',
    searchKeyword: '',
});
const searchByOptions = reactive([
    { label: '전체', value: '' },
    { label: '이름', value: MemberSearchType.MemberName },
    { label: '성별', value: MemberSearchType.Sex },
    { label: '성향', value: MemberSearchType.MemberTendency },
    { label: 'E-Mail', value: MemberSearchType.MemberEmail },
    { label: '휴대폰번호', value: MemberSearchType.MemberPhone },
    { label: '가입일시', value: MemberSearchType.MemberRegisterdAt },
]);
const sexOptions = [
    { label: '전체', value: '' },
    { label: '남', value: '남' },
    { label: '여', value: '여' },
];
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

        const res = await memberService.getMembers({ ...searchModel.value, ...pageOptions.value });

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
    margin: 20px 0;
    tr {
        cursor: pointer;
    }
}
</style>
