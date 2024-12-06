import type { ICourseRepository } from "@/interfaces/ICourseRepository";
import type { Response } from "@/models/Response";
import type { CourseDto } from "@/models/responses/CourseDto";
import type { GradeDto } from "@/models/responses/GradeDto";
import axios, { type AxiosResponse } from 'axios';

export class CoureRepository implements ICourseRepository {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getCourses(): Promise<AxiosResponse<Response<CourseDto[]>>> {
        return axios.get(`${this.baseUrl}courses`);
    }

    async getGrades(): Promise<AxiosResponse<Response<GradeDto[]>>> {
        return axios.get(`${this.baseUrl}courses/grades`);
    }
}