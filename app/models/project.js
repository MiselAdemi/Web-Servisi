var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    mark: {
        type: String,
        required: true,
        index: { unique: true}
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);