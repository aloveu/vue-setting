import { DTO } from '@/models';
import http from '@/services/axios';
import { BlockMemberRequest, DeleteMemberRequest, GetMemberListRequest, UpdateMemberRequest } from '@/models/member';
import { AdminInfo, DeleteAdminRequest, GetAdminInfoRequest } from '@/models/admin';

const adminService = {
    getAdmins: (data: DTO.Admin.GetAdminListRequest) => {
        return http.post<any, DTO.Admin.AdminInfo[]>('/admin/getAdminList', data);
    },
    getAdminInfo: (data: DTO.Admin.GetAdminInfoRequest) => {
        return http.post<any, DTO.Admin.AdminInfo[]>('/admin/getAdmin', data);
    },
    createAdmin: (data: DTO.Admin.CreateAdminRequest) => {
        return http.post<any, void>('/admin/createAdmin', data);
    },
    updateAdmin: (data: DTO.Admin.CreateAdminRequest) => {
        return http.post<any, void>('/admin/updateAdmin', data);
    },
    deleteAdmin: (data: DTO.Admin.DeleteAdminRequest) => {
        return http.post<any, void>('/admin/deleteAdmin', data);
    },
};

export default adminService;
