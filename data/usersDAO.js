//const fs = require('fs');
import mssql from 'mssql';

import UserAuth from '../security/userAuth.js';

const userAuth = new UserAuth();

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
            console.log(dbUser);
            await this.connect();
            const isValid = await userAuth.comparePassword(user.password, dbUser.Password);
            if(isValid){
                resultObj = {code: 200, message: 'Successfully authenticated user'};
            }
            else{
                resultObj = {code: 401, message: 'Invalid username or password'};
            }
        } catch (err) {
            resultObj = {code: 500, message: err.message};
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

    async create(body) {
        let resultObj;
        try {
            await this.connect();
            body.password = await userAuth.encryptPassword(body.password);
            await mssql.query`INSERT INTO presto1.users (Username, Email, Password) VALUES (${body.username},${body.email},${body.password})`;
            resultObj = {code: 201, message: 'Successfully added user to DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
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
