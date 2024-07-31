const cloudinary = require("cloudinary").v2;
require("dotenv").config();

/**
 * Configures Cloudinary with credentials from environment variables.
 */
const cloudinaryConnect = () => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		secure: true, // Use HTTPS for secure connections
	});

	// Basic check to ensure configuration is loaded correctly
	if (
		!cloudinary.config().cloud_name ||
		!cloudinary.config().api_key ||
		!cloudinary.config().api_secret
	) {
		console.error(
			"Cloudinary configuration is missing required environment variables."
		);
	}
};

module.exports = cloudinaryConnect;
