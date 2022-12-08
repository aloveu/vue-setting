<template>
    <q-input filled :model-value="displayDate" placeholder="Any Request Date" outlined class="range-calendar">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" />
        </template>
        <q-popup-proxy :breakpoint="474" cover transition-duration="0">
            <div class="calendar-panel">
                <ul class="range-date-select-list">
                    <li v-for="(options, i) in requestDateOptionList" :key="i" class="date-option">
                        <button :class="{ active: options.isActive }" @click="onSelectDateOption(options.value)" type="button" class="btn-date-option">
                            {{ options.label }}
                        </button>
                    </li>
                </ul>
                <q-date ref="currentMonth" v-model="date" minimal flat range :mask="dateFormat" />
                <q-date ref="nextMonth" v-model="date" minimal flat range :mask="dateFormat" />
            </div>
        </q-popup-proxy>
    </q-input>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, computed } from 'vue';
import { DTO } from '@/models';
import dayjs from 'dayjs';

const props = defineProps<{
    date: { from: string; to: string };
    selectedDateOption?: DTO.Enums.DateSearchOptions;
}>();
const emit = defineEmits(['update:date', 'update:selectedDateOption']);

const dateFormat = 'YYYY-MM-DD[T]HH:mm:ss[Z]';
const currentMonth = ref();
const nextMonth = ref();
const date = ref({ from: null, to: null });
const requestDateOptionList = Object.keys(DTO.Enums.DateSearchOptions)
    .filter((d) => DTO.Enums.DateSearchOptions[d] !== DTO.Enums.DateSearchOptions.Before24Hours)
    .map((item) => ({ isActive: false, value: DTO.Enums.DateSearchOptions[item], label: DTO.Enums.DateSearchOptions[item] }));

onMounted(() => {
    onSelectDateOption(props.selectedDateOption);
});

// 시작 날짜
const startDate = computed(() => {
    return date.value?.from || null;
});

// 종료 날짜
const endDate = computed(() => {
    return date.value?.to || null;
});

// input 표기 날짜
const displayDate = computed(() => {
    onSelectDate();
    return startDate.value || endDate.value ? `${startDate.value} ~ ${endDate.value}` : null;
});

// 선택 완료때 emit
function onSelectDate() {
    const returnDate = { from: startDate.value, to: endDate.value };

    console.log('input', returnDate);
    emit('update:date', returnDate);
}

function onSelectDateOption(activeDateOption: DTO.Enums.DateSearchOptions) {
    if (!activeDateOption) {
        return;
    }

    requestDateOptionList.map((item) => {
        item.isActive = activeDateOption === item.value;
        return item;
    });

    emit('update:selectedDateOption', activeDateOption);

    switch (activeDateOption) {
        case DTO.Enums.DateSearchOptions.AnyDate:
            setAnyDateControl();
            break;
        case DTO.Enums.DateSearchOptions.Today:
            setTodayDateControl();
            break;
        case DTO.Enums.DateSearchOptions.Yesterday:
            setYesterdayDateControl();
            break;
        case DTO.Enums.DateSearchOptions.ThisWeek:
            setThisWeekDateControl();
            break;
        case DTO.Enums.DateSearchOptions.LastWeek:
            setLastWeekDateControl();
            break;
        case DTO.Enums.DateSearchOptions.ThisMonth:
            setThisMonthDateControl();
            break;
        case DTO.Enums.DateSearchOptions.LastMonth:
            setLastMonthDateControl();
            break;
        case DTO.Enums.DateSearchOptions.Before24Hours:
            setBefore24HoursDateControl();
            break;
        default:
            setTodayDateControl();
            break;
    }
    moveCalendar();
}

function setAnyDateControl() {
    date.value = { from: null, to: null };
}

function setTodayDateControl() {
    console.log(dayjs().endOf('days').format(dateFormat));
    date.value = { from: dayjs().startOf('days').format(dateFormat), to: dayjs().endOf('days').format(dateFormat) };
}

function setYesterdayDateControl() {
    date.value = { from: dayjs().add(-1, 'days').startOf('days').format(dateFormat), to: dayjs().add(-1, 'days').endOf('days').format(dateFormat) };
}

function setThisWeekDateControl() {
    date.value = { from: dayjs().startOf('isoWeek').format(dateFormat), to: dayjs().endOf('days').format(dateFormat) };
}

function setLastWeekDateControl() {
    date.value = { from: dayjs().subtract(1, 'weeks').startOf('isoWeek').format(dateFormat), to: dayjs().subtract(1, 'weeks').endOf('isoWeek').format(dateFormat) };
}

function setThisMonthDateControl() {
    date.value = { from: dayjs().startOf('month').format(dateFormat), to: dayjs().endOf('days').format(dateFormat) };
}

function setLastMonthDateControl() {
    date.value = { from: dayjs().subtract(1, 'months').startOf('months').format(dateFormat), to: dayjs().subtract(1, 'months').endOf('months').format(dateFormat) };
}

function setBefore24HoursDateControl() {
    date.value = { from: dayjs().add(-24, 'hours').format(dateFormat), to: dayjs().format(dateFormat) };
}

function moveCalendar() {
    console.log();
}
</script>

<style scoped lang="scss">
.calendar-panel {
    display: flex;

    .range-date-select-list {
        padding: 16px;
        > .date-option {
            > .btn-date-option {
                width: 100%;
                border-radius: 4px;
                padding: 10px 20px;
                color: #484848;
                text-align: left;

                &:hover:not(.active) {
                    background-color: #f5f5f5;
                }

                &.active {
                    background-color: #bc0000;
                    color: #fff;
                }
            }
        }
    }
}
.range-calendar {
    display: inline-flex;
    width: 100%;
    .p-button {
        border-color: #ced4da;
        border-left: 0 none;
        background-color: #f5f5f5;
        color: #484848;
        &:enabled:hover {
            background-color: #eee;
        }
    }
    .p-datepicker-multiple-month {
        padding-left: 200px;
    }
}
:deep {
    .q-date__actions {
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>
