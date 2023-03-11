const { Pool } = require('pg');

const PG_URI = 'postgres://huncggmp:2QtPgBwrUYA8ywh9JLeAHFOabhZyphZY@isilo.db.elephantsql.com/huncggmp';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};