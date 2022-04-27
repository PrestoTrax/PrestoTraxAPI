//const fs = require('fs');
import { connection } from './DAOConfig.js';

import UserValidation from '../security/userValidation.js';
import UserSecurity from '../security/userSecurity.js';

//const helper = new HelperMethods();

class usersDAO {
    async getAll() {
        let resultObj;
        try {
            const result = await connection.query`SELECT * FROM presto1.users`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async authenticate(user) {
        let resultObj;
        try {
            const userResult = await this.getOneByUsername(user.username);
            const dbUser = userResult.queryResult[0];

            UserSecurity.userExists(dbUser);

            await UserSecurity.comparePassword(user.password, dbUser.Password);

            resultObj = {
                code: 200,
                message: 'Successfully authenticated user',
                uuid: dbUser.Id,
            };
        } catch (err) {
            if (err.name === 'AuthFailedError') {
                resultObj = {
                    code: err.code,
                    errorType: err.errorType,
                    message: err.message,
                };
            } else {
                resultObj = { code: 500, message: err.message };
            }
        } finally {
            return resultObj;
        }
    }

    async getOne(id) {
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM presto1.users WHERE Id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async getOneByUsername(username) {
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM presto1.users WHERE Username = ${username}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    //
    async create(body) {
        let resultObj;
        try {
            //validate the new user's information and throws an error if it does not follow given standards
            UserValidation.validateUserInfo(body);

            //console.log('here')
            body.password = await UserSecurity.encryptPassword(body.password);
            //console.log('here')
            await connection.query`IF NOT EXISTS(SELECT 1 FROM presto1.users WHERE Username = ${body.username}) 
            BEGIN 
                    INSERT INTO presto1.users 
                    (Username, Email, Password) 
                    VALUES (${body.username},${body.email},${body.password}) 
            END`;
            //UserValidation.validateUserInfo(result.recordsets[0]);
            resultObj = { code: 201, message: 'Successfully added user to DB' };
        } catch (err) {
            if (err.name === 'ValidationFailedError') {
                resultObj = {
                    code: err.code,
                    errorType: err.errorType,
                    message: err.message,
                };
            } else {
                resultObj = { code: 500, message: err.message };
            }
        } finally {
            return resultObj;
        }
    }

    async update(body, id) {
        let resultObj;
        try {
            await connection.query`UPDATE presto1.users SET Username = ${body.username}, Email = ${body.email}, Password = ${body.password} WHERE Id = ${id}`;
            resultObj = {
                code: 201,
                message: 'Successfully updated user within DB',
            };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async delete(id) {
        let resultObj;
        try {
            await connection.query`DELETE FROM presto1.users WHERE Id = ${id}`;
            resultObj = { code: 204, message: 'Deleted user from DB' };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }
}

export default usersDAO;
