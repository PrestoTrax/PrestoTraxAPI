import bcrypt from 'bcrypt';
class UserAuth {
    

    //check if the user's password is correct
    static async comparePassword(pass1, pass2) {
        return await bcrypt.compare(pass1, pass2);
    }

    //validate that a user's information is acceptable upon registration
    static validateUserInfo(user) {
        let resultObj = {
            isValid: true,
            errorType: null,
            message: 'User information is valid',
        };
        if (user == undefined || user == null || user === {} || (user.username == undefined && user.password == undefined && user.email == undefined)) {
            return this.noInfoError(resultObj);
        }
        if (user.username == undefined || user.username == '') {
            return this.usernameNotFoundError(resultObj);
        }
        if (user.password == undefined || user.password == '') {
            return this.passwordNotFoundError(resultObj);
        }
        if (user.password.length < 8) {
            return this.passwordShortError(resultObj);
        }
        if (user.username.length < 8) {
            return this.usernameShortError(resultObj);
        }
        if(!this.hasSpecialChar(user.password)){
            return this.noSpecialCharError(resultObj);
        }
        if(!this.hasCapitalLetter(user.password)){
            return this.noCapitalLetterError(resultObj);
        }
        if(!this.hasLowerCaseLetter(user.password)){
            return this.noLowerCaseLetterError(resultObj);
        }
        if(!this.hasNumber(user.password)){
            return this.noNumberError(resultObj);
        }

        return resultObj;
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

    //validate that a user's information is acceptable upon login

    //return a result object with an error message if the password is too short
    static passwordShortError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'PASSWORD_SHORT';
        resultObj.message = 'Password must be at least 8 characters long';
        return resultObj;
    }

    //return a result object with an error message if the username is too short
    static usernameShortError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'USERNAME_SHORT';
        resultObj.message = 'Username must be at least 8 characters long';
        return resultObj;
    }

    //returns a result object with an error message if the username is not input
    static usernameNotFoundError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'USERNAME_NOT_FOUND';
        resultObj.message = 'No username input';
        return resultObj;
    }

    //returns a result object with an error message if the password is not input
    static passwordNotFoundError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'PASSWORD_NOT_FOUND';
        resultObj.message = 'No password input';
        return resultObj;
    }

    //returns a result object with an error message if there is no information input
    static noInfoError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'NO_USER_INFO';
        resultObj.message = 'No user input';
        return resultObj;
    }

    //returns a result object with an error message if the password does not have a special character
    static noSpecialCharError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'NO_SPECIAL_CHAR';
        resultObj.message = 'Password must have a special character';
        return resultObj;
    }

    //returns a result object with an error message if the password does not have a capital letter
    static noCapitalLetterError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'NO_CAPITAL_LETTER';
        resultObj.message = 'Password must have a capital letter';
        return resultObj;
    }

    //returns a result object with an error message if the password does not have a lowercase letter
    static noLowerCaseLetterError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'NO_LOWER_CASE_LETTER';
        resultObj.message = 'Password must have a lowercase letter';
        return resultObj;
    }

    //returns a result object with an error message if the password does not have a number
    static noNumberError(resultObj) {
        resultObj.isValid = false;
        resultObj.errorType = 'NO_NUMBER';
        resultObj.message = 'Password must have a number';
        return resultObj;
    }

}

export default UserAuth;
