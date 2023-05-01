import { Member } from '@/models/member';

export interface GetAdminListRequest {
    searchType: string;
    searchKeyword: string;
    pageNumber: number;
    pageSize: number;
}
export interface GetAdminInfoRequest {
    adminId: string;
}
export interface AdminInfo {
    adminName: string;
    adminId: string;
    adminPhone: string;
    createDt: string;
    memberStatus: string;
}
export interface GetAdminInfoResponse {
    list: AdminInfo[];
    totalCount: number;
    totalPage: number;
}
export interface CreateAdminRequest {
    adminName: string;
    adminSeq?: number;
    adminId: string;
    adminPhone: string;
    adminPwd: string;
    confirmPassword: string;
    adminEmail: string;
}

export interface CheckAdminId {
    adminId: string;
}

export interface DeleteAdminRequest {
    adminSeq: number;
}
