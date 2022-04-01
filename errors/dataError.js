export default class dataError extends Error{
    static noDataFoundError() {
        this.code = 404;
        this.errorType = 'N0_DATA_RECEIVED';
        this.message = 'No data was returned from the database. The server is likely experiencing issues.';
        return this;
    }
}