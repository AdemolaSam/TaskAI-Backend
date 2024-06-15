export class AppError extends Error{
    constructor(message){
        super(message)
        this.name = 'AppError'
    }
}

export class NotFoundError extends Error{
    constructor(message) {
        super(message, obj)
        this.name = "NotFoundError"
        this.obj = obj
    }
}
