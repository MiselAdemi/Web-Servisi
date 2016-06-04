var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskHistorySchema = new Schema({
	mark: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    task_to: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    indexMark: {
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TaskHistory', TaskHistorySchema);