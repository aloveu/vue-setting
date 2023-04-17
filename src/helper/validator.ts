export const Validator = {
    isEmail(val: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return val.length > 0 && emailPattern.test(val);
    },
};
