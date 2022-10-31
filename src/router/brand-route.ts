import BrandList from '@/views/brand/BrandList.vue';

const BrandRoutes = [
    {
        path: '',
        alias: 'list',
        component: BrandList,
        meta: {
            title: 'Brand List',
        },
    },
];

export default BrandRoutes;
