
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('playlists', function(table) {
        table.increments();
        table.string('name');
        table.unique('name');
        table.timestamps();
        table.integer('user_id').references('users.id');
    });        
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('playlists')
		.table('playlists_songs', function(table) {
            table.dropColumn('playlist_id');
        });
};
