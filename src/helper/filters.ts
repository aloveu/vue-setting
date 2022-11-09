import { DTO } from '@/models';
import dayjs from 'dayjs';

export const filters = {
    // currency 표기. 소수점자리수에서 반올림
    currency(value: number, currency: DTO.Enums.Currency = DTO.Enums.Currency.USD, decimals = 2) {
        const digitsRE = /(\d{3})(?=\d)/g;

        if (!isFinite(value) || (!value && value !== 0)) {
            return '';
        }

        const stringified = Math.abs(value).toFixed(decimals);
        const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
        const i = _int.length % 3;
        const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
        const _float = decimals ? stringified.slice(-1 - decimals) : '';
        const sign = value < 0 ? '-' : '';
        return sign + DTO.Enums.CurrencySymbol[DTO.Enums.Currency[currency]] + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
    },
    currencySymbol(currency: DTO.Enums.Currency = DTO.Enums.Currency.USD) {
        return DTO.Enums.CurrencySymbol[DTO.Enums.Currency[currency]] || DTO.Enums.CurrencySymbol.USD;
    },
    ldt(value: any, format = 'YYYY-MM-DD') {
        return dayjs.utc(value).local().format(format);
    },
    dt(value: any, format = 'YYYY-MM-DD') {
        return dayjs.utc(value).format(format);
    },
};
