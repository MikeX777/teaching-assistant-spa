export class Response<T> {
    public success!: boolean
    public message: string | undefined
    public data!: T
}