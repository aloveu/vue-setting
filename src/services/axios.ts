import axios from 'axios';
import { DTO } from '@/models';
import { ResultCode } from '@/models/enums';

axios.defaults.withCredentials = false;

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

        // request.headers.Authrozation = `3xCv29981_Tx091dUx98_84PTx905EB`;
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        if (response.data.resultCode !== ResultCode.SUCCESS) {
            return Promise.reject(response.data?.resultMessage);
        }
        if (response.data.totalCount || response.data.totalCount === 0) {
            return { list: response.data.data, totalCount: response.data.totalCount, totalPage: response.data.totalPage };
        }
        return response.data.data;
    },
    async (error) => {
        // const { config, response } = error;
        // const authStore = useAuthStore();
        //
        // if (401 === response?.status) {
        //     // try {
        //     //     await authStore.refreshToken();
        //     //
        //     //     // 리프레시 후 토큰 재 요청
        //     //     const reTry = await axios(config);
        //     //     return reTry.data;
        //     // } catch (e) {
        //     //     console.error(e);
        //     // }
        // }
        //
        // const signOutErrors = [DTO.Enums.ErrorCodes.EXPIRED_TOKEN, DTO.Enums.ErrorCodes.INVALID_TOKEN];
        // if (signOutErrors.includes(response.data?.errorCode)) {
        //     authStore.signOut();
        // }

        return Promise.reject(error.response.data);
    }
);

export default http;
