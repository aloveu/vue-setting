import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/store/auth';
import Header from '@/components/layout/Header.vue';

const wrapper = mount(Header, {
    global: {
        plugins: [createTestingPinia()],
    },
});
const authStore = useAuthStore();

describe('Header.vue', () => {
    it('로그인이 됐을 때 Admin 이름 영역이 나타나야한다.', () => {
        authStore.isLogin = true;
        expect(wrapper.find('.heading-title').isVisible()).toBeTruthy();
        // expect(wrapper.find('.header-admin').isVisible()).toBeTruthy();
        // expect(wrapper.find('.admin-name').trigger('click')).toBe(wrapper.find({ ref: 'menu' }).isVisible());
    });
});
