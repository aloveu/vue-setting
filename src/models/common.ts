export interface DropDownListItem {
    label: string;
    value: any;
}

export interface CalendarDateOptionItem extends DropDownListItem {
    isActive: boolean;
}

export interface PageOptions {
    pageNumber: number;
    pageSize: number;
    isAscending?: boolean;
    totalCount?: number;
}
