const mongoose = require("mongoose");

const libraryownerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
		maxLength: 20,
	},
	role: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("libraryowner", libraryownerSchema);
