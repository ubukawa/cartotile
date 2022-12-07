const fetch = require('node-fetch')
const config = require('config')
const featureServer = config.get('url')

var data = []

async function get_request(url){
    const res = await fetch(url)
//    const esri = await res
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
    f.tippecanoe.layer = 'layer123' //will change later
    f.tippecanoe.maxzoom = 2
    f.tippecanoe.minzoom = 0
    delete f.properties.globalid  //delete unnnecesary attribution
    delete f.properties.globalid_1   //delete unnnecesary attribution
    delete f.properties.SHAPE__Length   //delete unnnecesary attribution
    data.push(f)
    console.log(data)
}



function getlayer(layer){
    return new Promise(function (resolve) {
        for (var i = 1; i < 10; i ++){
            var featureUrl = featureServer + layer + '/' + i + '?f=pjson'
            get_request(featureUrl)
        }
        resolve(data)
    }).then((out)=>{
        console.log(out)
    })
}

getlayer(0)

//console.log(jsondata)

//for (var i = 1; i < 6; i ++){
//    var featureUrl = featureServer + '0' + '/' + i + '?f=pjson'
//    get_request(featureUrl)
//}

//console.log(await Promise.all(data))




