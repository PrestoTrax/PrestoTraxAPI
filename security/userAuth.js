import bcrypt from "bcrypt";
class UserAuth{

    async encryptPassword(password){
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    async comparePassword(pass1, pass2){
        return await bcrypt.compare(pass1, pass2);
    }
}

export default UserAuth;