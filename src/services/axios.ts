import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { DTO } from '@/models';

axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        Accept: 'application/json',
    },
});

http.interceptors.request.use(
    async (request) => {
        if (request.url.includes('//') || request.url.includes('assets/js')) {
            request.baseURL = '';
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const { config, response } = error;
        const authStore = useAuthStore();

        if (401 === response?.status) {
            // try {
            //     await authStore.refreshToken();
            //
            //     // 리프레시 후 토큰 재 요청
            //     const reTry = await axios(config);
            //     return reTry.data;
            // } catch (e) {
            //     console.error(e);
            // }
        }

        const signOutErrors = [DTO.Enums.ErrorCodes.EXPIRED_TOKEN, DTO.Enums.ErrorCodes.INVALID_TOKEN];
        if (signOutErrors.includes(response.data?.errorCode)) {
            authStore.signOut();
        }

        return Promise.reject(error.response.data);
    }
);

export default http;
