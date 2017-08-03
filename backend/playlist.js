var bookshelf = require('./bookshelf');
var env = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');


var Playlist = bookshelf.Model.extend({
    tableName: 'playlists',
    hasTimestamps: true,

    user: function() {
    	return this.belongsTo('User');
    },
    songs: function() {
    	return this.belongsToMany('Song');
    },
}, {
	create: function(attr) {
		var playlist = new this(attr);
		newPlaylist = playlist.save();
		return newPlaylist;
	},
	getPlaylists: function(attr) {
		return this.query({ where: {user_id: attr.userId}}).fetchAll().then((playlistData) => {
			return playlistData.serialize();
    	}).catch((err) => {
			return err;
		});
	},
	getSongs: function(attr) {
		return this.query({ where: {id: attr.playlistId}}).fetch({withRelated: ['songs']})
		.then((playlist) => {
			return playlist.related('songs');
		});
	},
	addSong: function(attr) {
		return this.query({ where: {id: attr.playlistId}}).fetch()
		.then((playlist) => {
			return playlist.songs().attach(attr.songId);
		}).catch((err) => {
			console.log(err);
		});
	},
	deleteSong: function(attr) {
		return this.query({ where: {id: attr.playlistId}}).fetch()
		.then((playlist) => {
			return playlist.songs().detach(attr.songId);
		}).catch((err) => {
			console.log(err);
		});
	}
});

module.exports = bookshelf.model('Playlist', Playlist);
