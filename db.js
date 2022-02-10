const pg = require('pg');
const client = new pg.Client('postgres://localhost/library');

module.exports = client;