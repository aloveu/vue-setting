<template>
    <div class="not-found">
        <h1>4 0 4</h1>
        <p>Page Not Found</p>
        <q-btn to="/" label="Go to main" color="primary" />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    h1 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 100px;
        font-weight: bold;
        color: #000000;
    }
    p {
        font-size: 60px;
    }
    .q-btn {
        min-width: 232px;
    }
}
</style>
