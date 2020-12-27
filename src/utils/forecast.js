const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=82dfd449083edee61566125c5567a96b&units=metric';

    request({url:url, json:true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service',undefined);
        }else if(response.body.message){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,response.body.current.weather[0].description.toUpperCase()+". The temperature is "+response.body.current.temp+" and the humidity is "+response.body.current.humidity)
        }
    })
}

module.exports = forecast;