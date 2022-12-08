<template>
    <Header />
    <article class="container">
        <template v-if="authStore.isLogin">
            <Navbar class="navbar" />
            <div class="content-container">
                <BreadCrumb />
                <router-view />
                <Footer />
            </div>
        </template>
        <router-view v-else />
    </article>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import BreadCrumb from '@/components/layout/BreadCrumb.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>

<style scoped lang="scss">
.container {
    display: flex;
    min-height: 100vh;
    padding-top: 80px;
    .navbar {
        width: 200px;
        background-color: #202124;
    }
    .content-container {
        position: relative;
        float: right;
        width: calc(100% - 200px);
        height: 100%;
        padding: 30px;
    }
}
</style>
