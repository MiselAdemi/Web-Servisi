var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserOnProjectSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserOnProject', UserOnProjectSchema);