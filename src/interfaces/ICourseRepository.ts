import type { Response } from "@/models/Response";
import type { CourseDto } from "@/models/responses/CourseDto"
import type { GradeDto } from "@/models/responses/GradeDto"
import axios, { type AxiosResponse } from 'axios';

export interface ICourseRepository {
    getCourses(): Promise<AxiosResponse<Response<CourseDto[]>>>
    getGrades(): Promise<AxiosResponse<Response<GradeDto[]>>>
}