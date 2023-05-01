import { DTO } from '@/models';
import http from '@/services/axios';
import { BlockMemberRequest, DeleteMemberRequest, GetMemberListRequest, UpdateMemberRequest } from '@/models/member';
import { AdminInfo, DeleteAdminRequest, GetAdminInfoRequest, GetAdminInfoResponse } from '@/models/admin';

const adminService = {
    getAdmins: (data: DTO.Admin.GetAdminListRequest) => {
        return http.post<any, DTO.Admin.GetAdminInfoResponse>('/admin/getAdminInfoList', data);
    },
    checkAdminId: (data: DTO.Admin.CheckAdminId) => {
        return http.get<any, void>(`/admin/getDuplicateCheckAdminId/${data.adminId}`);
    },
    getAdminInfo: (data: DTO.Admin.GetAdminInfoRequest) => {
        return http.post<any, DTO.Admin.AdminInfo[]>('/admin/getAdmin', data);
    },
    createAdmin: (data: DTO.Admin.CreateAdminRequest) => {
        return http.post<any, void>('/admin/joinAdminInfo', data);
    },
    updateAdmin: (data: DTO.Admin.CreateAdminRequest) => {
        return http.post<any, void>('/admin/joinAdminInfo', data);
    },
    deleteAdmin: (data: DTO.Admin.DeleteAdminRequest) => {
        return http.get<any, void>(`/admin/cmdAdminInfoNonActive/${data.adminSeq}`);
    },
};

export default adminService;
