//class that holds all failed validation errors
export default class ValidationFailedError extends Error{

    static passwordShortError() {
        this.code = 401;
        this.errorType = 'PASSWORD_SHORT';
        this.message = 'Password must be at least 8 characters long';
        return this;
    }

    static usernameShortError() {
        this.code = 401;
        this.errorType = 'USERNAME_SHORT';
        this.message = 'Username must be at least 4 characters long';
        return this;
    }

    static usernameNotFoundError() {
        this.isValid = false;
        this.errorType = 'USERNAME_NOT_FOUND';
        this.message = 'No username input';
        return this;
    }

    static passwordNotFoundError() {
        this.isValid = false;
        this.errorType = 'PASSWORD_NOT_FOUND';
        this.message = 'No password input';
        return this;
    }

    static noInfoError() {
        this.code = 401;
        this.errorType = 'NO_USER_INFO';
        this.message = 'No user input';
        return this;
    }

    static noSpecialCharError() {
        this.isValid = false;
        this.errorType = 'NO_SPECIAL_CHAR';
        this.message = 'Password must have a special character';
        return this;
    }

    static noCapitalLetterError() {
        this.isValid = false;
        this.errorType = 'NO_CAPITAL_LETTER';
        this.message = 'Password must have a capital letter';
        return this;
    }

    static noLowerCaseLetterError() {
        this.isValid = false;
        this.errorType = 'NO_LOWERCASE_LETTER';
        this.message = 'Password must have a lowercase letter';
        return this;
    }

    static noNumberError() {
        this.isValid = false;
        this.errorType = 'NO_NUMBER';
        this.message = 'Password must have a number';
        return this;
    }
}