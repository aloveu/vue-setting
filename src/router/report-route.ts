const reportRoutes = [
    {
        path: 'dashboard',
        alias: '',
        component: () => import(/* webpackChunkName: "report" */ '@/views/report/Dashboard.vue'),
        meta: {
            title: 'Dashboard',
        },
    },
    {
        path: 'payment',
        component: () => import(/* webpackChunkName: "report" */ '@/views/report/PaymentReport.vue'),
        meta: {
            title: 'Payment Report',
        },
    },
];

export default reportRoutes;
