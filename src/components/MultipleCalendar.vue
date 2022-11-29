<template>
    <Calendar
        v-model="date"
        @date-select="onSelectDate"
        :numberOfMonths="2"
        :manualInput="false"
        showIcon
        aria-autocomplete="none"
        selectionMode="range"
        placeholder="Any Request Date"
        class="range-calendar"
        panelClass="range-calendar-panel"
    >
        <template #footer>
            <ul class="range-date-select-list">
                <li v-for="(options, i) in requestDateOptionList" :key="i" class="date-option">
                    <button :class="{ active: options.isActive }" @click="onSelectDateOption(options.value)" type="button" class="btn-date-option">
                        {{ options.label }}
                    </button>
                </li>
            </ul>
        </template>
    </Calendar>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { DTO } from '@/models';
import Calendar from 'primevue/calendar';
import dayjs from 'dayjs';

const props = defineProps<{
    date: [];
    selectedDateOption?: DTO.Enums.DateSearchOptions;
}>();
const emit = defineEmits(['update:date', 'update:selectedDateOption']);

const date = ref();
const requestDateOptionList = Object.keys(DTO.Enums.DateSearchOptions)
    .filter((d) => DTO.Enums.DateSearchOptions[d] !== DTO.Enums.DateSearchOptions.Before24Hours)
    .map((item) => ({ isActive: false, value: DTO.Enums.DateSearchOptions[item], label: DTO.Enums.DateSearchOptions[item] }));

onMounted(() => {
    onSelectDateOption(props.selectedDateOption);
});

function onSelectDate() {
    const returnDate = [dayjs(date.value[0]).startOf('day').format('YYYY-MM-DD[T]HH:mm:ss[Z]'), dayjs(date.value[1]).endOf('day').format('YYYY-MM-DD[T]HH:mm:ss[Z]')];

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
    onSelectDate();
}

function setAnyDateControl() {
    date.value = [null, null];
}

function setTodayDateControl() {
    date.value = [new Date(dayjs().startOf('days').format()), new Date(dayjs().endOf('days').format())];
}

function setYesterdayDateControl() {
    date.value = [new Date(dayjs().add(-1, 'days').startOf('days').format()), new Date(dayjs().add(-1, 'days').endOf('days').format())];
}

function setThisWeekDateControl() {
    date.value = [new Date(dayjs().startOf('isoWeek').format()), new Date(dayjs().endOf('days').format())];
}

function setLastWeekDateControl() {
    date.value = [new Date(dayjs().subtract(1, 'weeks').startOf('isoWeek').format()), new Date(dayjs().subtract(1, 'weeks').endOf('isoWeek').format())];
}

function setThisMonthDateControl() {
    date.value = [new Date(dayjs().startOf('month').format()), new Date(dayjs().endOf('days').format())];
}

function setLastMonthDateControl() {
    date.value = [new Date(dayjs().subtract(1, 'months').startOf('months').format()), new Date(dayjs().subtract(1, 'months').endOf('months').format())];
}

function setBefore24HoursDateControl() {
    date.value = [new Date(dayjs().add(-24, 'hours').format()), new Date(dayjs().format())];
}
</script>

<style lang="scss">
.range-calendar {
    display: inline-flex;
    width: 100%;
    max-width: 300px;
    :deep {
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
}
.range-calendar-panel {
    display: flex;
    flex-direction: row-reverse;
    .range-date-select-list {
        padding: 20px;

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
</style>
