//const fs = require('fs');
import mssql from 'mssql';


import UserValidation from '../security/userValidation.js';
import UserSecurity from '../security/userSecurity.js';


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

            UserSecurity.userExists(dbUser);

            await this.connect();
            await UserSecurity.comparePassword(user.password, dbUser.Password);
            resultObj = {code: 200, message: 'Successfully authenticated user'};
        } catch (err) {
            if(err.name === 'AuthFailedError'){
                resultObj = {code: err.code, errorType: err.errorType, message: err.message};
            }
            else{
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
            //validate the new user's information and throws an error if it does not follow given standards
            UserValidation.validateUserInfo(body);
            await this.connect();
            //console.log('here')
            body.password = await UserSecurity.encryptPassword(body.password);
            //console.log('here')
            await mssql.query`IF NOT EXISTS(SELECT 1 FROM presto1.users WHERE Username = ${body.username}) 
            BEGIN 
                    INSERT INTO presto1.users 
                    (Username, Email, Password) 
                    VALUES (${body.username},${body.email},${body.password}) 
            END`;
            //UserValidation.validateUserInfo(result.recordsets[0]);
            resultObj = {code: 201, message: 'Successfully added user to DB'};
        } 
        catch (err) {
            if(err.name === 'ValidationFailedError'){
                resultObj = {code: err.code, errorType: err.errorType, message: err.message};
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
