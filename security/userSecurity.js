import bcrypt from 'bcrypt';
import AuthFailedError from '../errors/authFailedError.js';


//handles security functions
export default class UserSecurity {
    //encrypt password before placing in database
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    //checks whether an encrypted password matches a plaintext password
    static async comparePassword(pass1, pass2) {
        if (await bcrypt.compare(pass1, pass2)) {
            return true
        }
        else {
            throw AuthFailedError.invalidCredentialsError();
        }
    }

    //checks whether a user from the database exists
    static userExists(user) {
        if (user === undefined || user === null || user === [] || user.Username === undefined || user.Username === null || user.Password === undefined || user.Password === null) {
            throw AuthFailedError.userNotFoundError();
        }
        else {
            return true;
        }
    }
}
