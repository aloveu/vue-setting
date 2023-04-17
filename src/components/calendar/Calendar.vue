<!--
 props.date 는 UTC+0 기준, timezone이랑 같이 왔을때 display만 해당 timezone으로 보이고
 emit은 UTC+0 기준이 됨.
 -->
<template>
    <Datepicker
        v-model="date"
        :min-date="minDate"
        :max-date="maxDate"
        @closed="onSelectDate"
        auto-apply
        :offset="0"
        :enable-time-picker="props.isTimeSelect"
        enable-seconds
        :year-picker="props.yearPicker"
        :month-picker="props.monthPicker"
        :timezone="props.timezone"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :start-time="startTime"
    >
        <template #dp-input="{ value }">
            <q-input
                :value="value"
                :model-value="displayDate()"
                :readonly="props.readonly"
                :disable="props.disabled"
                outlined
                :error="props.error"
                :error-message="props.errorMessage"
                dense
                :placeholder="props.placeholder || 'Any Request Date'"
                hide-bottom-space
            >
                <template v-slot:append>
                    <q-icon name="sym_o_calendar_month" />
                </template>
            </q-input>
        </template>
        <template #clear-icon></template>
    </Datepicker>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeMount, ref, watch, withDefaults } from 'vue';
import dayjs from 'dayjs';
import { UTCDate } from '@/helper';

const props = withDefaults(
    defineProps<{
        date?: string;
        timezone?: string;
        isTimeSelect?: boolean;
        minDate?: string;
        maxDate?: string;
        yearPicker?: boolean;
        monthPicker?: boolean;
        readonly?: boolean;
        disabled?: boolean;
        placeholder?: string;
        error?: boolean;
        errorMessage?: string;
    }>(),
    {
        timezone: 'UTC',
    }
);
const emit = defineEmits(['update:date']);
const date = ref(null);
const startTime = ref({ hours: 0, minutes: 0, seconds: 0 });

onBeforeMount(() => {
    initDate(props.date);
});

watch(
    () => props.date,
    (d) => {
        initDate(d);
    }
);

function initDate(propsDate = null) {
    if (props.yearPicker) {
        date.value = propsDate;
    } else if (props.monthPicker) {
        const month = dayjs(propsDate);
        date.value = {
            month: parseFloat(month.format('MM')),
            year: parseFloat(month.format('YYYY')),
        };
    } else {
        date.value = propsDate ? dayjs.utc(propsDate).tz(props.timezone).format() : null;
    }
}

// input 표기 날짜
const displayDate = (): string => {
    let returnValue: string = null;

    if (date.value) {
        if (props.yearPicker) {
            returnValue = date.value; // YYYY
        } else if (props.monthPicker) {
            returnValue = dayjs(`${date.value.year}-${date.value.month}`).format('MM/YYYY');
        } else {
            returnValue = `${UTCDate.getDisplayTime(date.value, props.timezone, props.isTimeSelect ? 'MM/DD/YYYY HH:mm:ss' : 'MM/DD/YYYY')} (UTC${UTCDate.getUtcOffset(date.value, props.timezone)})`;
        }
    }

    return returnValue;
};

// 선택 완료때 emit
// utc+0 으로 리턴
function onSelectDate() {
    let emitValue: string;

    if (date.value) {
        if (props.yearPicker) {
            emitValue = date.value; // YYYY
        } else if (props.monthPicker) {
            emitValue = dayjs(`${date.value.year}-${date.value.month}`).format('YYYY-MM');
        } else {
            emitValue = dayjs.utc(date.value).format(props.isTimeSelect ? 'YYYY-MM-DD[T]HH:mm:ss[Z]' : 'YYYY-MM-DD[T]00:00:00[Z]');
        }
    }
    emit('update:date', emitValue);
}
</script>

<style lang="scss" scoped>
.q-field--disabled {
    background: #eee;
}
</style>
