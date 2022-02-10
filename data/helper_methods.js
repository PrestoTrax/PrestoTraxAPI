class helper_methods {
    getLocation(jsonObj) {
        return {
            latitude: jsonObj.latitude.replace(/\'/g, "\\'"),
            longitude: jsonObj.longitude.replace(/\'/g, "\\'"),
        };
    }
}

module.exports = helper_methods;
