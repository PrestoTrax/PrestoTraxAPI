import bcrypt from "bcrypt";
class UserAuth{

    async encryptPassword(password){
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    
}

export default UserAuth;