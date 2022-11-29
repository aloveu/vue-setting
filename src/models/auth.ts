import { AccountGroup } from '@/models/enums';

export interface LoginRequest {
    adminEmail: string;
    password: string;
}

export interface Info {
    name: string;
    email: string;
    accountGroup: AccountGroup;
}
