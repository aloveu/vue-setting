<template>
    <div>
        <Header />
        <article class="contents">
            <template v-if="authStore.isLogin">
                <Navbar />
                <div class="content-container">
                    <BreadCrumb />
                    <section class="content">
                        <router-view />
                        <Footer />
                    </section>
                </div>
            </template>
            <router-view v-else />
        </article>

        <Toast />
    </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import BreadCrumb from '@/components/layout/BreadCrumb.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
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
        .content {
            border-radius: 10px;
            background-color: #f6f8f9;
        }
    }
}
</style>
