import { DTO } from '@/models';
import http from '@/services/axios';

const commonService = {
    fileUpload: (data) => {
        return http.post<any, { imageUrl: string }>('/Common/UploadImageRequest', data);
    },
    getVenueList() {
        return http.get<any, DTO.Venue.GetVenueListResponse>('/test/listRequest.json');
    },
};

export default commonService;
