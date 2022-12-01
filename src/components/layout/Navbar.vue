<template>
    <div class="navbar">
        <Menu :model="menuData" />
    </div>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
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
.navbar :deep(.p-menu) {
    display: block;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 200px;
    z-index: 11;

    .menu_depth1 {
        font-weight: 700;

        .p-menuitem-icon {
            display: none;
        }
    }
}
</style>
