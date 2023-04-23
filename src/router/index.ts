import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import ContentsRoutes from '@/router/contents-route';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'Login',
        path: '/login',
        alias: '/',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/management',
        children: ContentsRoutes,
        meta: {
            requireLogin: true,
            hasContentsLayout: true,
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
    }
    next();
});

export { router, routes };
