const mongoose = require("mongoose");

// Load environment variables from a .env file
require("dotenv").config();

/**
 * Connects to MongoDB using environment variables.
 */
const connect = () => {
	mongoose
		.connect(process.env.DB_URL)
		.then(() => {
			console.log("DATABASE Connected Successfully");
		})
		.catch((error) => {
			console.error("DATABASE Connection Error:", error.message);
			process.exit(1);
		});
};

module.exports = connect;
