const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogsSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Logs = mongoose.model('logs', LogsSchema);
