//libraries
const config = require('config')
const https = require('https')

//parameters
const featureServer = config.get('url')
var data = []



for (var i = 1; i < 6; i ++){
    var featureUrl = featureServer + '0' + '/' + i + '?f=pjson'
    https.get(featureUrl, function (res) {
        res.on('data', function(chunk) {
            data.push(chunk)
        }).on('end', ()=>{
            console.log(data)
        })
    })


}

console.log('end')