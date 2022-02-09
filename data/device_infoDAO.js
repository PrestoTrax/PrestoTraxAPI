const mysql = require('mysql');
const locParse = require('./locationParser');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prestotrax',
});

connection.connect((err) => {
    if (!!err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});
const locationParser = new locParse();

let query = '';

class device_infoDAO {
    getAll() {
        return new Promise((resolve, reject) => {
            query = 'SELECT * FROM device_info';
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, message: err.message });
                }
                console.log('Getting info from DB.');
                resolve({ code: 200, result });
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }

    async getOne(id) {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM device_info WHERE id = '${id}'`;
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, err });
                } else if (Object.keys(result).length === 0) {
                    reject({ code: 404, message: 'No device with that ID' });
                } else {
                    console.log(result);
                    resolve({ code: 200, result });
                }
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }

    getAllOwnedBy(id){
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM device_info WHERE owner_id = '${id}'`;
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, err });
                } else if (Object.keys(result).length === 0) {
                    reject({ code: 404, message: 'No device with that ID' });
                } else {
                    console.log(result);
                    resolve({ code: 200, result });
                }
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
        });
    }

    create(body) {
        return new Promise((resolve, reject) => {
            let location = locationParser.getLocation(body.location);
            console.log(location);
            
            query = `INSERT INTO device_info (owner_id, device_latitude, device_longitude, moving) VALUES ('${body.owner_id}', '${location.latitude}', '${location.longitude}', '${body.moving}')`;
            connection.query(query, (err) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, message: err.message });
                } else {
                    console.log('Added device to DB.');
                    resolve({
                        code: 201,
                        message: 'Successfully added device to database',
                    });
                }
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }

    update(body, id) {
        return new Promise((resolve, reject) => {
            query = `UPDATE device_info SET device_latitude='${body.location.latitude}', device_longitude='${body.location.longitude}', pinged_at='${Date.now()}', moving=${body.moving} WHERE ID='${id}'`;
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.message);
                    console.log(err.code);
                    reject({ code: 500, message: err.message });
                } else {
                    console.log('Successful query.');
                    resolve({ code: 200, message: 'Update successful.' });
                }
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            query = `DELETE FROM device_info WHERE ID='${id}'`;
            connection.query(query, (err, result) => {
                if (!!err) {
                    console.log(err);
                    reject({ code: 500, message: err.message });
                } else if (result.changedRows === 0) {
                    reject({ code: 404, message: 'No device with that ID.' });
                } else {
                    console.log('Deletion Successful');
                    console.log(result);
                    resolve({ code: 204, message: 'Deletion successful.' });
                }
            });
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }
}

module.exports = device_infoDAO;
