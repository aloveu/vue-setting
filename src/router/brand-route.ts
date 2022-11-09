const BrandRoutes = [
    {
        path: 'list',
        alias: '',
        component: () => import(/* webpackChunkName: "brandList" */ '@/views/brand/BrandList.vue'),
        meta: {
            title: 'Brand List',
            icon: 'pi pi-fw pi-cog',
        },
    },
];

export default BrandRoutes;
