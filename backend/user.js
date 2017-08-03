var bookshelf = require('./bookshelf');
var _ = require('lodash');


var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    serializeForSelf: function() {
        return _.pick(this.attributes, ['id',
                                        'first_name',
                                        'last_name',
                                        'email',]);
    },

    songs: function() {
        return this.hasMany('Song');
    },
    playlists: function() {
        return this.hasMany('Playlist');
    },
}, {
    create: function(attrs) {
        // return new googleUser
        var user = new this(attrs);
    	
    	//var newUser = googleUser.save();
        newUser = user.save();

       // googleUser.save.bind(googleUser);
        return newUser;
    }
});

module.exports = bookshelf.model('User', User);