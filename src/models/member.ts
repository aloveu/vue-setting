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
    memberSeqList: number[];
}

export interface BlockMemberRequest {
    memberSeqList: number[];
}
export interface SendSmsMessageRequest {
    memberSeqList: number[];
    content: string;
    isAll: boolean;
}

export interface SetSmsTemplateRequest {
    smsMessage: string;
}
export interface GetMemberStatusResponse {
    totalCount: number;
    blockCount: number;
    withdrawCount: number;
}

export interface TendencyList {
    memberTendencySeq: number;
    memberTendencyName: string;
    memberTendencyCd: string;
    parentSeq: number;
    depth: number;
}
