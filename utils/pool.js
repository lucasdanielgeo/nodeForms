/* PostgreSQL and PostGIS module and connection setup */
const { Pool } = require('pg')

// Setup pool and query
const pool = new Pool({
  host: '192.168.173.178',
  user: 'postgres',
  password: 'ipufgeo1977',
  port: 5432,
  database: 'IPUF',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

// Export simpler
module.exports = {
  query: (text, params) => pool.query(text, params)
}
