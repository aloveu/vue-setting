import { defineStore } from 'pinia';
import { DTO } from '@/models';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLogin: false,
        userInfo: {},
    }),
    actions: {
        registerAdmin(userInfo: DTO.Common.Info) {
            this.isLogin = true;
            this.userInfo = userInfo;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
