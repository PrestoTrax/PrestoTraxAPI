export default class AuthFailedError extends Error{
    static userNotFoundError() {
        this.code = 401;
        this.errorType = 'USER_NOT_FOUND';
        this.message = 'User not found';
        return this;
    }
    static invalidCredentialsError() {
        this.code = 401;
        this.errorType = 'INVALID_CREDENTIALS';
        this.message = 'Invalid username or password';
        return this;
    }
}