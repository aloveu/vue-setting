<template>
    <div class="header">
        <h1 class="heading-title">
            <q-btn to="/main" flat round dense icon="sym_o_home" class="q-mr-sm" size="20px" />
            <em class="admin-title"> {{ headerTitle }} </em>
        </h1>

        <div class="header-admin" v-if="authStore.isLogin">
            <div class="admin-name">
                {{ authStore.userInfo.firstName }} {{ authStore.userInfo.lastName }} <i class="material-icons">expand_more</i>
                <q-menu class="util-menu" transition-show="jump-down" transition-hide="jump-up" style="width: 200px">
                    <button @click="handleLogout">
                        <i class="material-icons">logout</i>
                        <span>Logout</span>
                    </button>
                </q-menu>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth.store';
import { computed, ref } from 'vue';

const env = process.env.NODE_ENV;
const authStore = useAuthStore();
const dateTime = ref<string>('');

const headerTitle = computed(() => {
    return `Login`;
});

async function handleLogout() {
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
    height: $header-height;
    background-color: $primary;
    padding: 5px 0;
    color: #fff;
    left: 0;
    top: 0;
    z-index: 100;
    .heading-title {
        padding-left: 10px;
        font-size: 1.8em;
        font-weight: 700;
        line-height: 1;
        :deep {
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 1;
            }
        }
        .admin-title {
            padding-left: 10px;
            vertical-align: middle;
            font-size: 26px;
        }
    }
    .header-admin {
        display: flex;
        align-items: center;
        padding-right: 15px;
        font-size: 16px;
        .admin-name {
            display: block;
            cursor: pointer;
            padding: 10px;
            font-weight: bold;
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
