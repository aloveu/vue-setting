<template>
    <div>
        dash board
        <div class="card">
            <h5>Basic</h5>
            <LineChart :chartData="basicData" :options="basicOptions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const basicData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: 0.4,
        },
    ],
});

const basicOptions = ref({
    plugins: {
        legend: {
            labels: {
                color: '#495057',
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#495057',
            },
            grid: {
                color: '#ebedef',
            },
        },
        y: {
            ticks: {
                color: '#495057',
            },
            grid: {
                color: '#ebedef',
            },
        },
    },
});
</script>

<style scoped lang="scss"></style>
