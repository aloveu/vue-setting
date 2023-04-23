<template>
    <div class="content">
        <div>전체목록 | 총회원수 20,570명 중 차단 12명 탈퇴 50명</div>

        <section class="filter-section">
            <q-select v-model="searchModel.searchBy" :options="searchByOptions" map-options outlined dense />
            <q-input v-model="searchModel.searchText" label="회원아이디" @keydown.enter="getMemberList" outlined dense />
            <q-btn @click="getMemberList" label="검색" color="primary" icon="search" unelevated />
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
                                    <q-item :to="`members/${member.memberId}/articles`" clickable>
                                        <q-item-section>작성글보기</q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item :to="`members/${member.memberId}/photo-list`" clickable>
                                        <q-item-section>올린사진보기</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </div>
                    </td>
                    <td>{{ member.memberPhone }}</td>
                    <td>{{ member.memberEmail }}</td>
                    <td>{{ member.memberAddr }}</td>
                </tr>
                <tr v-if="!memberList.length">
                    <td colspan="100%">No Data</td>
                </tr>
            </template>
        </Table>

        <div class="common-btn-area">
            <q-btn @click="openModifyModal" :disable="selectedMemberList.length !== 1" label="선택수정" color="secondary" unelevated />
            <q-btn @click="handleDeleteMember" :disable="!selectedMemberList.length" label="선택삭제" color="negative" unelevated />
            <q-btn @click="handleBlockMember" :disable="!selectedMemberList.length" label="선택차단" color="negative" unelevated />
        </div>

        <Loading v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import memberService from '@/services/member.service';
import Table from '@/components/layout/Table.vue';
import Loading from '@/components/Loading.vue';
import { ConfirmMessage, ToastMessage } from '@/helper';

const isLoading = ref<boolean>(false);
const searchModel = ref({
    searchBy: 1,
    searchText: '',
});
const searchByOptions = reactive([
    { label: '이름', value: '' },
    { label: '성별', value: '' },
    { label: '성향', value: '' },
    { label: 'E-Mail', value: '' },
    { label: '휴대폰번호', value: '' },
    { label: '가입일시', value: '' },
]);
const memberList = ref([]);
const allSelect = ref<boolean>(false);
const selectedMemberList = computed(() => {
    return memberList.value.filter((x) => x.isSelected);
});
const isModifyModal = ref<boolean>(false);

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
