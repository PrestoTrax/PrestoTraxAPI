import bcrypt from 'bcrypt';
export default class UserSecurity {
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    //ensures that a user with the same username does not already exist in the database
}