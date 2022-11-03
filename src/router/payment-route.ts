import BrandList from '@/views/brand/BrandList.vue';

const PaymentRoutes = [
    {
        path: 'list',
        alias: '',
        component: BrandList,
        meta: {
            title: 'PSP Balance',
            icon: 'pi pi-fw pi-dollar',
        },
    },
];

export default PaymentRoutes;
