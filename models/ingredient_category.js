const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = IngredientCategory = mongoose.model(
    'Ingredient_Categories',
    IngredientCategorySchema
);
