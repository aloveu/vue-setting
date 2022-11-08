import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLogin: false,
        userInfo: {},
    }),
    actions: {
        registerAdmin(userInfo) {
            this.isLogin = true;
            this.userInfo = userInfo;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
