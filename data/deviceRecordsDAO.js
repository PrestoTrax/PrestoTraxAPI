// const mysql = require('mysql');
import HelperMethods from './helperMethods.js';
//const fs = require('fs');
import mssql from 'mssql';

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


const helper = new HelperMethods();

class deviceRecordsDAO {
    async connect() {
        await mssql.connect(config);
    }
    async getAll() {
        let resultObj;
        try {
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.device_records`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
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
            const result = await mssql.query`SELECT * FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async getAllOwnedBy(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.device_records WHERE OwnerId = ${id}`;
            resultObj = {code: 200, queryResult: result.recordsets[0]};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async getAllDeviceRecords(id) {
        let resultObj;
        try{
            await this.connect();
            const result = await mssql.query`SELECT * FROM presto1.device_records WHERE ParentDevice = ${id}`;
            resultObj = {code:200, queryResult: result.recordsets[0]};
        } catch(err) {
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
            let location = helper.getLocation(body.location);
            await mssql.query`INSERT INTO presto1.device_records (ParentDevice, OwnerId, ReportedLost, DeviceLatitude, DeviceLongitude) VALUES (${body.parent_device}, ${body.owner_id}, ${body.reported_lost}, ${location.latitude},${location.longitude})`;
            resultObj = {code: 201, message: 'Successfully added device record to DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }

    async delete(id) {
        let resultObj;
        try{
            await this.connect();
            await mssql.query`DELETE FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = {code: 204, message: 'Successfully removed device record from DB'};
        } catch (err) {
            resultObj = {code: 500, message: err.message};
        } finally {
            await mssql.close();
            return resultObj;
        }
    }
}

export default deviceRecordsDAO;
