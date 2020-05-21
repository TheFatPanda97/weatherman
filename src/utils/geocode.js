const request = require("postman-request");
require('dotenv').config()

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${process.env.MAPBOX}&limit=1`;


    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode