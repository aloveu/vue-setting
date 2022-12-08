<template>
    <q-list bordered padding class="menu text-white">
        <template v-for="(depth1, i) in menuData" :key="i">
            <q-expansion-item v-if="depth1.items" :label="depth1.label" :icon="depth1.icon" :class="depth1.class" active-class="active" default-opened>
                <q-item v-for="(depth2, j) in depth1.items" :key="j" :to="depth2.to" exact active-class="active" clickable v-ripple>
                    <q-item-section v-if="depth2.icon" avatar>
                        <q-icon :name="depth2.icon" />
                    </q-item-section>

                    <q-item-section>{{ depth2.label }}</q-item-section>
                </q-item>
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
import { routes } from '@/router';
import { DTO } from '@/models';
import Helper from '@/helper';

const menuData = routes.reduce((result, depth1) => {
    if (depth1.path !== '/login' && depth1.path !== '/:catchAll(.*)' && Helper.Permission.canAccess(depth1.meta.permission as DTO.Enums.AccountGroup)) {
        const menuItem = {
            label: depth1.meta.title,
            icon: depth1.meta.icon,
            to: depth1.path,
            class: 'menu_depth1',
            items: [],
        };

        (depth1.children || []).forEach((depth2) => {
            if (Helper.Permission.canAccess(depth2.meta.permission as DTO.Enums.AccountGroup)) {
                menuItem.items.push({
                    label: depth2.meta.title,
                    icon: depth2.meta.icon,
                    to: `${depth1.path}/${depth2.path}`,
                });
            }
        });

        if (!menuItem.items.length) {
            delete menuItem.items;
        }

        result.push(menuItem);
    }
    return result;
}, []);
</script>

<style scoped lang="scss">
.menu {
    display: block;
    width: 200px;

    .menu_depth1 {
        font-weight: 700;

        > i {
            display: none;
        }
        .q-item {
            min-height: 30px;
            text-indent: 40px;
            font-weight: 400;
            &.active {
                font-weight: 700;
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
    :deep {
        .q-item__section--avatar {
            min-width: 40px;
        }
    }
}
</style>
