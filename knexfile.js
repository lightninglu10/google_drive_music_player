var env = require('./backend/env');
var connection;
if (process.env.RDS_HOSTNAME) {
    connection = { host     : process.env.RDS_HOSTNAME,
                   database : 'ebdb',
                   user     : process.env.RDS_USERNAME,
                   password : process.env.RDS_PASSWORD,
                   port     : process.env.RDS_PORT };
} else if (env == 'development') {
    connection = { database : 'google_drive_music_player' };
}

module.exports = {
    client: 'pg',
    connection: connection,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'backend/migrations'
    }
};
