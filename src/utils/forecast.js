const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'https://openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=439d4b804bc8187953eb36d2a8c26a02'
    request({url, json: true}, (error,{body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }else if (body.message) {
            callback('Unable to find location', undefined)
        }
        else {
           callback(undefined,'It is the currently  ' + body.main.temp + ' degrees out. The high today is ' + body.main.temp_max + ' with a low of '+ body.main.temp_min + '. it is ' + body.weather[0].description + ' but weather feels like ' + body.main.feels_like + ' degrees out.')
        }
    
    }) 
}
    
 module.exports = forecast