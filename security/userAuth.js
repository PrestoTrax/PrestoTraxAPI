import bcrypt from 'bcrypt';
class UserAuth {
    //encrypt a user's password information before storing it in the database
    

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
        return resultObj;
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
}

export default UserAuth;
