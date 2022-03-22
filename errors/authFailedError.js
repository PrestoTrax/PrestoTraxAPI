export default class AuthFailedError extends Error{
    constructor(code, errorType, message){
        super(message);
        this.name = 'AuthFailedError';
        this.code = code;
        this.errorType = errorType;
    }
}