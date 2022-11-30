const DemoRoutes = [
    {
        path: 'filter',
        alias: '',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Filter.vue'),
        meta: {
            title: 'Filter',
        },
    },
    {
        path: 'directives',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Directives.vue'),
        meta: {
            title: 'Directives',
        },
    },
    {
        path: 'page-navigation',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/PageNavigationDemo.vue'),
        meta: {
            title: 'Page Navigation',
        },
    },
    {
        path: 'helper',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Helper.vue'),
        meta: {
            title: 'Helper',
        },
    },
    {
        path: 'calendar',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Calendar.vue'),
        meta: {
            title: 'Calendar',
        },
    },
];

export default DemoRoutes;
