const helperMethods = require('./helper_methods');
const fs = require('fs');
const { Connection, Request } = require('tedious');

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

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (!!err) {
        console.log('There was an error connecting to the database.');
    }
});

const helper = new helperMethods();

connection.connect();

class usersDAO {
    async getAll() {
        return await new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT * FROM presto1.users`,
                (err, rowcount, rows) => {
                    if (!!err) {
                        return reject({ code: 500, message: err.message });
                    } else {
                        return resolve({ code: 200, queryResult: resultset });
                    }
                }
            );
            let resultset = [];
            request.on('row', (columns) => {
                resultset.push(helper.getRow(columns));
            });
            connection.execSql(request);
        }).catch((err) => err);
    }

    async getOne(id) {
        return await new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT * FROM presto1.users WHERE Id = ${id}`,
                (err, rowcount, rows) => {
                    if (!!err) {
                        return reject({ code: 500, message: err.message });
                    } else {
                        return resolve({ code: 200, queryResult: resultset });
                    }
                }
            );
            let resultset = [];
            request.on('row', (columns) => {
                resultset.push(helper.getRow(columns));
            });
            connection.execSql(request);
        }).catch((err) => err);
    }

    async create(body) {
        return await new Promise((resolve, reject) => {
            const request = new Request(
                `INSERT INTO presto1.users (username, email, password) VALUES ('${body.username}', '${body.email}', '${body.password}')`,
                (err, rowCount) => {
                    if (err) {
                        reject({ code: 500, message: err.message });
                        console.error(err.message);
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                        resolve({
                            code: 201,
                            message: 'A new device was added to the database',
                        });
                    }
                }
            );
            connection.execSql(request);
        }).catch((err) => err);
    }

    async update(body, id) {
        return await new Promise((resolve, reject) => {
            const request = new Request(
                `UPDATE user SET username='${body.username}', email='${body.email}', password='${body.password}' WHERE ID='${id}'`,
                (err, rowCount, rows) => {
                    if (!!err) {
                        console.log(err.message);
                        console.log(err.code);
                        reject({ code: 500, message: err.message });
                    } else {
                        console.log('Successful query.');
                        resolve({ code: 200, message: 'Update successful.' });
                    }
                }
            );
            connection.execSql(request);
        }).catch((err) => err); 
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const request = new Request(`DELETE FROM user WHERE ID='${id}'`,(err, rowCount, rows) => {
                if (!!err) {
                    console.log(err);
                    reject({ code: 500, message: err.message });
                } else if (result.changedRows === 0) {
                    reject({ code: 404, message: 'No user with that ID.' });
                } else {
                    console.log('Deletion Successful');
                    console.log(result);
                    resolve({ code: 204, message: 'Deletion successful.' });
                }
            });
            connection.execSql(request);    
        }).catch((err) => err);
    }
}

module.exports = usersDAO;
