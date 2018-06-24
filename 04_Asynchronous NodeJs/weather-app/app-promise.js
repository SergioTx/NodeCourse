const yargs = require('yargs');
const axios = require('axios');

const APIKEY = 'AIzaSyD0arX46gxo_POX4FJz-_A1XWafWMb3uag';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${APIKEY}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/2156ef057578b4b82a3ee05d57ef8c1c/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = transformToCelsius(response.data.currently.temperature);
    var apparentTemperature = transformToCelsius(response.data.currently.apparentTemperature);
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

var transformToCelsius = (farenheit) => {
    return Math.round((+farenheit - 32) * 5 / 9);
}
