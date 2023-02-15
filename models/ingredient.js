const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema({
    ingredient_name: {
        type: String,
        required: true,
    },
    ingredient_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient_Categories',
        required: true,
    },
    allergy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allergies',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = Ingredient = mongoose.model('ingredients', IngredientSchema);
