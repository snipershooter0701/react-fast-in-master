const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
        required: true,
    },
});

module.exports = Profile = mongoose.model('reviews', ReviewSchema);
