import { DTO } from '@/models';
import http from '@/services/axios';

const authService = {
    signIn: (data: DTO.Auth.LoginRequest) => {
        return http.post<any, DTO.Auth.LoginResponse>('/admin/login', data);
    },
    smsAuth: (data: DTO.Auth.SmsRequest) => {
        return http.post<any, DTO.Auth.LoginResponse>('/common/smsAuth', data);
    },
};

export default authService;
