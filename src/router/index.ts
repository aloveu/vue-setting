import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import brandRoute from '@/router/brand-route';
import reportRoute from '@/router/report-route';
import paymentRoute from '@/router/payment-route';
import demoRoute from '@/router/demo-route';
import { DTO } from '@/models';
import { Helper } from '@/helper';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'Login',
        path: '/login',
        alias: '/',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/LoginView.vue'),
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/demo',
        children: demoRoute,
        meta: {
            requireLogin: true,
            title: 'Demo',
            icon: 'pi pi-fw pi-folder-open',
        },
    },
    {
        path: '/user',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/LoginView.vue'),
        meta: {
            requireLogin: true,
            permission: DTO.Enums.AccountGroup.Floorman,
            title: 'User',
            icon: 'pi pi-fw pi-users',
        },
    },
    {
        path: '/brand',
        children: brandRoute,
        meta: {
            requireLogin: true,
            permission: DTO.Enums.AccountGroup.Administrators,
            title: 'Brand',
            icon: 'pi pi-fw pi-bookmark',
        },
    },
    {
        path: '/payment',
        children: paymentRoute,
        meta: {
            requireLogin: true,
            permission: DTO.Enums.AccountGroup.Administrators,
            title: 'Payment',
        },
    },
    {
        path: '/report',
        children: reportRoute,
        meta: {
            requireLogin: true,
            permission: DTO.Enums.AccountGroup.Normal,
            title: 'Report',
            icon: 'pi pi-fw pi-align-center',
        },
    },
    {
        path: '/:catchAll(.*)',
        component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFoundView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requireLogin)) {
        const authStore = useAuthStore();

        if (!authStore.isLogin) {
            next({ name: 'Login', query: { refUrl: to.fullPath } });
        } else {
            to.matched.some((record) => {
                const menuPermission = record.meta.permission || DTO.Enums.AccountGroup.Normal;
                const permission = Helper.Permission.canAccess(menuPermission as DTO.Enums.AccountGroup);

                if (permission) {
                    next();
                } else {
                    next('/PageNotFound');
                }
                return permission;
            });
        }
    } else {
        next();
    }
});

export { router, routes };
