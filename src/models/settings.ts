export interface GetReplyFilterInfoListRequest {
    word: string;
    pageNumber: number;
    pageSize: number;
}

export interface FilterInfo {
    filterSeq: number;
    filterWord: string;
    filterStatus: string;
    creatDt: string;
}

export interface GetReplyFilterInfoListResponse {
    list: FilterInfo[];
    totalCount: number;
    totalPage: number;
}

export interface AddReplyFilterInfoRequest {
    word: string;
    isBlock: boolean;
}
export interface DeleteReplyFilterInfoRequest {
    filterSeq: number;
}
