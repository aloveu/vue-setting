import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import demoRoute from '@/router/demo-route';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'Login',
        path: '/login',
        alias: '/',
        component: () => import('@/pages/Login.vue'),
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/main',
        children: demoRoute,
        meta: {
            requireLogin: true,
            title: 'Demo',
        },
    },
    {
        path: '/demo',
        children: demoRoute,
        meta: {
            requireLogin: true,
            title: 'Demo',
        },
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/pages/NotFoundView.vue'),
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
        }
    } else {
        next();
    }
});

export { router, routes };
