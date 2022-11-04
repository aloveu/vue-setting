import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useAuthStore from '@/store/auth';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import brandRoute from '@/router/brand-route';
import reportRoute from '@/router/report-route';
import paymentRoute from '@/router/payment-route';

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
        path: '/user',
        component: LoginView,
        meta: {
            requireLogin: true,
            title: 'User',
            icon: 'pi pi-fw pi-users',
        },
    },
    {
        path: '/brand',
        children: brandRoute,
        meta: {
            requireLogin: true,
            title: 'Brand',
            icon: 'pi pi-fw pi-bookmark',
        },
    },
    {
        path: '/payment',
        children: paymentRoute,
        meta: {
            requireLogin: true,
            title: 'Payment',
        },
    },
    {
        path: '/report',
        children: reportRoute,
        meta: {
            requireLogin: true,
            title: 'Report',
            icon: 'pi pi-fw pi-align-center',
        },
    },
    {
        path: '/maintenance',
        component: NotFoundView,
        meta: {
            requireLogin: true,
            title: 'Maintenance',
            icon: 'pi pi-fw pi-cog',
        },
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requireLogin)) {
        const authStore = useAuthStore();

        if (!authStore.isLogin) {
            next({ name: 'Login', query: { refUrl: to.fullPath } });
        } else {
            next();
        }
    } else {
        next();
    }
});

export { router, routes };
