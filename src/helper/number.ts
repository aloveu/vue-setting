export const Number = {
    roundTo(num: number, place: number) {
        return +`${Math.round(parseFloat(`${num.toString()}e+${place}`))}e-${place}`;
    },
    ceilTo(num: number, place: number) {
        return +`${Math.ceil(parseFloat(`${num.toString()}e+${place}`))}e-${place}`;
    },
    floorTo(num: number, place: number) {
        return +`${Math.floor(parseFloat(`${num.toString()}e+${place}`))}e-${place}`;
    },
};
