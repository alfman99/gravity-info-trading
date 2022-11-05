/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_MAX_CONNECTIONS } =
  process.env;

module.exports = {
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT, 10),
    database: DB_NAME,
  },
  pool: {
    min: 1,
    max: parseInt(DB_MAX_CONNECTIONS, 10),
  },
  migrations: {
    directory: 'db/migrations',
  },
  seeds: {
    directory: 'db/seeds',
  },
};
