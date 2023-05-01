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
        signIn() {
            this.isLogin = true;
        },
        signOut() {
            const router = useRouter();
            this.isLogin = false;
            this.userInfo = defaultUserInfo;
            router.push('/');
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
