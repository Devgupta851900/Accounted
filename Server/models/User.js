const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true, // Ensure email is unique
			lowercase: true, // Normalize email to lowercase
			match: [/\S+@\S+\.\S+/, "Please use a valid email address."], // Validate email format
		},
		password: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String, // Changed to String for various formats
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			default: "",
			trim: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
); // Add timestamps

module.exports = mongoose.model("User", userSchema);
