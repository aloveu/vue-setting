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
    {
        path: 'file',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/InputFile.vue'),
        meta: {
            title: 'Input File',
        },
    },
    {
        path: 'table',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Table.vue'),
        meta: {
            title: 'Table',
        },
    },
    {
        path: 'form-validator',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/FormValidator.vue'),
        meta: {
            title: 'Form validator',
        },
    },
];

export default DemoRoutes;
