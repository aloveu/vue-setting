import { DTO } from '@/models';
import http from './axios';

const authService = {
    signIn: (data: DTO.Auth.LoginRequest) => {
        // return http.post('/Admin/LoginAdminRequest', data);
        // 비효율적인 response type정의지만.. 이렇게 써야함.  (axiosResponse Type)
        return http.get<any, DTO.Auth.Info>('/test/loginAdminRequest.json');
    },
};

export default authService;
