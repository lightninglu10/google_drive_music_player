var bookshelf = require('./bookshelf');
var _ = require('lodash');

module.exports = bookshelf.Model.extend({
    tableName: 'google_users',

    serializeForSelf: function() {
        return _.pick(this.attributes, ['id',
                                        'first_name',
                                        'last_name',
                                        'google_id',
                                        'email',]);
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