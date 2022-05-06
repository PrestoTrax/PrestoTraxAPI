import recordError from "../errors/recordError";

export default class recordValidation {
    static validateRecord(record) {
        if(record === 0){
            throw recordError.noUserError();
        }
    }
}