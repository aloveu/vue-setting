export interface GetMemberListRequest {
    searchType: string;
    searchKeyword: string;
    pageNumber: number;
    pageSize: number;
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

export interface GetMemberListResponse {
    list: Member[];
    totalCount: number;
    totalPage: number;
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
export interface GetMemberStatusResponse {
    totalCount: number;
    blockCount: number;
    withdrawCount: number;
}
