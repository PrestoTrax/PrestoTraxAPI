import dataError from "../errors/dataError.js";

/** @module security/DataValidation */

/** 
 * A class that validates location data and throws errors if there are issues 
 * @class DataValidation
 */
export default class DataValidation{
    /**
     * Determines whether data passed to this method is empty or null
     * @static
     * @function isEmpty
     * @param {Object} data 
     * @summary If data is empty or null, an error is thrown. Otherwise, nothing happens.
     */
    static isEmpty(data){
        if(data === undefined || data === null || data === [] || data.length === 0){
            throw dataError.noDataFoundError();
        }
    }
}