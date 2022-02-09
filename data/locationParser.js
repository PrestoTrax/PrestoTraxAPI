class LocationParser{
    getLocation(jsonObj) {
        this.latitude = jsonObj.latitude.replace(/\'/g,"\\'");
        this.longitude = jsonObj.longitude.replace(/\'/g,"\\'");
        return { latitude: this.latitude, longitude: this.longitude };
    }
}
module.exports = LocationParser;