// const mysql = require('mysql');
//import HelperMethods from './helperMethods.js';
//const fs = require('fs');
import mssql from 'mssql';

import DataValidation from '../security/dataValidation.js';

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

const pool = new mssql.ConnectionPool(config);
//const helper = new HelperMethods();

class deviceRecordsDAO {
    
    async connect() {
        await pool.connect();
    }

    async getAll() {
        let resultObj;
        try {
            await this.connect();
            const result = await pool.query`SELECT * FROM presto1.device_records`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async getOne(id) {
        let resultObj;
        try {
            await this.connect();
            const result = await pool.query`SELECT * FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async getRecentLocation(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await pool.query`SELECT TOP 1 * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async getRelevantOwnedBy(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await pool.query`SELECT TOP 20 * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            DataValidation.isEmpty(result.recordsets[0]);
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            if(err.name === 'DataError'){
                console.log(err);
                resultObj = {code: err.code, errorType: err.errorType, message: err.message};
            }
            else{
                resultObj = {code: 500, message: err.message};
            }
        } finally {
            //await mssql.close();
            console.log(resultObj);
            return resultObj;
        }
    }

    async getAllOwnedBy(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await pool.query`SELECT * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async getAllDeviceRecords(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await pool.query`SELECT * FROM presto1.device_records WHERE ParentDevice = ${id}`;
            resultObj = {code:200, queryResult: result.recordsets[0]};
        } catch(err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async create(body) {
        let resultObj;
        try {
            await this.connect();
            let location = body.location;
            console.log(location);
            await pool.query`INSERT INTO presto1.device_records (ParentDevice, OwnerId, ReportedLost, DeviceLatitude, DeviceLongitude) VALUES (${body.parent_device}, ${body.owner_id}, ${body.reported_lost}, ${location.latitude+''},${location.longitude+''})`;
            resultObj = {code: 201, message: 'Successfully added device record to DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    async delete(id) {
        let resultObj;
        try{
            await this.connect();
            await pool.query`DELETE FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = {code: 204, message: 'Successfully removed device record from DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }
}

export default deviceRecordsDAO;
