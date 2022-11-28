import { AccountGroup } from '@/models/enums';

export interface Info {
    name: string;
    accountGroup: AccountGroup;
}

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
