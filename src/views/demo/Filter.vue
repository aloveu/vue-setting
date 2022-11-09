<template>
    <h2 class="title">필터 ( = Angular pipe)</h2>
    <div class="content">
        <p>vue2에서는 '<strong>1000 | currency</strong>' 처럼 허용됐으나 vue3에서는 삭제됨.</p>

        <h3>Currency</h3>
        <p>{{ $filters.currency(test) }}</p>
        <p>{{ $filters.currency(test, DTO.Enums.Currency.CNY) }}</p>

        <h3>Currency Symbol</h3>
        <p>{{ $filters.currencySymbol(DTO.Enums.Currency.CNY) }}</p>
        <p>{{ $filters.currencySymbol(DTO.Enums.Currency.AUD) }}</p>
        <p>{{ $filters.currencySymbol(DTO.Enums.Currency.CAD) }}</p>
        <p>{{ $filters.currencySymbol(DTO.Enums.Currency.EUR) }}</p>
        <p>{{ $filters.currencySymbol(DTO.Enums.Currency.RUB) }}</p>

        <h3>Date time</h3>
        <p>ldt : {{ $filters.ldt(date) }}</p>
        <p>ldt : {{ $filters.ldt(date, 'YYYY-MM-DD HH:mm:ss') }}</p>
        <p>dt : {{ $filters.dt(date) }}</p>
        <p>dt : {{ $filters.dt(date, 'YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
</template>

<script setup lang="ts">
import { DTO } from '@/models';

const test = 1023213.128123;
const date = '2022-11-08T11:08:25.6635296';
</script>

<style scoped lang="scss">
h3 {
    margin: 8px 0;
    font-weight: 700;
}
p {
    margin: 4px 0;
}
</style>
