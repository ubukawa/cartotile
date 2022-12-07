//modules
const fetch = require('node-fetch')
const config = require('config')

//parameters
const featureServer = config.get('url')
const layers = config.get('layers')
const layerId = config.get('layerId')
const layerRecord = config.get('layerRecord')
var data = []

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
    data.push(f)
//    console.log(data)
}


async function getlayer(layer,count,layerName2){
    for (var i = 1; i < count + 1; i ++){
        var featureUrl = featureServer + layer + '/' + i + '?f=pjson'
        await get_feature(featureUrl,layerName2)
    }
}

for (let layer in layers){
    let num = layerId[layers[layer]]
    let record = layerRecord[layers[layer]]
    let layerName1 = layers[layer]
    getlayer(num,record,layerName1).then(()=>{
        console.log(JSON.parse(data))
    })
}


