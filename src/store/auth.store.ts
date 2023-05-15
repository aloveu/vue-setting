import { defineStore } from 'pinia';

const defaultUserInfo = {
    adminPhone: '',
    memberStatus: '',
};

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
        isLogin: false,
        userInfo: defaultUserInfo,
    }),
    actions: {
        signIn() {
            this.isLogin = true;
        },
        signOut() {
            this.isLogin = false;
            this.userInfo = defaultUserInfo;
            location.href = '/';
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
