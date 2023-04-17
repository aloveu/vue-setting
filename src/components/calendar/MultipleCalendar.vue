<!--
 props.date 는 UTC+0 기준, timezone이랑 같이 왔을때 display만 해당 timezone으로 보이고
 emit은 UTC+0 기준이 됨.
 return {from : 'YYYY-MM-DD[T]HH:mm:ss[Z]', to: 'YYYY-MM-DD[T]HH:mm:ss[Z]'}
 -->
<template>
    <Datepicker
        v-model="date"
        @update:model-value="changeDefaultLabel"
        @closed="onSelectDate"
        auto-apply
        :multi-static="false"
        range
        multi-calendars
        :enable-time-picker="!isDisableTime"
        enable-seconds
        :offset="0"
        :readonly="props.isDisabled || props.readonly"
        :timezone="props.timezone"
        :preset-ranges="props.isPresetRangeOptions ? presetRanges : []"
        class="multiple-calendar"
    >
        <template #dp-input="{ value }">
            <q-input :value="value" :readonly="props.readonly" :disable="props.isDisabled" :model-value="displayDate()" placeholder="Any Request Date" outlined dense class="range-calendar">
                <template v-slot:append>
                    <q-icon name="sym_o_calendar_month" />
                </template>
                <template v-if="props.isPresetRangeOptions" v-slot:after>
                    <q-btn :label="selectedRangeLabel" unelevated no-caps color="gray-4" class="label-date-option" icon-right="expand_more" />
                </template>
            </q-input>
        </template>
        <template #rangeList="{ label, range, presetDateRange }">
            <q-item
                clickable
                @click="
                    presetDateRange(range);
                    onSelectDateOption(label);
                "
                class="btn-date-option"
                dense
                active-class="active"
                :active="selectedRangeLabel === label"
            >
                <q-item-section>{{ label }}</q-item-section>
            </q-item>
        </template>
        <template #clear-icon></template>
    </Datepicker>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch, withDefaults } from 'vue';
import { DTO } from '@/models';
import dayjs from 'dayjs';
import { UTCDate } from '@/helper';
import { startOfDay, addMonths, endOfDay, endOfMonth, startOfMonth, subMonths, addDays } from 'date-fns';

const props = withDefaults(
    defineProps<{
        date?: DTO.Common.RangeDate;
        selectedDateOption?: DTO.Enums.DateSearchOptions;
        isPresetRangeOptions?: boolean;
        isDisableTime?: boolean;
        isDisabled?: boolean;
        timezone?: string;
        readonly?: boolean;
    }>(),
    {
        timezone: 'UTC',
    }
);
const emit = defineEmits(['update:date', 'update:selectedDateOption']);
const date = ref();
const selectedRangeLabel = ref<string>('Custom range');
const presetRanges = ref<DTO.Common.PresetRange[]>([
    { label: 'Next Month', range: [startOfMonth(addMonths(new Date(), 1)), endOfMonth(addMonths(new Date(), 1))], slot: 'rangeList' },
    { label: 'This Month', range: [startOfMonth(new Date()), endOfMonth(new Date())], slot: 'rangeList' },
    { label: 'Last Month', range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))], slot: 'rangeList' },
    { label: 'Next 30 Days', range: [startOfDay(new Date()), endOfDay(addDays(new Date(), 30))], slot: 'rangeList' },
    { label: 'Last 30 Days', range: [startOfDay(addDays(new Date(), -30)), endOfDay(new Date())], slot: 'rangeList' },
    { label: 'Next 90 Days', range: [startOfDay(new Date()), endOfDay(addDays(new Date(), 90))], slot: 'rangeList' },
    { label: 'Last 90 Days', range: [startOfDay(addDays(new Date(), -90)), endOfDay(new Date())], slot: 'rangeList' },
    // custom range는 그냥 날짜 선택
]);

watch(
    () => props.date,
    (d) => {
        setRangeDate(d);
    }
);

onMounted(() => {
    changeDefaultLabel();
    setRangeDate(props.date);
});

// input 표기 날짜
const displayDate = (): string => {
    let dateFrom = date.value && date.value[0] ? `${UTCDate.getDisplayTime(date.value[0], props.timezone, 'MM/DD/YYYY HH:mm:ss')}(UTC${UTCDate.getUtcOffset(date.value[0], props.timezone)}) ~` : '';
    let dateTo = date.value && date.value[1] ? `${UTCDate.getDisplayTime(date.value[1], props.timezone, 'MM/DD/YYYY HH:mm:ss')}(UTC${UTCDate.getUtcOffset(date.value[1], props.timezone)})` : '';
    if (props?.isDisableTime) {
        dateFrom = date.value && date.value[0] ? `${UTCDate.getDisplayTime(date.value[0], props.timezone, 'MM/DD/YYYY')} ~` : '';
        dateTo = date.value && date.value[1] ? `${UTCDate.getDisplayTime(date.value[1], props.timezone, 'MM/DD/YYYY')}` : '';
    }
    return `${dateFrom} ${dateTo}`;
};

// 선택 완료때 emit
function onSelectDate() {
    emit('update:date', {
        from: date.value && date.value[0] ? dayjs.utc(date.value[0]).format('YYYY-MM-DD[T]HH:mm:ss[Z]') : null,
        to: date.value && date.value[1] ? dayjs.utc(date.value[1]).format('YYYY-MM-DD[T]HH:mm:ss[Z]') : null,
    } as DTO.Common.RangeDate);
}

function setRangeDate(range: DTO.Common.RangeDate = null) {
    if (range?.from && range?.to) {
        date.value = [dayjs.utc(range.from).tz(props.timezone).format(), dayjs.utc(range.to).tz(props.timezone).format()];
    } else if (props.selectedDateOption) {
        selectedRangeLabel.value = props.selectedDateOption;

        const selectedPresetRange = presetRanges.value.filter((x) => x.label === props.selectedDateOption)[0];

        date.value = [
            dayjs
                .utc(dayjs(selectedPresetRange.range[0]).format('YYYY-MM-DD'))
                .add(dayjs.utc(selectedPresetRange.range[0]).tz(props.timezone).utcOffset() * -1, 'minutes')
                .format(),
            dayjs
                .utc(dayjs(selectedPresetRange.range[1]).format('YYYY-MM-DD'))
                .endOf('days')
                .add(dayjs.utc(selectedPresetRange.range[1]).tz(props.timezone).utcOffset() * -1, 'minutes')
                .format(),
        ];

        onSelectDate();
    }
}

function onSelectDateOption(activeDateOption: DTO.Enums.DateSearchOptions) {
    selectedRangeLabel.value = activeDateOption;
    emit('update:selectedDateOption', activeDateOption);
}

function changeDefaultLabel() {
    selectedRangeLabel.value = 'Custom range';
}
</script>

<style scoped lang="scss">
.multiple-calendar {
    :deep {
        .q-field__after {
            padding-left: 0;
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
    .label-date-option {
        margin-left: -4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
<style lang="scss">
.btn-date-option {
    font-size: 14px;
    &:hover:not(.active) {
        background-color: #f5f5f5;
    }
    &.active {
        background-color: $primary;
        color: #fff;
    }
}
.dp__range_end,
.dp__range_start,
.dp__active_date {
    background-color: $primary;
}
.dp__today {
    border-color: $primary;
}
.dp__preset_ranges {
    .dp__preset_range {
        padding: 0;
        white-space: nowrap;
    }
}
</style>
