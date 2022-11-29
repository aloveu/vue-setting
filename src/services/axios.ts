import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});

http.interceptors.request.use(
    (request) => {
        console.log('request interceptor', request);

        if (request.url.includes('//')) {
            request.baseURL = '';
        }
        request.headers.Authrozation = authStore.accessToken;
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
    (error) => {
        console.log(error);
        // 401은 여기서 처리 하면 될듯.
        if (401 === error.response.status) {
            console.log(401);
        }
        return Promise.reject(error.response.data);
    }
);

export default http;
