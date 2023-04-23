<template>
    <q-list bordered padding class="menu text-white">
        <template v-for="(depth1, i) in menuData" :key="i">
            <q-expansion-item v-if="depth1.items.length" :label="depth1.label" :icon="depth1.icon" :class="depth1.class" active-class="active" default-opened>
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
import ContentsRoutes from '@/router/contents-route';

const route = useRoute();
const authStore = useAuthStore();
const menuData = ref([]);

const currentPath = computed(() => {
    return route.path;
});

onBeforeMount(() => {
    setMenu();
});

function setMenu() {
    menuData.value = ContentsRoutes.reduce((result, depth1) => {
        const menuItem = {
            label: depth1.meta.title,
            icon: depth1.meta.icon,
            to: `/management/${depth1.path}`,
            class: 'menu-depth1',
            items: [],
        };

        (depth1.children || []).forEach((depth2) => {
            if (depth2.meta.isHideMenu) {
                return;
            }
            const url = depth2.path ? `/management/${depth1.path}/${depth2.path}` : `/management/${depth1.path}`;
            menuItem.items.push({
                label: depth2.meta?.title,
                to: url,
            });
        });

        result.push(menuItem);
        return result;
    }, []);
}
</script>

<style scoped lang="scss">
.menu {
    position: relative;
    display: block;
    width: 200px;
    .menu-depth1 {
        font-size: 14px;
        .q-item {
            min-height: 36px;
            box-sizing: border-box;
            &:hover {
                background: #000;
            }
        }
        &.active {
            color: $white;
            background-color: $primary;
        }
    }

    .depth2 {
        background: $gray-8;
        .q-item {
            min-height: 36px;
            line-height: 36px;
            padding: 0 0 0 40px;
            font-weight: 400;
            font-size: 14px;
            &.active {
                color: $white;
                background-color: $primary;
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
}
</style>
