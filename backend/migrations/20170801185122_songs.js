
exports.up = function(knex, Promise) {
    return knex.schema.createTable('songs', function(table) {
        table.increments();
        table.string('name');
        table.string('url');
        table.timestamps();
        table.integer('user_id').references('users.id');
    });        
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('songs')
    	.table('playlists_songs', function(table) {
            table.dropColumn('song_id');
        });
};
