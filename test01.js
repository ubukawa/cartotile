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
const stream = fs.createWriteStream(outputText)

//actual code
async function get_feature(url,layerName3){
    const res = await fetch(url)
    const esri = await res.json()
    let f = new Object()
    f.type = 'feature'
    f.properties = {}
    f.geometory = {}
    f.geometory.coordinates = []
    f.tippecanoe = {}
    f.properties = esri.feature.attributes
    if(esri.feature.geometry.rings != undefined){
        f.geometory.type = 'Polygon'
        f.geometory.coordinates = esri.feature.geometry.rings[0]    
    } else if (esri.feature.geometry.paths != undefined) {
        f.geometory.type = 'LineString'
        f.geometory.coordinates =esri.feature.geometry.paths[0]
    } else {
        f.geometory.type = 'Point'
        f.geometory.coordinates = esri.feature.geometry.points[0]
    }
    f.tippecanoe = {}
    f.tippecanoe.layer = layerName3 
    f.tippecanoe.maxzoom = 2
    f.tippecanoe.minzoom = 0
    delete f.properties.globalid  //delete unnnecesary attribution
    delete f.properties.globalid_1   //delete unnnecesary attribution
    delete f.properties.SHAPE__Length   //delete unnnecesary attribution
//    data.push(f)
    stream.write(JSON.stringify(f))
    stream.write(', \n')
}

async function getlayer(layer,count,layerName2){
    console.log('Starting the work!!!!!!')
    console.log(Date())
    console.log('----->')
    for (var i = 1; i < count + 1; i ++){
        var featureUrl = featureServer + layer + '/' + i + '?f=pjson'
        await get_feature(featureUrl,layerName2)
    }
}

//console.log(layerId[layers[0]])  //like "0" or "3"
//console.log(layerRecord[layers[0]]) //like "246" or "742"
//console.log(layers[0]) //like "bnda" or "bndl"
//getlayer(layerId[layers[0]],layerRecord[layers[0]],layers[0]).then(()=>{
getlayer(layerId[layers[0]],10,layers[0]).then(()=>{
//    console.log(JSON.parse(data[0]))
//    console.log(data[0])
      stream.end()
      console.log('end!!! Bye-bye')
      console.log(Date())
})


/*
async function main(){
    for (let layer in layers){
        let num = layerId[layers[layer]]
        let record = layerRecord[layers[layer]]
        let layerName1 = layers[layer]
        getlayer(num,10,layerName1).then(()=>{
 //       getlayer(num,record,layerName1).then(()=>{
        })
    }
}

main().then(()=>{
    stream.end()
    console.log('end!!! Bye-bye')
    console.log(Date())
})
*/

