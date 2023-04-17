<template>
    <q-list bordered padding class="menu text-white" :class="{ active: toggleMenu }">
        <q-btn @click="toggleMenu = !toggleMenu" class="navbar-control" round :icon="toggleMenu ? 'chevron_left' : 'chevron_right'" color="white" />
        <template v-for="(depth1, i) in menuData" :key="i">
            <q-expansion-item v-if="depth1.items" :label="depth1.label" :icon="depth1.icon" :class="depth1.class" active-class="active" default-opened>
                <div class="depth2">
                    <q-item v-for="(depth2, j) in depth1.items" :key="j" :to="depth2.to" active-class="active" :active="currentPath.includes(depth2.to)" clickable v-ripple>
                        <q-item-section v-if="depth2.icon" avatar>
                            <q-icon :name="depth2.icon" />
                        </q-item-section>

                        <q-item-section>{{ depth2.label }}</q-item-section>
                    </q-item>
                </div>
            </q-expansion-item>

            <q-item v-else :to="depth1.to" :class="depth1.class" active-class="active" clickable v-ripple>
                <q-item-section v-if="depth1.icon" avatar>
                    <q-icon :name="depth1.icon" />
                </q-item-section>

                <q-item-section>{{ depth1.label }}</q-item-section>
            </q-item>
        </template>
    </q-list>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import BackOfficeRoutes from '@/router/demo-route';

const route = useRoute();
const authStore = useAuthStore();
const toggleMenu = ref<boolean>(true);
let menuData = [];

const currentPath = computed(() => {
    return route.path;
});

onBeforeMount(() => {
    setMenu();
});

function setMenu() {
    menuData = BackOfficeRoutes.reduce((result, depth1) => {
        const menuItem = {
            label: depth1.meta.title,
            icon: depth1.meta.icon,
            to: `${depth1.path}`,
            class: 'menu-depth1',
            items: [],
        };

        (depth1.children || []).forEach((depth2) => {
            const url = `/${depth1.path}/${depth2.path}`;
            menuItem.items.push({
                label: depth2.meta?.title,
                to: url,
            });
        });

        if (menuItem.items.length) {
            result.push(menuItem);
        }

        return result;
    }, []);
}
</script>

<style scoped lang="scss">
.menu {
    position: relative;
    display: block;
    width: 300px;
    margin-left: -235px;
    transition: margin-left 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    &.active {
        margin-left: 0;
    }

    .menu-depth1 {
        font-size: 14px;
        .q-item {
            min-height: 36px;
            box-sizing: border-box;
            &:hover {
                background: #000;
            }
        }
    }

    .depth2 {
        background: #262626;
        .q-item {
            min-height: 36px;
            line-height: 36px;
            padding: 0 0 0 40px;
            font-weight: 400;
            font-size: 14px;
            &.active {
                color: #fff;
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
    :deep {
        .q-item__section--avatar {
            min-width: 20px;
            padding-right: 6px;
        }
        .q-item__section--side {
            padding-left: 0;
            > .q-icon {
                font-size: 20px;
            }
        }
    }
    .navbar-control {
        position: absolute;
        min-width: 25px;
        min-height: 25px;
        right: -13px;
        top: 25px;
        color: #757575 !important;
        z-index: 99;
        > i {
            transform: rotate(180deg);
        }
    }
}
</style>
