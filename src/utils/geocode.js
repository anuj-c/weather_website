const request = require('request');

const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW51amNob3VyZSIsImEiOiJja2h0OW1zbHgwOGt2MzBvMzBzbjRtbjBpIn0._UldvZ3lTkLTbrCCR5IP6w&limit=1';

    request({url: url, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to the network!',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find the location. Try another search',undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;