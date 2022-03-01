// const mysql = require('mysql');
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

class device_infoDAO {
    async getAll() {
        return await new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT * FROM presto1.device_info`,
                (err, rowCount, rows) => {
                    if (err) {
                        reject({ code: 500, message: err.message });
                        console.error(err.message);
                    } else {
                        //console.log(rows);
                        resolve({
                            code: 200,
                            queryResult: resultset,
                        });
                        console.log(`${rowCount} row(s) returned`);
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
                `SELECT * FROM presto1.device_info WHERE Id = ${id}`,
                (err, rowCount) => {
                    if (err) {
                        reject({ code: 500, message: err.message });
                        console.error(err.message);
                    } else {
                        resolve({ code: 200, queryResult: resultset });
                        console.log(`${rowCount} row(s) returned`);
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

    async getAllOwnedBy(id){
        return await new Promise((resolve, reject) => {
            const request = new Request(`SELECT * FROM presto1.device_info WHERE OwnerId = '${id}'`, (err) => {
                if(!!err){
                    reject({code: 500, message: err.message});
                }
                else
                {
                    resolve({code: 200, queryResult: resultset})
                }
            });
            let resultset = [];
            request.on('row', (columns) => {
                resultset.push(helper.getRow(columns));
            });
            connection.execSql(request);
        }).catch((err) => err);
    }

    async create(body) {
        return await new Promise((resolve, reject) => {
            let location = helper.getLocation(body.location);
            console.log(location);
            const request = new Request(
                `INSERT INTO presto1.device_info (OwnerId, DeviceLatitude, DeviceLongitude, Moving) VALUES ('${body.owner_id}', '${location.latitude}', '${location.longitude}', '${body.moving}')`,
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
            let location = helper.getLocation(body.location);
            const request = new Request(
                `UPDATE presto1.device_info SET device_latitude='${
                    location.latitude
                }', device_longitude='${
                    location.longitude
                }', pinged_at='${Date.now()}', moving=${
                    body.moving
                } WHERE ID='${id}'`,
                (err, rowCount) => {
                    if (err) {
                        console.error(err.message);
                        reject({ code: 500, message: err.message });
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                        resolve({
                            code: 204,
                            message: 'Device successfully updated.',
                        });
                    }
                }
            );
            connection.execSql(request);
        }).catch((err) => err);
    }

    async delete(id) {
        return await new Promise((resolve, reject) => {
            const request = new Request(`DELETE FROM presto1.device_info WHERE Id = ${id}`, (err, rowCount) => {
                if (err) {
                    console.error(err.message);
                    reject({ code: 500, message: err.message });
                } else {
                    console.log(`${rowCount} row(s) returned`);
                    resolve({
                        code: 200,
                        message: 'Device successfully deleted.',
                    });
                }
            });
            connection.execSql(request);
        }).catch((err) => err);
    }
}

module.exports = device_infoDAO;
