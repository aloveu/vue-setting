export interface DropDownListItem {
    label: string;
    value: any;
}

export interface PageOptions {
    currentPage: number;
    pageSize: number;
    isAscending?: boolean;
    totalCount?: number;
}
