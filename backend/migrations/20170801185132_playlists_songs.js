
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('playlists_songs', function(table) {
        table.integer('song_id').references('songs.id');
        table.integer('playlist_id').references('playlists.id');
        table.timestamps();
    });   
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('playlists_songs'); 
};
