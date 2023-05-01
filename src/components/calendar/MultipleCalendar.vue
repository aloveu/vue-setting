<!--
 props.date 는 UTC+0 기준, timezone이랑 같이 왔을때 display만 해당 timezone으로 보이고
 emit은 UTC+0 기준이 됨.
 return {from : 'YYYY-MM-DD[T]HH:mm:ss[Z]', to: 'YYYY-MM-DD[T]HH:mm:ss[Z]'}
 -->
<template>
    <Datepicker
        v-model="date"
        @closed="onSelectDate"
        auto-apply
        :multi-static="false"
        range
        multi-calendars
        :enable-time-picker="false"
        enable-seconds
        :offset="0"
        :readonly="props.isDisabled || props.readonly"
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
        <template #clear-icon></template>
    </Datepicker>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch, withDefaults } from 'vue';
import { DTO } from '@/models';
import dayjs from 'dayjs';

const props = withDefaults(
    defineProps<{
        date?: DTO.Common.RangeDate;
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
const emit = defineEmits(['update:date']);
const date = ref();
const selectedRangeLabel = ref<string>('Custom range');

onMounted(() => {
    date.value = [dayjs.utc(props.date.from).format(), dayjs.utc(props.date.to).format()];
});
// input 표기 날짜
const displayDate = (): string => {
    const dateFrom = date.value && date.value[0] ? `${dayjs.utc(date.value[0]).format('YYYY-MM-DD')} ~` : '';
    const dateTo = date.value && date.value[1] ? `${dayjs.utc(date.value[1]).format('YYYY-MM-DD')}` : '';
    return `${dateFrom} ${dateTo}`;
};

// 선택 완료때 emit
function onSelectDate() {
    emit('update:date', {
        from: date.value && date.value[0] ? dayjs.utc(date.value[0]).format('YYYY-MM-DD') : null,
        to: date.value && date.value[1] ? dayjs.utc(date.value[1]).format('YYYY-MM-DD') : null,
    } as DTO.Common.RangeDate);
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
