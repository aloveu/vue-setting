import { DTO } from '@/models';
import { useAuthStore } from '@/store/auth';

export const Permission = {
    // store를 빌드시점에 부르면 오류남.
    // myPermission: useAuthStore().userInfo.accountGroup,
    canAccess(menuPermission: DTO.Enums.AccountGroup): boolean {
        const authStore = useAuthStore();
        return (menuPermission || DTO.Enums.AccountGroup.Normal) <= authStore.userInfo.accountGroup;
    },
    getAdminType() {
        const authStore = useAuthStore();
        return DTO.Enums.AccountGroup[authStore.userInfo.accountGroup];
    },
};
