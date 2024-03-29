// const mysql = require('mysql');
//import HelperMethods from './helperMethods.js';
import fs from 'fs';
import { connection } from './DAOConfig.js';

/**Class used to perform CRUD operations on devices in a database */
class deviceInfoDAO {
    async getAll() {
        let resultObj;
        try { 
            const result =
                await connection.query`SELECT * FROM presto1.device_info`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async getOne(id) {
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM presto1.device_info WHERE Id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async getAllOwnedBy(id) {
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM presto1.device_info WHERE OwnerId = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async create(body) {
        let resultObj;
        try {
            let location = body.location;
            //console.log(location);
            await connection.query`INSERT INTO presto1.device_info (OwnerId, DeviceLatitude, DeviceLongitude, Moving) VALUES (${body.owner_id},${location.latitude},${location.longitude}, ${body.moving})`;
            resultObj = {
                code: 201,
                message: 'Successfully added device to DB',
            };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    async update(body, id) {
        let resultObj;
        try {
            let location = body.location;
            await connection.query`UPDATE presto1.device_info SET DeviceLatitude = ${location.latitude}, DeviceLongitude = ${location.longitude}, PingedAt = GETDATE(), Moving = ${body.Moving} WHERE Id = ${id}`;
            resultObj = {
                code: 201,
                message: 'Successfully updated device within DB',
            };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
            console.log(resultObj);
        } finally {
            return resultObj;
        }
    }

    async delete(id) {
        let resultObj;
        try {
            await connection.query`DELETE FROM presto1.device_info WHERE Id = ${id}`;
            resultObj = { code: 204, message: 'Deleted device from DB' };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }
}

export default deviceInfoDAO;
