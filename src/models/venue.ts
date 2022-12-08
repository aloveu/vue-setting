export interface VenueInfo {
    venueId: number;
    venueName: string;
    venueImageUrl: string;
    linkUrl: string;
    venueAddress: string;
    utcTimeZoneNumber: number;
    tournamentEventCount: number;
    isHided: boolean;
    createdAt: string;
    updatedAt: string;
    stakeCount: number;
    selected: boolean;
}

export interface GetVenueListResponse {
    venueInfoList: VenueInfo[];
    totalCount: number;
}
