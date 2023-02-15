const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenSchema = new Schema({
    refresh_token: {
        type: String,
        required: true,
    },
    belongs_to: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now(),
    },
});

// expires after 1 month in case cookie is cleared
TokenSchema.index({ lastModifiedDate: 1 }, { expireAfterSeconds: 2592000000 });
module.exports = Token = mongoose.model('tokens', TokenSchema);
