import { DTO } from '@/models';
import http from '@/services/axios';
import { BlockMemberRequest, DeleteMemberRequest, GetMemberListRequest, SetSmsTemplateRequest, UpdateMemberRequest } from '@/models/member';

const memberService = {
    getMembers: (data: DTO.Member.GetMemberListRequest) => {
        return http.post<any, DTO.Member.Member[]>('/member/getMemberList', data);
    },
    updateMemberInfo: (data: DTO.Member.UpdateMemberRequest) => {
        return http.post<any, void>('/member/updateMemberInfo', data);
    },
    deleteMember: (data: DTO.Member.DeleteMemberRequest) => {
        return http.post<any, void>('/member/deleteMember', data);
    },
    blockMember: (data: DTO.Member.BlockMemberRequest) => {
        return http.post<any, void>('/member/blockMember', data);
    },
    getSmsTemplate: () => {
        return http.post<any, string>('/member/getSmsTemplate');
    },
    setSmsTemplate: (data: DTO.Member.SetSmsTemplateRequest) => {
        return http.post<any, void>('/member/sendSmsMessage', data);
    },
    sendSmsMessage: (data: DTO.Member.SendSmsMessageRequest) => {
        return http.post<any, void>('/member/sendSmsMessage', data);
    },
};

export default memberService;
