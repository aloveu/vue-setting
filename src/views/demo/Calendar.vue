<template>
    <h2 class="title">Calendar</h2>
    <div class="content">
        <h3>Multiple calendar</h3>
        <p>
            <MultipleCalendar v-model:date="date" v-model:selectedDateOption="selectedDateOption" />
            <br />
            선택된 날짜 : {{ date[0] }} ~ {{ date[1] }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DTO } from '@/models';
import MultipleCalendar from '@/components/MultipleCalendar.vue';

const date = ref([null, null]);
const selectedDateOption = ref(DTO.Enums.DateSearchOptions.ThisMonth);
</script>

<style scoped lang="scss"></style>
