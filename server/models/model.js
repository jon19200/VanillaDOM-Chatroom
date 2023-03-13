const { Pool } = require('pg');

const PG_URI = 'postgres://iyyvespw:AMvmTHhlOgNzBWwfSKUXSYVeq0EVTSw3@isilo.db.elephantsql.com/iyyvespw';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};