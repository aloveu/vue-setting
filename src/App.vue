<template>
    <Header />
    <article class="contents">
        <template v-if="authStore.isLogin">
            <Navbar />
            <div class="content-container">
                <BreadCrumb />
                <router-view />
                <Footer />
            </div>
        </template>
        <router-view v-else />
    </article>

    <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import BreadCrumb from '@/components/layout/BreadCrumb.vue';
import { useAuthStore } from '@/store/auth';
import test from '@/services/grpc.service';

const authStore = useAuthStore();

test();
</script>

<style scoped lang="scss">
.contents {
    padding-top: 80px;
    .content-container {
        position: relative;
        float: right;
        width: calc(100% - 200px);
        height: 100%;
        padding: 30px;
    }
}
</style>
