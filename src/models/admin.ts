export interface GetAdminListRequest {
    adminId: string;
}
export interface GetAdminInfoRequest {
    adminId: string;
}
export interface AdminInfo {
    adminName: string;
    adminId: string;
    adminPhone: string;
    adminRegistedAt: string;
}
export interface CreateAdminRequest {
    adminName: string;
    adminId: string;
    adminPhone: string;
    adminPassword: string;
    confirmPassword: string;
    adminEmail: string;
}

export interface DeleteAdminRequest {
    adminId: string;
}

export interface BlockMemberRequest {
    memberId: string;
}
