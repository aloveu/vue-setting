export interface LoginRequest {
    adminId: string;
    adminPwd: string;
}

export interface LoginResponse {
    adminPhone: string;
    memberStatus: string;
}
export interface SmsRequest {
    authValue: string;
}
