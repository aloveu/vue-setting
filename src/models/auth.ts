export interface LoginRequest {
    adminId: string;
    adminPwd: string;
}

export interface LoginResponse {
    adminSeq: number;
}

export interface GetLoginAuthNumberRequest {
    adminSeq: number;
}

export interface CertifyLoginAuthNumberRequest {
    adminSeq: number;
    authNumber: string;
}
