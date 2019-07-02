const cordenadasIniciais = [-27.59, -48.54]; // Cordenadas de Florianópolis
const zoomInicial = 14;

const map = L.map('map').setView(cordenadasIniciais, zoomInicial);

const baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map)

const editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// Initialise the FeatureGroup to store editable layers
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const featureGroup = L.featureGroup().addTo(map);

// Initialise the draw control and pass it the FeatureGroup of editable layers
const drawControl = new L.Control.Draw({
  draw: { //as opções "setadas" como false desativam as opções na barra de ferramenta do mapa
    polyline: true,
    circle: true, 
    rectangle: true,
    marker: true,
    circlemarker: true,
  },
  edit: {
    featureGroup: drawnItems
  }
});

map.addControl(drawControl);

//esse metodo serve para salvar os pontos do desenho 
map.on(L.Draw.Event.CREATED, (e) => { 
  const type = e.layerType
  const layer = e.layer;

  drawnItems.addLayer(layer);
});

map.on('draw:created', (e) => {
  featureGroup.addLayer(e.layer);
});

/*
//esse metodo mostra o geojson como string na tela
function exportarData(){
  var poligono = featureGroup.toGeoJSON(); //variavel que recebe as cordenadas do poligono

  var poligonoConvertido = JSON.stringify(poligono); //variavel que recebe o geojson convertido em string

  alert(poligonoConvertido);

 
}
*/

/*
//esse matado serve para baixar o geojson
document.getElementById('export').onclick = function(e) {
  // Extrai o GeoJson do featureGroup
  var data = featureGroup.toGeoJSON();

  // converte o geojson em string
  var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

  // exporta o arquivo
  document.getElementById('export').setAttribute('href', 'data:' + convertedData);
  document.getElementById('export').setAttribute('download','data.geojson');
  
}
*/

