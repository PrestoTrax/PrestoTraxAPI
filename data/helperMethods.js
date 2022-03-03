class HelperMethods {
    getLocation(jsonObj) {
        return {
            latitude: jsonObj.latitude.replace(/\'/g, "\'\'"),
            longitude: jsonObj.longitude.replace(/\'/g, "\'\'"),
        };
    }

    // getRow(columns) {
    //     return columns.reduce(
    //         (obj, col) => ({
    //             ...obj,
    //             [col.metadata.colName]: col.value,
    //         }),
    //         {}
    //     );
    // }
}

export default HelperMethods;
