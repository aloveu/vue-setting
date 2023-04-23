import { DTO } from '@/models';
import http from '@/services/axios';

const authService = {
    signIn: (data: DTO.Auth.LoginRequest) => {
        return http.post<any, DTO.Auth.LoginResponse>('/admin/login', data);
    },
    getLoginAuthNumber: (data: DTO.Auth.GetLoginAuthNumberRequest) => {
        return http.post<any, boolean>('/admin/getLoginAuthNumber', data);
    },
    certifyLoginAuthNumber: (data: DTO.Auth.CertifyLoginAuthNumberRequest) => {
        return http.post<any, boolean>('/admin/certifyLoginAuthNumber', data);
    },
};

export default authService;
