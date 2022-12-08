const BrandRoutes = [
    {
        path: 'list',
        alias: '',
        component: () => import(/* webpackChunkName: "brandList" */ '@/views/brand/BrandList.vue'),
        meta: {
            title: 'Brand List',
        },
    },
];

export default BrandRoutes;
