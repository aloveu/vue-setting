<template>
    <div class="progress-spinner-area">
        <ProgressSpinner aria-label="Basic ProgressSpinner" />
    </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>

<style scoped lang="scss">
.progress-spinner-area {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 10;
    &.fixed-loader {
        position: fixed;
    }
    &.dark-area {
        background-color: rgba(0, 0, 0, 0.3);
    }
    &.transparent-area {
        background-color: transparent;
    }
}
</style>
