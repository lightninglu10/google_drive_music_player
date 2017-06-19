var bookshelf = require('./bookshelf');
var env = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = bookshelf.Model.extend({
    tableName: 'audio_files',

    serializeForSelf: function() {
        return _.pick(this.attributes, ['name','file_address']);
    }
});
