const wfsGetFeatures = function (workspace, layer, host = 'localhost', port = '8080', version = '2.0.0', src = 'EPSG:4326', format = 'json') {
    if (workspace == null) {
        return console.error('No workspace defined')
    } else if (layer == null) {
        return console.error('No layer defined')
    } else {
        const worklayer = workspace + ':' + layer
        let wfsAddress = `http://${host}:${port}/geoserver/wfs?service=wfs&version=${version}&request=GetFeature&typeNames=${worklayer}&srsName=${src}`
        if (format === 'GML2' || format === 'gml2' || format === 'GML3' || format === 'gml3' || format === 'CSV' || format === 'csv') {
            console.log(wfsAddress + `&outputFormat=${workform}`)
            return wfsAddress + `&outputFormat=${format}`
        } else if (format === 'json' || format === 'JSON') {
            const workform = 'application/json'
            console.log(wfsAddress + `&outputFormat=${workform}`)
            return wfsAddress + `&outputFormat=${workform}`
        } else if (format === 'JSONP' || format === 'jsonp') {
            const workform = 'outputFormat=text/javascript'
            console.log(wfsAddress + `&outputFormat=${workform}`)
            return wfsAddress + `&outputFormat=${workform}`
        } else {
            return console.error('No valid format defined')
        }
    }
}

module.exports = wfsGetFeatures
// export { wfsGetFeatures }
