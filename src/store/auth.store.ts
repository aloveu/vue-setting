import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

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
        tempAdminRegister(userInfo) {
            this.userInfo = userInfo;
        },
        signIn() {
            this.isLogin = true;
        },
        signOut() {
            this.isLogin = false;
            this.userInfo = defaultUserInfo;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
