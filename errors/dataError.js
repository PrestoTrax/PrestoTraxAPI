export default class DataError extends Error{
    static noDataFoundError() {
        this.code = 404;
        this.errorType = 'DATA_NOT_FOUND';
        this.message = 'No data was returned from the database. The server is likely experiencing issues.';
        return this;
    }
}