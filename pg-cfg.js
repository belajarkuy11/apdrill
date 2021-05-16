const { Pool } = require('pg')

const pool = new Pool({
  user: 'ardi',
  host: 'dbarca',
  database: 'dbarca',
  password: 'ardiaja',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,       // default 10000 ms as idleTimeoutMillis
  connectionTimeoutMillis: 2000,
})

exports.cfgDB = pool;
