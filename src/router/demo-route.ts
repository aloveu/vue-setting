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
        path: 'page-navigation',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/PageNavigation.vue'),
        meta: {
            title: 'Page Navigation',
        },
    },
];

export default DemoRoutes;
