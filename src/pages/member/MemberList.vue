<template>
    <div class="content">
        <div class="status-box">
            <strong>전체목록</strong>
            <strong>총회원수 {{ memberStatus?.totalCount ? Filters.numberFormat(memberStatus.totalCount) : 0 }}명</strong>
            <strong>차단 {{ memberStatus?.blockCount ? Filters.numberFormat(memberStatus.blockCount) : 0 }}명</strong>
            <strong>탈퇴 {{ memberStatus?.withdrawCount ? Filters.numberFormat(memberStatus.withdrawCount) : 0 }}명</strong>
        </div>
        <section class="filter-section">
            <q-select v-model="searchModel.searchType" :options="searchByOptions" map-options emit-value outlined dense style="width: 150px" />
            <q-select v-if="MemberSearchType.Sex === searchModel.searchType" v-model="searchModel.searchKeyword" :options="sexOptions" map-options emit-value outlined dense style="width: 150px" />
            <q-select
                v-else-if="MemberSearchType.MemberTendency === searchModel.searchType"
                v-model="searchModel.searchKeyword"
                :options="memberTendencyOptions"
                map-options
                emit-value
                outlined
                dense
                style="width: 150px"
            />
            <MultipleCalendar v-else-if="MemberSearchType.MemberCreateDt === searchModel.searchType" v-model:date="registerDateRange" style="width: 220px" />
            <q-input v-else v-model="searchModel.searchKeyword" label="검색어" @keydown.enter="getMemberList" outlined dense style="width: 150px" />
            <q-btn @click="getMemberList" label="검색" color="primary" icon="search" unelevated />
            <q-space />
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
            </div>
        </section>
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
                <tr v-for="(member, i) in memberList" :key="i">
                    <td>
                        <q-checkbox v-model="member.isSelected" />
                    </td>
                    <td>{{ member.memberId }}</td>
                    <td>
                        <div>
                            {{ member.memberName }}
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <q-item :to="`members/${member.memberSeq}/articles`" clickable>
                                        <q-item-section>작성글보기</q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item :to="`members/${member.memberSeq}/photo-list`" clickable>
                                        <q-item-section>올린사진보기</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </div>
                    </td>
                    <td>{{ member.memberPhone }}</td>
                    <td>{{ member.memberEmail }}</td>
                    <td>{{ member.address }} {{ member.address2 }} {{ member.address3 }}</td>
                </tr>
                <tr v-if="!memberList.length & !isLoading" class="text-center">
                    <td colspan="100%">No Data</td>
                </tr>
            </template>
        </Table>

        <div class="common-btn-area">
            <div class="paging-section">
                <PageNavigation :pageOptions="pageOptions" :isListLoading="isLoading" @listChange="getMemberList($event)" />
            </div>
            <q-space />
            <q-btn @click="openModifyModal" :disable="selectedMemberList.length !== 1" label="선택수정" color="secondary" unelevated />
            <q-btn @click="handleDeleteMember" :disable="!selectedMemberList.length" label="선택삭제" color="negative" unelevated />
            <q-btn @click="handleBlockMember" :disable="!selectedMemberList.length" label="선택차단" color="negative" unelevated />
        </div>

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { DTO } from '@/models';
import memberService from '@/services/member.service';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { Filters, ConfirmMessage, ToastMessage } from '@/helper';
import { MemberSearchType } from '@/models/enums';
import PageNavigation from '@/components/PageNavigation.vue';
import dayjs from 'dayjs';
import MultipleCalendar from '@/components/calendar/MultipleCalendar.vue';

const isLoading = ref<boolean>(false);
const registerDateRange = ref({
    from: dayjs().format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD'),
});
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
    { label: '가입일시', value: MemberSearchType.MemberCreateDt },
]);
const sexOptions = [
    { label: '전체', value: '' },
    { label: '남', value: '남' },
    { label: '여', value: '여' },
];
const memberTendencyOptions = ref([]);
const memberStatus = ref<DTO.Member.GetMemberStatusResponse>(null);
const memberList = ref([]);
const allSelect = ref<boolean>(false);
const selectedMemberList = computed(() => {
    return memberList.value.filter((x) => x.isSelected);
});
const isModifyModal = ref<boolean>(false);

watch(
    () => searchModel.value.searchType,
    () => {
        if (searchModel.value.searchType === MemberSearchType.MemberCreateDt) {
            searchModel.value.searchKeyword = dayjs().format('YYYY-MM-DD HH-mm-ss');
        } else {
            searchModel.value.searchKeyword = '';
        }
    }
);

onMounted(() => {
    getMemberStatus();
    getTendencyList();
    getMemberList();
    getMemberTendencyOptions();
});

async function getMemberStatus() {
    try {
        const res = await memberService.getMemberStatus();

        memberStatus.value = res;
    } catch (e) {
        ToastMessage.error(e);
    }
}
async function getTendencyList() {
    try {
        const res = await memberService.getTendencyList();
        memberTendencyOptions.value = res.map((x) => {
            return { label: x.memberTendencyName, value: x.memberTendencyCd };
        });
    } catch (e) {
        ToastMessage.error(e);
    }
}
async function getMemberList(emitPageOptions = null) {
    try {
        if (emitPageOptions?.totalCount) {
            pageOptions.value = emitPageOptions;
        }
        isLoading.value = true;
        const params = { ...searchModel.value, ...pageOptions.value };
        if (params.searchType === DTO.Enums.MemberSearchType.MemberCreateDt) {
            params.searchKeyword = `${registerDateRange.value.from}|${registerDateRange.value.to}`;
        }
        const res = await memberService.getMembers(params);

        pageOptions.value.totalCount = res.totalCount;
        memberList.value = res.list.map((x) => {
            x.isSelected = false;
            return x;
        });
    } catch (e) {
        ToastMessage.error(e);
    } finally {
        isLoading.value = false;
    }
}

// 성향 리스트
async function getMemberTendencyOptions() {
    try {
        isLoading.value = true;

        // const res = await memberService.getMembers(searchModel.value);
    } catch (e) {
        ToastMessage.error(e);
    } finally {
        isLoading.value = false;
    }
}

function handleAllSelect() {
    memberList.value.forEach((x) => {
        x.isSelected = allSelect.value;
    });
}

function openModifyModal() {
    // 수정 모달 띄우기
    isModifyModal.value = true;
}

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
        isModifyModal.value = false;
    }
}

function handleDeleteMember(memberInfo) {
    // 삭제
    ConfirmMessage({ title: '회원삭제', message: `${memberInfo.memberName} 을 삭제하시겠습니까?` }).then(async () => {
        try {
            isLoading.value = true;

            await memberService.deleteMember({
                memberId: memberInfo.memberId,
            });
            ToastMessage.success('Success');
        } catch (e) {
            console.log(e);
            ToastMessage.error('삭제 실패했습니다.');
        } finally {
            isLoading.value = false;
        }
    });
}

function handleBlockMember(memberInfo) {
    // 차단
    ConfirmMessage({ title: '회원 차단', message: `${memberInfo.memberName} 을 삭제하시겠습니까?` }).then(async () => {
        try {
            isLoading.value = true;

            await memberService.blockMember({
                memberId: memberInfo.memberId,
            });
            ToastMessage.success('Success');
        } catch (e) {
            console.log(e);
            ToastMessage.error('차단이 실패했습니다.');
        } finally {
            isLoading.value = false;
        }
    });
}
</script>

<style scoped lang="scss"></style>
