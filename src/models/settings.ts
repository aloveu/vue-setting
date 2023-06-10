export interface GetReplyFilterInfoListRequest {
    word: string;
    pageNumber: number;
    pageSize: number;
}

export interface FilterInfo {
    filterSeq: number;
    filterWord: string;
    isActive: boolean;
    creatDt: string;
}

export interface GetReplyFilterInfoListResponse {
    list: FilterInfo[];
    totalCount: number;
    totalPage: number;
}

export interface AddReplyFilterInfoRequest {
    word: string;
    isActive: boolean;
}
export interface DeleteReplyFilterInfoRequest {
    filterSeq: number;
}

export interface UpdateReplyFilterInfoRequest {
    filterSeq: number;
    isActive: boolean;
}
