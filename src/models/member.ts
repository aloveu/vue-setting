export interface GetMemberListRequest {
    searchType: string;
    searchKeyword: string;
}
export interface Member {
    isSelected: boolean;
    memberSeq: number;
    memberId: string;
    memberName: string;
    memberPhone: string;
    memberEmail: string;
    address: string;
    address2: string;
    address3: string;
}
export interface UpdateMemberRequest {
    memberId: string;
}

export interface DeleteMemberRequest {
    memberId: string;
}

export interface BlockMemberRequest {
    memberId: string;
}
export interface SendSmsMessageRequest {
    memberPhoneList: string[];
    smsMessage: string;
}

export interface SetSmsTemplateRequest {
    smsMessage: string;
}
