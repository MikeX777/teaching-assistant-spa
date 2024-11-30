import type { IUserRepository } from "@/interfaces/IUserRepository";
import type { Response } from "@/models/Response";
import type { CreateUserRequest } from "@/models/requests/CreateUserRequest";
import type { SignInRequest } from "@/models/requests/SignInRequest";
import type { VerifyRequest } from "@/models/requests/VerifyRequest";
import type { UserTypeDto } from "@/models/responses/UserTypeDto";
import axios, { type AxiosResponse } from 'axios';

export class UserRepository implements IUserRepository {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getUserTypes(): Promise<AxiosResponse<Response<UserTypeDto[]>>> {
        return axios.get(`${this.baseUrl}usertypes`);
    }

    async createUser(request: CreateUserRequest): Promise<AxiosResponse<Response<object>>> {
        return axios.post(`${this.baseUrl}users/create`, request);
    }

    async signIn(request: SignInRequest): Promise<AxiosResponse<Response<object>>> {
        return axios.post(`${this.baseUrl}users/signin`, request);
    }

    async verify(request: VerifyRequest): Promise<AxiosResponse<Response<object>>> {
        return axios.post(`${this.baseUrl}users/veryify`, request);
    }
}