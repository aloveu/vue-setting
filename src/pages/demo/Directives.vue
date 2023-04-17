<template>
    <h2 class="title">Directives</h2>
    <ul class="content">
        <li>
            <label for="digitOnly">Digit Only</label>
            <input id="digitOnly" type="number" v-digit-only />
        </li>
        <li>
            <label for="focus">Focus</label>
            <input id="focus" type="test" v-focus />
        </li>
    </ul>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
li {
    margin-bottom: 5px;
}
</style>
