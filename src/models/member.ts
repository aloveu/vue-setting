export interface GetMemberListRequest {
    memberId: string;
    location: string;
    fromAge: 0;
    toAge: 0;
    distance: 0;
}
export interface Member {
    isSelected: boolean;
    memberId: string;
    memberName: string;
    memberPhone: string;
    memberBirthday: string;
    memberIntro: string;
    memberHeight: string;
    language: string;
    bodyInfo: string;
    drinkInfo: string;
    smokingInfo: string;
    memberTendencyCd: string;
    searchTendencyCd1: string;
    searchTendencyCd2: string;
    searchTendencyCd3: string;
    tbMemberPhotoInfoList: [
        {
            photoSeq: 0;
            photoSavedFileName: string;
        }
    ];
}
export interface UpdateMemberRequest {
    memberId: string;
}

export interface DeleteMemberRequest {
    memberId: string;
}

export interface BlockMemberRequest {
    memberId: string;
}
export interface SendSmsMessageRequest {
    memberPhoneList: string[];
    smsMessage: string;
}

export interface SetSmsTemplateRequest {
    smsMessage: string;
}
