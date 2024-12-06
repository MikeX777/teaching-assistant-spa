import type { IApplicationRepository } from "@/interfaces/IApplicationRepository";
import type { ApplicationStatusDto } from "@/models/responses/ApplicationStatusDto";
import type { Response } from "@/models/Response";
import axios, { type AxiosResponse } from 'axios';
import type { TermDto } from "@/models/responses/TermDto";
import type { SubmitApplicaitonRequest } from "@/models/requests/SubmitApplicationRequest";
import type { ApplicationDto } from "@/models/responses/ApplicationDto";

export class ApplicationRepository implements IApplicationRepository {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getApplicatoinStatuses(): Promise<AxiosResponse<Response<ApplicationStatusDto[]>>> {
        return axios.get(`${this.baseUrl}applications/statuses`);
    }

    async getTerms(): Promise<AxiosResponse<Response<TermDto[]>>> {
        return axios.get(`${this.baseUrl}applications/terms`);
    }

    async submitApplicaiton(request: SubmitApplicaitonRequest): Promise<AxiosResponse<Response<object>>> {
        return axios.post(`${this.baseUrl}applications/submit`, request)
    }

    async getUpcomingApplications(userId: number): Promise<AxiosResponse<Response<ApplicationDto[]>>> {
        return axios.get(`${this.baseUrl}/applications/users/${userId}/upcoming`);
    }
}