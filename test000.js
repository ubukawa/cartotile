//modules
const fetch = require('node-fetch')
const config = require('config')
const fs = require('fs')

//parameters
const featureServer = config.get('url')
const layers = config.get('layers')
const layerId = config.get('layerId')
const layerRecord = config.get('layerRecord')
const outputText = config.get('outputText')
//var data = []

for ( var i in layers){
    console.log(`"i" is ${i}, layers.length is ${layers.length}`)
    console.log(`"layers[i]" is ${layers[i]}`)
    //await getlayer(layerId[layers[i]],layerRecord[layers[i]],layers[i])
}
