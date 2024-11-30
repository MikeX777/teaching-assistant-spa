import type { ApplicationStatusDto } from "./ApplicationStatusDto"
import type { TermDto } from "./TermDto"

export class ApplicationDto {
    public applicationId!: number
    public userId!: number
    public term!: TermDto
    public status!: ApplicationStatusDto
    public year!: number
    public previousTA!: boolean
    public instructorNotes!: string
}