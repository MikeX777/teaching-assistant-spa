import type { CourseApplicationRequest } from "./CourseApplicationRequest";

export class SubmitApplicaitonRequest {
    public userId!: number;
    public termId!: number;
    public year!: number;
    public previousTA!: boolean;
    // public courses!: CourseApplicationRequest[];
}

