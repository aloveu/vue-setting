import { defineStore } from 'pinia';

const useMemberStore = defineStore('member', () => {
    const count = 1;

    return { count };
});

export default useMemberStore;
