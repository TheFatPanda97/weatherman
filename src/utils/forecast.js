const request = require("postman-request");
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK}&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. 
                It is currently ${body.current.temperature} degrees out. 
                It feels like ${body.current.feelslike} degrees out. The visibility is ${body.current.visibility} km`
            );
        }
    });
};

module.exports = forecast;
