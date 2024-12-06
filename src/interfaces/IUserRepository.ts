import type { CreateUserRequest } from "@/models/requests/CreateUserRequest"
import type { SignInRequest } from "@/models/requests/SignInRequest"
import type { VerifyRequest } from "@/models/requests/VerifyRequest"
import type { UserTypeDto } from "@/models/responses/UserTypeDto"
import type { Response } from "@/models/Response"
import type { AxiosResponse } from 'axios';
import type { UserDto } from "@/models/responses/UserDto"
import type { CreateUserDto } from "@/models/responses/CreateUserDto"

export interface IUserRepository { 
    getUserTypes(): Promise<AxiosResponse<Response<UserTypeDto[]>>>
    createUser(request: CreateUserRequest): Promise<AxiosResponse<Response<CreateUserDto>>>
    signIn(request: SignInRequest): Promise<AxiosResponse<Response<object>>>
    verify(request: VerifyRequest): Promise<AxiosResponse<Response<UserDto>>>
    uploadCv(userId: number, file: any): Promise<AxiosResponse<Response<object>>>
}