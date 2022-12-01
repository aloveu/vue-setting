<template>
    <div class="header">
        <h1 class="heading-title">
            <span class="logo"><img src="@/assets/img/logo.png" alt="logo" /></span>
            <em class="admin-title"> Admin {{ env }}</em>
        </h1>

        <div class="header-admin" v-if="authStore.isLogin">
            <button class="admin-name" @click="toggleUserMenu" aria-haspopup="true" aria-controls="overlay_menu">
                {{ authStore.userInfo.name }}
                <i class="pi pi-angle-down"></i>
            </button>
            <Menu ref="menu" :model="userMenuItems" :popup="true" :style="{ top: '62px' }"></Menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from 'primevue/menu';
import { useAuthStore } from '@/store/auth';
import { router } from '@/router';

const env = process.env.NODE_ENV;
const authStore = useAuthStore();
const menu = ref();

const userMenuItems = [
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: async () => {
            await authStore.signOut();
            router.push('/');
        },
    },
    {
        label: 'Change Password',
        icon: 'pi pi-unlock',
        command: () => {
            console.log('비번변경');
        },
    },
];

function toggleUserMenu(event) {
    menu.value.toggle(event);
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: #bc0100;
    padding: 5px 0;
    color: #fff;
    left: 0;
    top: 0;
    z-index: 100;
    .heading-title {
        padding-left: 10px;
        font-size: 1.8em;
        .logo {
            display: inline-flex;
            align-items: center;
            padding-right: 10px;
            vertical-align: middle;
            img {
                height: 40px;
            }
        }
        .admin-title {
            padding-left: 10px;
            border-left: 1px solid rgba(#fff, 0.3);
            vertical-align: middle;
            font-size: 0.85em;
            font-family: 'RobotoBlack', sans-serif;
            > strong {
                font-family: 'RobotoBlack', sans-serif;
            }
        }
    }
    .header-admin {
        padding-right: 15px;
        .admin-name {
            display: block;
            cursor: pointer;
            padding: 10px;
        }
        .pi {
            vertical-align: middle;
        }
        .button-menu {
            display: none;
        }
    }
}
</style>
