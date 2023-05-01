<template>
    <q-header elevated class="header">
        <q-toolbar>
            <q-btn :to="`${authStore.isLogin ? '/management/members' : '/login'}`" flat round dense icon="sym_o_home" class="q-mr-sm" size="20px" />

            <q-toolbar-title>PLAY STAGE ADMIN</q-toolbar-title>

            <div class="header-admin" v-if="authStore.isLogin">
                <div class="admin-name">
                    Admin <i class="material-icons">expand_more</i>
                    <q-menu class="util-menu" transition-show="jump-down" transition-hide="jump-up" style="width: 200px">
                        <button @click="handleLogout">
                            <i class="material-icons">logout</i>
                            <span>Logout</span>
                        </button>
                    </q-menu>
                </div>
            </div>
        </q-toolbar>
    </q-header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();

async function handleLogout() {
    await authStore.signOut();
}
</script>

<style scoped lang="scss">
.header {
    height: $header-height;
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
