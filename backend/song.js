var bookshelf = require('./bookshelf');
var env = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

var Song = bookshelf.Model.extend({
    tableName: 'songs',
    hasTimestamps: true,
    
    user: function() {
    	return this.belongsTo('User');
    },	
    playlists: function() {
    	return this.belongsToMany('Playlist');
    },
}, {
	// Declare dependents for cacading row deletion
	dependents: ['playlists'], 
	
	getAllSongs: function(attr) {
		return this.query({ where: {user_id: attr.userId}}).fetchAll().then((songData) => {
			return songData.serialize();
    	}).catch((err) => {
			return err;
		});
	},
	addSongToLocal: function(attr) {
		var song = new this(attr);
		newLocalSong = song.save();
		return newLocalSong;
	},
	deleteSongFromLocal: function(attr) {
		return new this({id: attr.songId}).fetch().then((localSong) => {
			localSong.destroy();
		});
	}, 
});

module.exports = bookshelf.model('Song', Song);
