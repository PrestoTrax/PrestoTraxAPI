import ValidationFailedError from '../errors/validationFailedError.js';

//handles user data validation for new users
class UserValidation {
    //validate that a user's information is acceptable upon registration
    static validateUserInfo(user) {
        let resultObj = {
            isValid: true,
            errorType: null,
            message: 'User information is valid',
        };

        //if no information is provided when attempting to register, throw an error
        if (user == undefined || user == null || user === {} || user === [] || (user.username == undefined && user.password == undefined && user.email == undefined)) {
            //console.log('no info');
            throw ValidationFailedError.noInfoError();
        }

        //if a username is not provided, throw an error
        if (user.username == undefined || user.username == '') {
            //console.log('no username');
            throw ValidationFailedError.usernameNotFoundError();
        }

        //if a password is not provided, throw an error
        if (user.password == undefined || user.password == '') {
            //console.log('no password');
            throw ValidationFailedError.passwordNotFoundError();
        }

        //if a password is too short, throw an error
        if (user.password.length < 8) {
            //console.log('password too short');
            throw ValidationFailedError.passwordShortError();
        }

        //if a username is too short, throw an error
        if (user.username.length < 4) {
            //console.log('username too short');
            throw ValidationFailedError.usernameShortError();
        }

        //if a password does not have a special character, throw an error
        if(!this.hasSpecialChar(user.password)){
            //console.log('no special char');
            throw ValidationFailedError.noSpecialCharError();
        }

        //if a password does not have a capital letter, throw an error
        if(!this.hasCapitalLetter(user.password)){
            //console.log('no capital letter');
            throw ValidationFailedError.noCapitalLetterError();
        }

        //if a password does not have a lowercase letter, throw an error
        if(!this.hasLowerCaseLetter(user.password)){
            //console.log('no lower case letter');
            throw ValidationFailedError.noLowerCaseLetterError();
        }

        //if a password does not have a number, throw an error
        if(!this.hasNumber(user.password)){
            //console.log('no number');
            throw ValidationFailedError.noNumberError(resultObj);
        }
    }

    //ensure that a user's password has a special character
    static hasSpecialChar(password) {
        let specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        for (let i = 0; i < password.length; i++) {
            if (specialChars.indexOf(password.charAt(i)) > -1) {
                return true;
            }
        }
        return false;
    }

    //ensure that a user's password has a capital letter
    static hasCapitalLetter(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) == password.charAt(i).toUpperCase() && password.charAt(i) != password.charAt(i).toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    //ensure that a user's password has a lowercase letter
    static hasLowerCaseLetter(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) == password.charAt(i).toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    //ensure that a user's password has a number
    static hasNumber(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
                return true;
            }
        }
        return false;
    }

    
}

export default UserValidation;
