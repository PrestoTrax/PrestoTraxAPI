// const mysql = require('mysql');
//import HelperMethods from './helperMethods.js';
//const fs = require('fs');
import mssql from 'mssql';
import DataValidation from '../security/dataValidation.js';
import { connection } from './DAOConfig.js';

//const poolConn = new mssql.ConnectionPool(config);
//const helper = new HelperMethods();

/**Class used to perform CRUD operations on device records in a database
 * @class deviceRecordsDAO
 */
class deviceRecordsDAO {

    /**
     * gets all device records from the database
     * @async
     * @function getAll
     * @returns {Promise<Object>} - an object containing the response code and json response
     */
    async getAll() {
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM presto1.device_records`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            return resultObj;
        }
    }

    /**
     * Gets a specific record from the database
     * @async
     * @function getOne
     * @param {number} id - the id of the device record to return
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     */
    async getOne(id) {
        let resultObj;
        try {
            //await this.connect();
            const result =
                await connection.query`SELECT * FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    /**
     * Gets the most recent location of a user's device given the user ID
     * @async
     * @function getRecentLocation
     * @param {number} id - the id of the user who owns the device
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     * @todo - refactor to use device ID rather than user ID
     */
    async getRecentLocation(id) {
        let resultObj;
        try {
            //await this.connect();
            const result =
                await connection.query`SELECT TOP 1 * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    /**
     * get the first 20 device records owned by the user with the given id
     * @async
     * @function getRelevantOwnedBy
     * @param {number} id - the ID of the user who owns the device
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     * @todo - refactor to use device ID rather than user ID
     * @todo - change name of function after above refactoring
     */
    async getRelevantOwnedBy(id) {
        let resultObj;
        try {
            //await this.connect();
            const result =
                await connection.query`SELECT TOP 20 * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            DataValidation.isEmpty(result.recordsets[0]);
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            if (err.name === 'DataError') {
                console.log(err);
                resultObj = {
                    code: err.code,
                    errorType: err.errorType,
                    message: err.message,
                };
            } else {
                resultObj = { code: 500, message: err.message };
            }
        } finally {
            //await mssql.close();
            console.log(resultObj);
            return resultObj;
        }
    }

    /**
     * gets all device records owned by the user with the given id
     * @async
     * @function getAllOwnedBy
     * @param {number} id - the id of the user whose records are to be obtained
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     */
    async getAllOwnedBy(id) {
        let resultObj;
        try {
            //await this.connect();
            const result =
                await connection.query`SELECT * FROM presto1.device_records WHERE OwnerId = ${id} ORDER BY CreatedAt DESC`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    /**
     * gets all device records owned created by the device with the given id
     * @async
     * @function getAllDeviceRecords
     * @param {number} id - the id of the device whose records are to be obtained
     * @returns {Promise<Object>} - an object containing the response code and json response
     */
    async getAllDeviceRecords(id) {
        let resultObj;
        try {
            //await this.connect();
            const result =
                await connection.query`SELECT * FROM presto1.device_records WHERE ParentDevice = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    /**
     * Creates a new device record in the database
     * @async
     * @function create
     * @param {Object} body - the body of the request, containing the device record to be added
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     */
    async create(body) {
        let resultObj;
        try {
            //await this.connect();
            let location = body.location;
            console.log(location);
            await connection.query`INSERT INTO presto1.device_records (ParentDevice, OwnerId, ReportedLost, DeviceLatitude, DeviceLongitude) VALUES (${
                body.parent_device
            }, ${body.owner_id}, ${body.reported_lost}, ${
                location.latitude + ''
            },${location.longitude + ''})`;
            resultObj = {
                code: 201,
                message: 'Successfully added device record to DB',
            };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }

    /**
     * Deletes a device record with a given id
     * @async
     * @function delete
     * @param {number} id - the id of the device record to be deleted
     * @returns {Promise<Object>} - an object containing the response code and json response
     * @todo - add custom error handling
     */
    async delete(id) {
        let resultObj;
        try {
            //await this.connect();
            await connection.query`DELETE FROM presto1.device_records WHERE Id = ${id}`;
            resultObj = {
                code: 204,
                message: 'Successfully removed device record from DB',
            };
        } catch (err) {
            resultObj = { code: 500, message: err.message };
        } finally {
            //await mssql.close();
            return resultObj;
        }
    }
}
/**
 * @export {deviceRecordsDAO} - an instance of the deviceRecordsDAO class
 */
export default deviceRecordsDAO;
