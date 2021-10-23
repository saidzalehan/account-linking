var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	
	google: {
		id: String,
		token: String,
		email: String,
		picture: String,
		name: String
	},

	discord: {
		id: String,
		token: String,
		email: String,
		picture: String,
		name: String
	}

});

module.exports = mongoose.model('User', userSchema);