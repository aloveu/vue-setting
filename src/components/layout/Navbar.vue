<template>
    <Menu class="navbar" :model="menus"></Menu>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import { useRouter } from 'vue-router';

const routes = useRouter().getRoutes();
const mapRoutes = new Map();

// routes 전체를 map객체에서 정리하고 다시 array로 반환
routes.forEach((x) => {
    if (x.path === '/' || x.path === '/login' || x.path === '/:catchAll(.*)') {
        return;
    }
    const routeSplitPath = x.path.split('/');
    const depth2List = mapRoutes.get(routeSplitPath[1])?.items || [];

    // 2depth가 먼저 set되면 1depth 만들고 그 아래 items로 넣어야한다.
    mapRoutes.set(routeSplitPath[1], {
        label: x.meta.title,
        icon: x.meta.icon,
        to: x.path,
        class: 'menu_depth1',
        items: [...depth2List],
    });

    if (routeSplitPath[2]) {
        const depth1 = mapRoutes.get(routeSplitPath[1]);

        depth1.items.push({
            label: x.meta.title,
            icon: x.meta.icon,
            to: x.path,
        });
        mapRoutes.set(routeSplitPath[1], depth1);
    }
});

const menus = [];
mapRoutes.forEach((x) => {
    const menuItem = x;
    if (!x.items.length) {
        delete menuItem.items;
    }
    menus.push(menuItem);
});
</script>

<style lang="scss">
.navbar {
    display: block;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #202124;
    z-index: 11;
    .menu_depth1 {
        font-weight: 700;
        .p-menuitem-icon {
            display: none;
        }
    }
}
</style>
