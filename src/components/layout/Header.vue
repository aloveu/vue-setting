<template>
    <div class="header">
        <h1 class="heading-title">
            <span class="logo"><img src="@/assets/img/logo.png" alt="logo" /></span>
            <em class="admin-title"> Admin ({{ env }})</em>
        </h1>

        <div class="header-admin" v-if="authStore.isLogin">
            <div class="admin-name">
                {{ authStore.userInfo.name }} <i class="material-icons">expand_more</i>
                <q-menu class="util-menu" transition-show="jump-down" transition-hide="jump-up" style="width: 200px">
                    <button @click="handleLogout">
                        <i class="material-icons">logout</i>
                        <span>Logout</span>
                    </button>
                    <button @click="handleChangePassword">
                        <i class="material-icons">lock_open</i>
                        <span>Change Password</span>
                    </button>
                </q-menu>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { router } from '@/router';

const env = process.env.NODE_ENV;
const authStore = useAuthStore();

async function handleLogout() {
    router.push('/');
    await authStore.signOut();
}

async function handleChangePassword() {
    console.log('change password');
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
    }
}
</style>
<style lang="scss">
.util-menu {
    button {
        display: flex;
        gap: 4px;
        align-items: center;
        width: 100%;
        padding: 10px 20px 10px 10px;
        text-align: left;
        &:hover {
            background-color: #efefef;
        }
        i {
            font-size: 20px;
        }
    }
}
</style>
