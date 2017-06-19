
exports.up = function(knex, Promise) {
    return knex.schema.createTable('audio_files', function(table) {
        table.increments();
        table.string('name');
        table.string('file_address');
        table.unique(['name', 'file_address']);
        table.timestamps();
    });        
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('audio_files'); 
};
