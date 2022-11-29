import { defineStore } from 'pinia';
import { DTO } from '@/models';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
        isLogin: false,
        userInfo: {},
    }),
    actions: {
        registerAdmin(userInfo: DTO.Auth.Info) {
            this.isLogin = true;
            this.userInfo = userInfo;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
