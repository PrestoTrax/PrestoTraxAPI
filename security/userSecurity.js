import bcrypt from 'bcrypt';
import AuthFailedError from '../errors/authFailedError.js';

/** @module security/UserSecurity */

/** 
 * A class that contains methods that aid with information security 
 * @class UserSecurity
 */
export default class UserSecurity {

    /**
     * Encrypts a user's password
     * @static
     * @async
     * @function encryptPassword
     * @param {string} password - a user's password to be encrypted
     * @returns {string} - the encrypted password
     */
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    /**
     * Checks whether a user's password is correct
     * @static
     * @async
     * @function comparePassword
     * @param {string} pass1 the password the user input to be compared
     * @param {string} pass2 the encrypted password from the database
     * @returns {boolean} whether the passwords match
     * @summary compares an input password to the encrypted password from the database. Throws an error if the passwords do not match.
     */
    static async comparePassword(pass1, pass2) {
        if (await bcrypt.compare(pass1, pass2)) {
            return true
        }
        else {
            throw AuthFailedError.invalidCredentialsError();
        }
    }

    /**
     * Sees whether a user retrieved from the database exists.
     * @static
     * @function userExists
     * @param {Object} user 
     * @returns {boolean} whether the user exists
     * @summary If a user is not found, an error is thrown. Otherwise, nothing happens.
     */
    static userExists(user) {
        if (user === undefined || user === null || user === [] || user.Username === undefined || user.Username === null || user.Password === undefined || user.Password === null) {
            throw AuthFailedError.invalidCredentialsError();
        }
        else {
            return true;
        }
    }
}
