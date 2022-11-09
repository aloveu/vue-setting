const reportRoutes = [
    {
        path: 'dashboard',
        alias: '',
        component: () => import(/* webpackChunkName: "report" */ '@/views/report/Dashboard.vue'),
        meta: {
            title: 'Dashboard',
            icon: 'pi pi-fw pi-chart-line',
        },
    },
    {
        path: 'payment',
        component: () => import(/* webpackChunkName: "report" */ '@/views/report/PaymentReport.vue'),
        meta: {
            title: 'Payment Report',
            icon: 'pi pi-fw pi-dollar',
        },
    },
];

export default reportRoutes;
