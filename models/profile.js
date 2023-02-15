const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    image: {
        type: Object,
    },
    halal: {
        type: Boolean,
    },
    diets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient_Categories',
        },
    ],
    allergies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient_Subcategories',
        },
    ],
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes',
        },
    ],
    customRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes',
        },
    ],
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
