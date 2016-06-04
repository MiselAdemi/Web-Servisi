var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectCommentsSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ProjectComments', ProjectCommentsSchema);