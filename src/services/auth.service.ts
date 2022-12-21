import { DTO } from '@/models';
import http from '@/services/axios';
import { load } from 'protobufjs';

let authProto;
load('auth.proto', (err, root) => {
    if (err) throw err;

    authProto = root.lookupType('authpackage.LoginRequest');
});

const authService = {
    signIn: (data: DTO.Auth.LoginRequest) => {
        // return http.post('/Admin/LoginAdminRequest', data);
        // 비효율적인 response type정의지만.. 이렇게 써야함.  (axiosResponse Type)
        return http.get<any, DTO.Auth.Info>('/test/loginAdminRequest.json');
    },
    protoSignIn: (data) => {
        // gRPC 통신을 위해.. protobufjs 로 encode 후 전달..
        const message = authProto.create(data);
        const buffer = authProto.encode(message).finish();
        console.log(message);
        console.log(buffer, Array.prototype.toString.call(buffer));

        // 이 리턴은 그냥 promise 때문에 남겨둠..
        return http.get<any, DTO.Auth.Info>('/test/loginAdminRequest.json');
    },
};

export default authService;
