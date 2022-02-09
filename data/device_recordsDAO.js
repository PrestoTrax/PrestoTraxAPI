const mysql = require('mysql');
const locParser = require('./locationParser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prestotrax',
});

connection.connect((err) => {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

let locationParser = new locParser();

let query = '';

class device_recordsDAO {
    getAll() {
        return new Promise((resolve, reject) => {
            query = 'SELECT * FROM device_records';
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

    getOne(id) {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM device_records WHERE id = '${id}'`;
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, err });
                } else if (Object.keys(result).length === 0) {
                    reject({
                        code: 404,
                        message: 'No device records with that ID',
                    });
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
            query = `INSERT INTO device_records (owner_id, reported_lost, device_latitude, device_longitude, device_id) VALUES ('${body.owner_id}','${body.reported_lost}', '${location.latitude}', '${location.longitude}', '${body.device_id}')`;
            connection.query(query, (err) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, message: err.message });
                } else {
                    console.log('Added device record to DB.');
                    resolve({
                        code: 201,
                        message: 'Successfully added device_record to database',
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
            query = `UPDATE device_records SET username='${body.username}', email='${body.email}', password='${body.password}' WHERE ID='${id}'`;
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
            query = `DELETE FROM device_records WHERE ID='${id}'`;
            connection.query(query, (err, result) => {
                if (!!err) {
                    console.log(err);
                    reject({ code: 500, message: err.message });
                } else if (result.changedRows === 0) {
                    reject({
                        code: 404,
                        message: 'No device records with that ID.',
                    });
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

module.exports = device_recordsDAO;
