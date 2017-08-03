var db = require('./db');
var bookshelf = require('bookshelf')(db);
var cascadeDelete = require('bookshelf-cascade-delete');
bookshelf.plugin('registry'); // Resolves circular dependencies
bookshelf.plugin(cascadeDelete); // Allows for easier row deletions where there are relations
module.exports = bookshelf;