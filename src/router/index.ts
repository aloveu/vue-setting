import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import brandRoute from '@/router/brand-route';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        alias: '/',
        component: LoginView,
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/brand',
        children: brandRoute,
        meta: {
            title: 'Brand Management',
            requireLogin: true,
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

export default router;
