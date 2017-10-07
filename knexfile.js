var env = require('./backend/env');
var connection;

connection = { database : 'google_drive_music_player', host: process.env.DB_HOST };

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
