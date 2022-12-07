//libraries
const config = require('config')
const fetch = require('node-fetch')

//parameters
const featureServer = config.get('url')
const setting = { method: 'GET'}
var data = []


for (var i = 1; i < 6; i ++){
    async function get_request(){
        var featureUrl = featureServer + '0' + '/' + i + '?f=pjson'
        console.log(featureUrl)
        const res = await fetch(featureUrl)
        const data1 = await res
        console.log(data1)
    }
/*
    fetch(featureUrl, setting)
    .then(res => res.json())
    .then((json) => {
        console.log(json.feature.attributes.iso3cd)
        data.push(json.feature.attributes.iso3cd)
    })
    .catch(err => console.error(err))
*/
    }


//console.log(await Promise.all(data))
console.log('end')
