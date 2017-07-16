var bookshelf = require('./bookshelf');
var env = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = bookshelf.Model.extend({
    tableName: 'audio_files',

}, {
	getAllSongs: function() {
		return new this().fetchAll().then(songData => {
			return songData.serialize();
    	}).catch(err => {
			return err;
		});
	}
});
