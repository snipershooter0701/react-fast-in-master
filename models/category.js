const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
	category_name: {
		type: String,
		required: true
	}
})

module.exports = Category = mongoose.model('categories', CategorySchema);