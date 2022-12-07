//libraries
const config = require('config')
const request = require('request')

//parameters
const featureServer = config.get('url')
var data = []

for (var i = 1; i < 6; i ++){
    var featureUrl = featureServer + '0' + '/' + i + '?f=pjson'
//    console.log(featureUrl)
    var option = {
        url: featureUrl,
        method: 'GET',
        json: true
    }
    request(option, function(error, response, body){
        console.error('error:', error)
        console.log('statusCode:', response && response.statusCode)
        console.log(body.feature.attributes.iso3cd)
//        var att = body.feature.attributes.iso3cd
//        data.push(att)
    })
}

//console.log(data.body.feature.attributes.iso3cd)
console.log('end')

/*
var featureUrl = featureServer + '0' + '/' + '1' + '?f=pjson'
var option = {
    url: featureUrl,
    method: 'GET',
    json: true
}

request(option, function(error, response, body){
    console.log(body)
//    console.log(body.feature.geometry.paths)
})
*/


//console.log(featureUrl)
//var data = []
//
//https.get(featureUrl, function (res){
//    res.on('data', function(chunk){
//        data.push(chunk)
//    }).on('end',function(){
//        var events = Buffer.concat(data)
//        console.log(events)
//    })
//})





