const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeTypeSchema = new Schema({
	recipe_type : {
		type     : String,
		required : true
	}
});

module.exports = RecipeType = mongoose.model('recipeType', RecipeTypeSchema);
