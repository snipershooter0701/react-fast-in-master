const mongoose = require('mongoose');
const { Schema } = mongoose;

const CuisineSchema = new Schema({
	cuisine_name : {
		type     : String,
		required : true
	}
});

module.exports = Cuisine = mongoose.model('cuisines', CuisineSchema);
