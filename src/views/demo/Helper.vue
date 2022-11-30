<template>
    <h2 class="title">Util( Helper, Date..)</h2>
    <div class="content">
        <h3>Number</h3>
        <p>Ceil to ( {{ testNumber[0] }} ) : {{ ceil }}</p>
        <p>Floor to ( {{ testNumber[1] }} ) : {{ floor }}</p>
        <p>Round to ( {{ testNumber[2] }} ) : {{ round }}</p>

        <h3>Date</h3>
        <p>UTC dayjs : {{ utc }}</p>
        <p>UTC filter : {{ $filters.dt(dayjs(), 'YYYY-MM-DD HH:mm:ss') }}</p>

        <h3>User Permission</h3>
        <p>내 현재 권한 : {{ Helper.Permission.getAdminType() }}</p>
        <h4>접근가능한 권한 범위</h4>
        <ul>
            <li>Normal : {{ Helper.Permission.canAccess(DTO.Enums.AccountGroup.Normal) }}</li>
            <li>Floorman : {{ Helper.Permission.canAccess(DTO.Enums.AccountGroup.Floorman) }}</li>
            <li>Administrators : {{ Helper.Permission.canAccess(DTO.Enums.AccountGroup.Administrators) }}</li>
            <li>Master : {{ Helper.Permission.canAccess(DTO.Enums.AccountGroup.Master) }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { DTO } from '@/models';
import { Helper } from '@/helper';
import dayjs from 'dayjs';

const testNumber = [3.51, 3.59, 3.55];

const ceil = Helper.Number.ceilTo(testNumber[0], 1);
const floor = Helper.Number.floorTo(testNumber[1], 1);
const round = Helper.Number.roundTo(testNumber[2], 1);

const utc = dayjs().utc().format('YYYY-MM-DD HH:mm:ss');
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
