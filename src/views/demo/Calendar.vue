<template>
    <h2 class="title">Calendar</h2>
    <div class="content">
        <p><a href="https://quasar.dev/vue-components/date" target="_blank" class="link">https://quasar.dev/vue-components/date</a></p>
        <h3>Multiple calendar</h3>
        <p>
            <MultipleCalendar v-model:date="date" v-model:selectedDateOption="selectedDateOption" style="max-width: 400px" />
            <br />
            선택된 날짜 : {{ displayDate }}
        </p>
        <h3>single calendar</h3>
        <h3>single calendar + time</h3>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { DTO } from '@/models';
import MultipleCalendar from '@/components/MultipleCalendar.vue';

const date = ref({ from: null, to: null });
const selectedDateOption = ref(DTO.Enums.DateSearchOptions.AnyDate);

// input 표기 날짜
const displayDate = computed(() => {
    return date.value.from || date.value.to ? `${date.value.from} ~ ${date.value.to}` : null;
});
</script>

<style scoped lang="scss">
h3 {
    font-size: 16px;
    font-weight: 700;
}
</style>
