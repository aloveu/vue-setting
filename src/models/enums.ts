export enum ErrorCodes {
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    ACCESS_DENIED = 'ACCESS_DENIED',
    INVALID_PERMISSION = 'INVALID_PERMISSION',
    INVALID_REQUEST = 'INVALID_REQUEST',
    INVALID_TOKEN = 'INVALID_TOKEN',
    EXPIRED_TOKEN = 'EXPIRED_TOKEN',
    DB_TRANSACTION_ERROR = 'DB_TRANSACTION_ERROR',
    DATA_NOT_EMPTY = 'DATA_NOT_EMPTY',
    NOT_ENOUGH_BALANCE = 'NOT_ENOUGH_BALANCE',
}

export enum ResultCode {
    SUCCESS = '200',
}

export enum MemberSearchType {
    MemberName = 'memberName',
    Sex = 'sex',
    MemberTendency = 'memberTendency',
    MemberEmail = 'memberEmail',
    MemberPhone = 'memberPhone',
    MemberRegisterdAt = 'memberRegisterdAt',
}
