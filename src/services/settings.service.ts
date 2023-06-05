import { DTO } from '@/models';
import http from '@/services/axios';

const settingsService = {
    getReplyFilterInfoList: (data: DTO.Settings.GetReplyFilterInfoListRequest) => {
        return http.get<any, DTO.Settings.GetReplyFilterInfoListResponse>('/admin/getReplyFilterInfoList', { params: data });
    },

    addReplyFilterInfo: (data: DTO.Settings.AddReplyFilterInfoRequest) => {
        return http.get<any, void>('/admin/addReplyFilterInfo', { params: data });
    },

    deleteReplyFilterInfo: (data: DTO.Settings.DeleteReplyFilterInfoRequest) => {
        return http.get<any, void>(`/admin/cmdReplyFilterInfoNonActive/${data.filterSeq}`, { params: data });
    },
};

export default settingsService;
