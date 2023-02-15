const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	username      : {
		type     : String,
		required : true
	},
	email         : {
		type     : String,
		required : true
	},
	password      : {
		type     : String,
		required : true
	},
	register_date : {
		type    : Date,
		default : Date.now
	},
	type          : {
		type    : String,
		default : 'user'
	}
});

module.exports = User = mongoose.model('users', UserSchema);
