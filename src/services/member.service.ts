import { DTO } from '@/models';
import http from '@/services/axios';

const memberService = {
    getMemberStatus: () => {
        return http.get<any, DTO.Member.GetMemberStatusResponse>('/admin/getMemberListCount');
    },
    getMembers: (data: DTO.Member.GetMemberListRequest) => {
        return http.post<any, DTO.Member.GetMemberListResponse>('/admin/getMemberList', data);
    },
    updateMemberInfo: (data: DTO.Member.UpdateMemberRequest) => {
        return http.post<any, void>('/admin/updateMemberInfo', data);
    },
    deleteMember: (data: DTO.Member.DeleteMemberRequest) => {
        return http.post<any, void>('/admin/deleteMember', data);
    },
    blockMember: (data: DTO.Member.BlockMemberRequest) => {
        return http.post<any, void>('/admin/blockMember', data);
    },
    getSmsTemplate: () => {
        return http.post<any, string>('/admin/getSmsTemplate');
    },
    setSmsTemplate: (data: DTO.Member.SetSmsTemplateRequest) => {
        return http.post<any, void>('/admin/sendSmsMessage', data);
    },
    sendSmsMessage: (data: DTO.Member.SendSmsMessageRequest) => {
        return http.post<any, void>('/admin/sendSmsToMember', data);
    },

    // 성향
    getTendencyList: () => {
        return http.post<any, DTO.Member.TendencyList[]>('/common/getTendencyList');
    },
};

export default memberService;
