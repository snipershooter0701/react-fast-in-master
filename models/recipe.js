const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema(
    {
        recipe_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        halal: {
            type: Boolean,
            required: true,
        },
        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
                required: true,
            },
        ],
        directions: {
            type: Array,
            required: true,
        },
        cuisine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cuisines',
            required: true,
        },
        recipe_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipeType',
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
        },
        servings: {
            type: Number,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        public: {
            type: Boolean,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        date_published: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = Recipe = mongoose.model('recipes', RecipeSchema);
