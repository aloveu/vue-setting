export enum AccountGroup {
    Guests,
    Administrators,
    Master,
}

export enum Currency {
    USD = 0,
    EUR = 1,
    GBP = 2,
    RUB = 3,
    JPY = 4,
    KRW = 5,
    CNY = 6,
    HKD = 7,
    TWD = 8,
    KHR = 9,
    VND = 10,
    PHP = 11,
    INR = 12,
    THB = 13,
    IDR = 14,
    MYR = 15,
    SGD = 16,
    SEK = 17,
    NOK = 18,
    CHF = 19,
    CAD = 20,
    AMD = 21,
    DKK = 22,
    GCD = 23,
    GTD = 24,
    AUD = 25,
}

export enum CurrencySymbol {
    USD = '$',
    EUR = '€',
    GBP = '£',
    RUB = '₽',
    JPY = '¥',
    CNY = '¥',
    KRW = '₩',
    AUD = 'A$',
    CAD = 'Can$',
}

export enum DateSearchOptions {
    AnyDate = 'AnyDate',
    Today = 'Today',
    Yesterday = 'Yesterday',
    ThisWeek = 'This Week',
    LastWeek = 'Last Week',
    ThisMonth = 'This Month',
    LastMonth = 'Last Month',
    CustomRange = 'Custom Range',
    Before24Hours = '24Hours Ago',
}
