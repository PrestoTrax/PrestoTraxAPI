
import bcrypt from 'bcrypt';
export default class UserSecurity {
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }
}