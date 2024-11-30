import type { ApplicationStatusDto } from "@/models/responses/ApplicationStatusDto";
import type { TermDto } from "@/models/responses/TermDto";
import type { SubmitApplicaitonRequest } from "@/models/requests/SubmitApplicationRequest";
import type { ApplicationDto } from "@/models/responses/ApplicationDto";
import type { Response } from "@/models/Response"
import type { AxiosResponse } from 'axios';

export interface IApplicationRepository {
    getApplicatoinStatuses(): Promise<AxiosResponse<Response<ApplicationStatusDto[]>>>
    getTerms(): Promise<AxiosResponse<Response<TermDto[]>>>
    submitApplicaiton(request: SubmitApplicaitonRequest): Promise<AxiosResponse<Response<object>>>
    getUpcomingApplications(userId: number): Promise<AxiosResponse<Response<ApplicationDto>>>

}