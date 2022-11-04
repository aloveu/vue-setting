import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', () => {
    const isLogin = false;

    return { isLogin };
});

export default useAuthStore;
