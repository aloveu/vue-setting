const PaymentRoutes = [
    {
        path: 'list',
        alias: '',
        component: () => import(/* webpackChunkName: "brand" */ '@/views/brand/BrandList.vue'),
        meta: {
            title: 'PSP Balance',
            icon: 'pi pi-fw pi-dollar',
        },
    },
];

export default PaymentRoutes;
