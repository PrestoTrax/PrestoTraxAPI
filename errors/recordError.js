export default class recordError extends Error{
    static noUserError() {
        this.code = 400;
        this.errorType = 'NO_USER';
        this.message = 'No user exists with the given ID';
        return this;
    }
}