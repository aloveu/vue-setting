import { defineStore } from 'pinia';
import { DTO } from '@/models';

const defaultUserInfo = {
    name: '',
    email: '',
    accountGroup: null,
};

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
        isLogin: false,
        userInfo: defaultUserInfo,
    }),
    actions: {
        registerAdmin(userInfo: DTO.Auth.Info) {
            this.isLogin = true;
            this.userInfo = userInfo;
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
