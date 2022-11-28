<template>
    <div class="page-navigation">
        <Dropdown
            v-model="pageSize"
            :disabled="props.isListLoading"
            :options="pageCountList"
            @change="onListCountChanged($event)"
            optionLabel="label"
            optionValue="value"
            class="paging-select-dropdown"
        />

        <div class="paging-wrap">
            <span v-if="props.pageOptions.totalCount" class="paging-status">
                <strong class="current">{{ getFirstRange }} - {{ getLastRange }}</strong>
                <em class="total"> of {{ props.pageOptions.totalCount }}</em>
            </span>

            <span class="p-buttonset">
                <Button @click="getList(1)" :disabled="props.isListLoading || 1 === props.pageOptions.currentPage" type="button" class="btn-paging" icon="pi pi-angle-double-left"></Button>
                <Button
                    :disabled="props.isListLoading || 1 === props.pageOptions.currentPage"
                    @click="getList(props.pageOptions.currentPage - 1)"
                    type="button"
                    class="btn-paging"
                    icon="pi pi-angle-left"
                ></Button>

                <em @click="showPageInputModal" class="btn-paging current-page">
                    {{ props.pageOptions.currentPage }}

                    <OverlayPanel ref="op" my="center top" at="right center" appendTo="body">
                        <div class="page-input-overlay">
                            <input
                                v-model="pageInput"
                                @keyup.enter="handlerPaging($event)"
                                type="number"
                                pattern="[0-9]*"
                                v-digitOnly
                                v-focus
                                class="page-input"
                                autocomplete="off"
                                placeholder="Page Number"
                            />
                            <button @click="handlerPaging($event)" type="button" class="btn-go">Go</button>
                        </div>
                    </OverlayPanel>
                </em>
                <Button @click="getList(props.pageOptions.currentPage + 1)" :disabled="props.isListLoading || !hasMoreList" type="button" class="btn-paging" icon="pi pi-angle-right"></Button>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import OverlayPanel from 'primevue/overlaypanel';
import { DTO } from '@/models';
import { onUpdated, ref, defineProps, defineEmits, computed } from 'vue';

// props 정의
const props = defineProps<{
    pageOptions: DTO.Common.PageOptions;
    isListLoading: boolean;
}>();

// emit 정의
const emit = defineEmits(['listChange']);

const pageSize = ref(10);
const hasMoreList = ref(false);
const pageInput = ref(null);
const pageCountList = [
    { label: '10 Rows', value: 10 },
    { label: '30 Rows', value: 30 },
    { label: '50 Rows', value: 50 },
    { label: '100 Rows', value: 100 },
];

const getFirstRange = computed(() => {
    return props.pageOptions.currentPage * props.pageOptions.pageSize - props.pageOptions.pageSize + 1;
});

const getLastRange = computed(() => {
    if (props.pageOptions.currentPage * props.pageOptions.pageSize > props.pageOptions.totalCount) {
        return props.pageOptions.totalCount;
    }
    return props.pageOptions.currentPage * props.pageOptions.pageSize;
});

onUpdated(() => {
    pageSize.value = props.pageOptions.pageSize;
    hasMoreList.value = props.pageOptions.currentPage * props.pageOptions.pageSize < props.pageOptions.totalCount;
});

// 노출 length 변경때
function onListCountChanged(e: any) {
    const pageOptions = {
        ...props.pageOptions,
        pageSize: e.value,
        currentPage: 1,
    };

    getList(props.pageOptions.currentPage);
    emit('listChange', pageOptions);
}

// 부모 list 호출
function getList(page: number) {
    const pageOptions = {
        ...props.pageOptions,
        currentPage: page,
    };
    emit('listChange', pageOptions);
}

// input 페이징 패널 호출
const op = ref();
function showPageInputModal(event) {
    op.value.show(event);
}

// input에서 페이지 이동
function handlerPaging($event) {
    $event.stopPropagation();

    const totalPage = Math.ceil(props.pageOptions.totalCount / props.pageOptions.pageSize);
    if (totalPage < pageInput.value) {
        pageInput.value = totalPage;
    }
    if (pageInput.value < 1) {
        pageInput.value = 1;
    }

    getList(Number(pageInput.value));
    pageInput.value = null;
    op.value.hide();
}
</script>

<style scoped lang="scss">
.page-navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .paging-select-dropdown {
        position: relative;
        display: inline-flex;
        margin-right: 10px;
        cursor: pointer;
        user-select: none;
    }
    .paging-wrap {
        display: flex;
        align-items: center;
        .paging-status {
            padding-right: 10px;
            > .current {
                color: #484848;
                font-weight: 700;
            }
            > .total {
                color: #a6adb4;
            }
        }
        .p-buttonset {
            display: flex;
            .btn-paging {
                display: block;
                color: #4e5056;
                background-color: #fff;
                border: 1px solid #ced4da;
                margin-left: -1px;
                &.current-page {
                    position: relative;
                    width: 38px;
                    padding: 0.5rem;
                    text-align: center;
                }
            }
        }
    }
}
.page-input-overlay {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    background-color: #fff;

    .page-input {
        width: 122px;
        height: 41px;
        margin-bottom: 6px;
        border-radius: 3px;
        border: 1px solid #ced4da;
        text-align: center;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .btn-go {
        width: 122px;
        height: 33px;
        border: 0;
        border-radius: 5px;
        color: #fff;
        background-color: #a11111;
    }
}
</style>
