import Dashboard from '@/views/report/Dashboard.vue';
import PaymentReport from '@/views/report/PaymentReport.vue';

const reportRoutes = [
    {
        path: 'dashboard',
        alias: '',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            icon: 'pi pi-fw pi-chart-line',
        },
    },
    {
        path: 'payment',
        component: PaymentReport,
        meta: {
            title: 'Payment Report',
            icon: 'pi pi-fw pi-dollar',
        },
    },
];

export default reportRoutes;
