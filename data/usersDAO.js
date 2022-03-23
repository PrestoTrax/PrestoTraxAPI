//const fs = require('fs');
import mssql from 'mssql';

import UserAuth from '../security/userAuth.js';
import UserSecurity from '../security/userSecurity.js';
import AuthFailedError from '../errors/authFailedError.js';

const config = {
    authentication: {
        options: {
            userName: 'ptadmin77',
            password: '@dm1npr3stO13579',
        },
        type: 'default',
    },
    server: 'prestotrax.database.windows.net',
    options: {
        database: 'presto1',
        encrypt: true,
        trustServerCertificate: true,
    },
};

//const helper = new HelperMethods();
 
class usersDAO {
    async connect() {
        await mssql.connect(config);
    }
    async getAll() {
        let resultObj;
        try {
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.users`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async authenticate(user) {
        let resultObj;
        try {
            const userResult = await this.getOneByUsername(user.username);
            const dbUser = userResult.queryResult[0];
            if (dbUser.Username === undefined){
                throw new AuthFailedError(401, 'USER_NOT_FOUND', 'User not found');
            }
            //console.log(dbUser);
            await this.connect();
            const isValid = await UserAuth.comparePassword(user.password, dbUser.Password);
            if(isValid){
                console.log('success');
                resultObj = {code: 200, message: 'Successfully authenticated user'};
            }
            else{
                throw new AuthFailedError(401, 'INVALID_CREDENTIALS', 'Invalid username or password');
            }
        } catch (err) {
            if(err.name === 'AuthFailedError'){
                resultObj = {code: 401, errorType: err.errorType, message: err.message};
            }
            else{
                console.log(err);
                resultObj = {code: 500, message: err.message};
            }
        } finally {
            await mssql.close();
            return resultObj;
        }
    }


    async getOne(id) {
        let resultObj;
        try {
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.users WHERE Id = ${id}`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        };
    }

    async getOneByUsername(username) {
        let resultObj;
        try {
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.users WHERE Username = ${username}`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    //
    async create(body) {
        let resultObj;
        try {
            let validationObj = await UserAuth.validateUserInfo(body);
            if(!validationObj.isValid){
                throw new AuthFailedError(401, validationObj.errorType, validationObj.message);
            }
            await this.connect();
            body.password = await UserSecurity.encryptPassword(body.password);
            const result = await mssql.query`IF NOT EXISTS(SELECT 1 FROM presto1.users WHERE Username = ${body.username}) 
            BEGIN 
                    INSERT INTO presto1.users 
                    (Username, Email, Password) 
                    VALUES (${body.username},${body.email},${body.password}) 
            END`;
            if(result.rowsAffected == 0){
                console.log('User already exists');
                throw new AuthFailedError(401, 'USER_EXISTS', 'User already exists with that username');
            }
            resultObj = {code: 201, message: 'Successfully added user to DB'};
        } 
        catch (err) {
            if(err.name === 'AuthFailedError'){
                resultObj = {code: 401, errorType: err.errorType, message: err.message};
            }
            else{
                resultObj = {code: 500, message: err.message};
            }
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async update(body, id) {
        let resultObj;
        try {
            await this.connect();
            await mssql.query`UPDATE presto1.users SET Username = ${body.username}, Email = ${body.email}, Password = ${body.password} WHERE Id = ${id}`;
            resultObj = {code: 201, message: 'Successfully updated user within DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async delete(id) {
        let resultObj;
        try {
            await this.connect();
            await mssql.query`DELETE FROM presto1.users WHERE Id = ${id}`;
            resultObj = {code: 204, message: 'Deleted user from DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }
}

export default usersDAO;
