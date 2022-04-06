import 'dotenv/config';
import mssql from 'mssql';

/**
 * @module data/DAOConfig
 */
export let config = {
    authentication: {
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        type: 'default',
    },
    server: process.env.DB_SERVER,
    options: {
        database: process.env.DB_NAME,
        encrypt: true,
        trustServerCertificate: true,
    },
};

let pool = new mssql.ConnectionPool(config);

export const connection = await pool.connect();
