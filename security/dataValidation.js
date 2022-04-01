import dataError from "../errors/dataError";

export default class dataValidation{
    static isEmpty(data){
        if(data === undefined || data === null || data === [] || data.length === 0){
            throw dataError.noDataFoundError();
        }
    }
}