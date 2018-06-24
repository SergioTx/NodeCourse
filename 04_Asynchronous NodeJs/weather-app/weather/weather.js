const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/2156ef057578b4b82a3ee05d57ef8c1c/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: transformToCelsius(body.currently.temperature),
                apparentTemperature: transformToCelsius(body.currently.apparentTemperature)
            });
        } else {
            callback('Unable to fecth weather.');
        }
    });
}

var transformToCelsius = (farenheit) => {
    return Math.round((+farenheit - 32) * 5 / 9);
}

module.exports.getWeather = getWeather;