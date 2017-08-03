
exports.up = function(knex, Promise) {
 	return knex.schema.createTable('users', function(table) {
    	table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('google_id');
        table.unique('google_id');
        table.string('email');
        table.timestamps();
        table.timestamp('last_seen_at');
    })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('users')
        .dropTable('songs')
        .dropTable('playlists')
        .dropTable('playlists_songs');
};
