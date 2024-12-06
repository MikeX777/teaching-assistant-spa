import type { CreateUserRequest } from "@/models/requests/CreateUserRequest"
import type { SignInRequest } from "@/models/requests/SignInRequest"
import type { VerifyRequest } from "@/models/requests/VerifyRequest"
import type { UserTypeDto } from "@/models/responses/UserTypeDto"
import type { Response } from "@/models/Response"
import type { AxiosResponse } from 'axios';
import type { UserDto } from "@/models/responses/UserDto"

export interface IUserRepository { 
    getUserTypes(): Promise<AxiosResponse<Response<UserTypeDto[]>>>
    createUser(request: CreateUserRequest): Promise<AxiosResponse<Response<object>>>
    signIn(request: SignInRequest): Promise<AxiosResponse<Response<object>>>
    verify(request: VerifyRequest): Promise<AxiosResponse<Response<UserDto>>>
}