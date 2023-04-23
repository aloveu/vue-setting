<template>
    <q-layout>
        <Header />
        <article class="container">
            <template v-if="hasContentsLayout">
                <Navbar class="navbar" />
                <div class="content-container">
                    <div class="box">
                        <Title />
                        <router-view />
                    </div>
                    <Footer />
                </div>
            </template>
            <router-view v-else />
        </article>
    </q-layout>
</template>

<script setup lang="ts">
import { watch, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { useRoute } from 'vue-router';

import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Title from '@/components/layout/Title.vue';

const route = useRoute();
const authStore = useAuthStore();
const hasContentsLayout = computed(() => {
    return authStore.isLogin && route.meta.hasContentsLayout;
});

onMounted(async () => {
    if (authStore.isLogin) {
        await initAfterLogin();
    }
});

// 로그인 subscribe
watch(
    () => authStore.isLogin,
    async (n) => {
        if (n) {
            await initAfterLogin();
        }
    }
);

async function initAfterLogin() {
    //
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    min-height: 100vh;
    padding-top: $header-height;
    .navbar {
        flex: 250px 0 0;
        background-color: #000;
    }
    .content-container {
        position: relative;
        flex: 1;
        height: 100%;
        padding: 25px 20px;
        .box {
            border-radius: 10px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
        }
    }
}
</style>
