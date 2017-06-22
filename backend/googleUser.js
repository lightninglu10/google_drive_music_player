var bookshelf = require('./bookshelf');
var _ = require('lodash');

module.exports = bookshelf.Model.extend({
    tableName: 'google_users',

    serializeForSelf: function() {
        return _.pick(this.attributes, ['id',
                                        'first_name',
                                        'last_name',
                                        'google_id',
                                        'access_token',
                                        'email',]);
    },

}, {
    create: function(attrs) {
        // return new googleUser
        var googleUser = new this(attrs);
    	
    	var newUser = googleUser.save();

        return newUser;
    }
});