var env = require('./backend/env');
var connection;
if(env == 'development') {
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
