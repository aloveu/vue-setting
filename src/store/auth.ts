import { defineStore } from 'pinia';
import { DTO } from '@/models';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
        isLogin: false,
        userInfo: {
            name: '',
            email: '',
            accountGroup: null,
        },
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
