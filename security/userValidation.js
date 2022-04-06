import ValidationFailedError from '../errors/validationFailedError.js';

/** @module security/UserValidation */

/**
 * A class that handles user data validation for new users
 * @class UserValidation
 */
export default class UserValidation {
    /**
     * Tests user input to ensure that it is valid
     * @static
     * @function validateUserInfo
     * @param {Object} user 
     * @summary If a user's information is not valid, an error is thrown. Otherwise, nothing happens.
     */
    static validateUserInfo(user) {

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
            throw ValidationFailedError.noNumberError();
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

    /**
     * Checks if a user's password has a capital letter
     * @function hasCapitalLetter
     * @param {string} password 
     * @returns a boolean indicating whether or not a password has a capital letter
     */
    static hasCapitalLetter(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) == password.charAt(i).toUpperCase() && password.charAt(i) != password.charAt(i).toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if a user's password has a lowercase letter
     * @function hasLowerCaseLetter
     * @param {string} password 
     * @returns a boolean indicating whether or not a password has a lowercase letter
     */
    static hasLowerCaseLetter(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) == password.charAt(i).toLowerCase() && password.charAt(i) != password.charAt(i).toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if a user's password has a number
     * @function hasNumber
     * @param {string} password 
     * @returns a boolean indicating whether or not a password has a number
     */
    static hasNumber(password) {
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
                return true;
            }
        }
        return false;
    }

    
}


