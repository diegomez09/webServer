const request = require('request')
const keyWeather = '3a3e7abf7ae1efb0d06be6aebaf03960'
const forecast = (lat, lon, callback) => {    
    const url = 'http://api.weatherstack.com/current?access_key=3a3e7abf7ae1efb0d06be6aebaf03960&query=' + lon + ',' + lat;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('No se puede conectar',undefined);
        } else if (response.body.error) {
            callback('Please specify a valid location identifier using the query parameter.',undefined);
        } else {
            const recibir = response.body.current
            // const degrees = recibir.temperature
            // const pre = recibir.precip
            callback(undefined, {
                actual: recibir.weather_descriptions[0],
                grados: recibir.temperature,
                precipitacion: recibir.precip
            })
        }
    })
}

module.exports = forecast;