const mariadb = require('mariadb');
const mariadb_config = require('../config/mariadb_config.json');

const pool = mariadb.createPool({
    host: mariadb_config.host,
    user: mariadb_config.user,
    password: mariadb_config.password,
    connectionLimit: 5
});