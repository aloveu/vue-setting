import BrandList from '@/views/brand/BrandList.vue';

const BrandRoutes = [
    {
        path: 'list',
        alias: '',
        component: BrandList,
        meta: {
            title: 'Brand List',
            icon: 'pi pi-fw pi-cog',
        },
    },
];

export default BrandRoutes;
