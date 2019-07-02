const express = require('express')
const db = require('../utils/pool.js')
const fetch = require('node-fetch')
const router = express.Router()

const cols = ["id", "nome"]
const colunas = cols.toString()
// console.log(colunas)

// Setup db queries
const mapQuery = `SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM ( SELECT 'Feature' As type, ST_AsGeoJSON(alc.geom)::json As geometry, row_to_json((${colunas})) As properties FROM rep.areas_lazer_consolidadas As alc) As f ) As fc`
const tryQuery = "INSERT INTO rep.areas_lazer_consolidadas (id, nome) VALUES (4, 'testeNODE')"
// "INSERT INTO rep.areas_lazer_consolidadas (nome) VALUES ('testeNODE')"

/* GET Postgres JSON data w/ async */
router.get('/data', async (req, res) => {
  try {
    const { rows } = await db.query(mapQuery)
    const data = rows[0].row_to_json
    res.send(data)
    res.end()
  } catch (e) {
    console.error(e)
  }
})

/* GET map page from Postgres w/ async */
router.get('/map', async (req, res) => {
  try {
    const { rows } = await db.query(mapQuery) // Get query result
    const data = rows[0].row_to_json // Convert rows to json
    res.render('map', {
      title: 'Express API', // give title to page
      jsonData: data // pass data to view
    })
  } catch (e) {
    console.error(e)
  }
})

/* GET Geoserver JSON data w/ async */
router.get('/data2', async (req, res) => {
  try {
    const dataReq = await fetch('http://localhost:8080/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:tasmania_state_boundaries&maxFeatures=50&outputFormat=application/json')
    const data = await dataReq.json()
    res.send(data)
    res.end()
  } catch (e) {
    console.error(e)
  }
})

/* GET draw page w/ async */
router.get('/draw', (req, res) => {
  res.render('draw', {title: 'Draw form'})
})

/* POST draw page form */
// router.post('/draw', async (req, res) => {
//   console.log(req.body)
// })

/* POST draw page form */
router.post('/form2', async (req, res) => {
  console.log(req.body)
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
