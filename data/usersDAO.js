const mysql = require('mysql');
//const helperMethods = require('./helper_methods');
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

//const helper = new helperMethods();

let query = '';

class usersDAO {
    getAll() {
        return new Promise((resolve, reject) => {
            query = 'SELECT * FROM user';
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({code: 500, message: err.message});
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
            query = `SELECT * FROM user WHERE id = '${id}'`;
            connection.query(query, (err, result, fields) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({ code: 500, err });
                } else if (Object.keys(result).length === 0) {
                    reject({ code: 404, message: 'No user with that ID' });
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
            query = `INSERT INTO user (username, email, password) VALUES ('${body.username}', '${body.email}', '${body.password}')`;
            connection.query(query, (err) => {
                if (!!err) {
                    console.log(err.code);
                    console.log(err.message);
                    reject({code: 500, message: err.message});
                } else {
                    console.log('Added user to DB.');
                    resolve({code: 201, message: 'Successfully added user to database'});
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
            query = `UPDATE user SET username='${body.username}', email='${body.email}', password='${body.password}' WHERE ID='${id}'`;
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
            query = `DELETE FROM user WHERE ID='${id}'`;
            connection.query(query, (err, result) => {
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
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    }
}

module.exports = usersDAO;
