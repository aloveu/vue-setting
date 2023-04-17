import { RouteRecordRaw } from 'vue-router';

const DemoRoutes: Array<RouteRecordRaw> = [
    {
        path: 'page-navigation',
        component: () => import(/* webpackChunkName: "demo" */ '@/pages/demo/PageNavigationDemo.vue'),
        meta: {
            title: 'Page Navigation',
            icon: 'sym_o_account_tree',
        },
    },
];

export default DemoRoutes;
