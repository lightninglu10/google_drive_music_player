
exports.up = function(knex, Promise) {
 	return knex.schema.createTable('google_users', function(table) {
    	table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('google_id');
        table.string('access_token');
        table.string('email');
    });
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('google_users');
};
