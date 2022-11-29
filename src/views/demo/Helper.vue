<template>
    <h2 class="title">Helper</h2>
    <div class="content">
        <h3>Number</h3>
        <p>Ceil to ( {{ testNumber[0] }} ) : {{ ceil }}</p>
        <p>Floor to ( {{ testNumber[1] }} ) : {{ floor }}</p>
        <p>Round to ( {{ testNumber[2] }} ) : {{ round }}</p>
    </div>
</template>

<script setup lang="ts">
import { Helper } from '@/helper';

const testNumber = [3.51, 3.59, 3.55];

const ceil = Helper.Number.ceilTo(testNumber[0], 1);
const floor = Helper.Number.floorTo(testNumber[1], 1);
const round = Helper.Number.roundTo(testNumber[2], 1);
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
