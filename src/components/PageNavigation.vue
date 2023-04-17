<template>
    <div class="page-navigation">
        <q-select
            @update:model-value="onListCountChanged"
            :modelValue="props.pageOptions.pageSize"
            :loading="props.isListLoading"
            :options="pageCountList"
            outlined
            emit-value
            map-options
            class="paging-select-dropdown"
        />

        <div class="paging-wrap">
            <span v-if="props.pageOptions.totalCount" class="paging-status">
                <strong class="current">{{ getFirstRange }} - {{ getLastRange }}</strong>
                <em class="total"> of {{ props.pageOptions.totalCount }}</em>
            </span>

            <span class="p-buttonset">
                <button @click="getList(1)" :disabled="props.isListLoading || 1 === props.pageOptions.currentPage" type="button" class="btn-paging">
                    <q-icon name="keyboard_double_arrow_left" />
                </button>
                <button :disabled="props.isListLoading || 1 === props.pageOptions.currentPage" @click="getList(props.pageOptions.currentPage - 1)" type="button" class="btn-paging">
                    <q-icon name="keyboard_arrow_left" />
                </button>

                <em class="btn-paging current-page">
                    {{ props.pageOptions.currentPage }}

                    <q-menu v-model="isShowInputPanel" self="top middle">
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
                    </q-menu>
                </em>
                <button @click="getList(props.pageOptions.currentPage + 1)" :disabled="props.isListLoading || !hasMoreList" type="button" class="btn-paging">
                    <q-icon name="keyboard_arrow_right" size="24px" />
                </button>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DTO } from '@/models';
import { onUpdated, ref, defineProps, defineEmits, computed } from 'vue';

// props 정의
const props = defineProps<{
    pageOptions: DTO.Common.PageOptions;
    isListLoading: boolean;
}>();

// input 페이징 패널 호출
const isShowInputPanel = ref<boolean>(false);

// emit 정의
const emit = defineEmits(['listChange']);
const pageSize = ref<number>(10);
const hasMoreList = ref<boolean>(false);
const pageInput = ref<number>(null);
const pageCountList: DTO.Common.DropDownListItem[] = [
    { label: '10 Rows', value: 10 },
    { label: '30 Rows', value: 30 },
    { label: '50 Rows', value: 50 },
    { label: '100 Rows', value: 100 },
];

const getFirstRange = computed((): number => {
    return props.pageOptions.currentPage * props.pageOptions.pageSize - props.pageOptions.pageSize + 1;
});

const getLastRange = computed((): number => {
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
function onListCountChanged(size) {
    const pageOptions = {
        ...props.pageOptions,
        pageSize: size,
        currentPage: 1,
    } as DTO.Common.PageOptions;
    emit('listChange', pageOptions);
}

// 부모 list 호출
function getList(page: number) {
    const pageOptions = {
        ...props.pageOptions,
        currentPage: page,
    } as DTO.Common.PageOptions;
    emit('listChange', pageOptions);
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
    isShowInputPanel.value = false;
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
        min-width: 183px;
        margin-right: 10px;
        cursor: pointer;
        user-select: none;
        :deep {
            .q-field__native,
            .q-field__control,
            .q-field__marginal {
                height: 40px;
                min-height: 40px;
            }
        }
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
                min-width: 2.5rem;
                color: #4e5056;
                background-color: #fff;
                border: 1px solid #ced4da;
                margin-left: -1px;
                &.current-page {
                    position: relative;
                    width: 40px;
                    padding: 0.5rem;
                    border-radius: 0;
                    text-align: center;
                }
                &:first-child {
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
                &:last-child {
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
                > .material-icons {
                    font-size: 24px;
                }
            }
        }
    }
}

.page-input-overlay {
    display: flex;
    flex-direction: column;
    padding: 10px;
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
        border-radius: 3px;
        color: #fff;
        background-color: $primary;
    }
}
</style>
