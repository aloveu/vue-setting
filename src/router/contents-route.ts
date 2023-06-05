import { RouteRecordRaw } from 'vue-router';

const ContentsRoutes: Array<RouteRecordRaw> = [
    {
        path: 'members',
        meta: {
            title: '회원 관리',
            icon: 'sym_o_group',
        },
        children: [
            {
                path: 'list',
                meta: { title: '회원 목록' },
                component: () => import('@/pages/member/MemberList.vue'),
            },
            {
                path: ':memberId/articles',
                component: () => import('@/pages/member/MemberList.vue'),
                meta: { title: '작성글보기', isHideMenu: true },
            },
            {
                path: ':memberId/photo-list',
                component: () => import('@/pages/member/MemberList.vue'),
                meta: { title: '올린사진보기', isHideMenu: true },
            },
        ],
    },
    {
        path: 'sms',
        meta: {
            title: '회원문자 발송',
            icon: 'sym_o_mail',
        },
        component: () => import('@/pages/sms/SendSms.vue'),
    },
    {
        path: 'report',
        meta: {
            title: '접속현황',
            icon: 'sym_o_bar_chart',
        },
        children: [
            {
                path: 'free',
                meta: { title: '무료접속현황' },
                component: () => import('@/pages/report/FreeLoginReport.vue'),
            },
            {
                path: 'paid',
                meta: { title: '유료접속현황' },
                component: () => import('@/pages/report/PaidLoginReport.vue'),
            },
            {
                path: 'day',
                meta: { title: '일일접속현황' },
                component: () => import('@/pages/report/DayLoginReport.vue'),
            },
        ],
    },
    {
        path: 'admin',
        meta: {
            title: '관리자',
            icon: 'sym_o_lock_person',
        },
        component: () => import('@/pages/admin/AdminList.vue'),
    },
    {
        path: 'settings',
        meta: {
            title: 'APP 제어',
            icon: 'sym_o_settings',
        },
        children: [
            {
                path: '',
                meta: { title: '댓글 필터' },
                component: () => import('@/pages/settings/FilterlingSetting.vue'),
            },
        ],
    },
];

export default ContentsRoutes;
