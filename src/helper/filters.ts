export const Filters = {
    numberFormat(value: number) {
        return new Intl.NumberFormat('en-US').format(value);
    },
};
