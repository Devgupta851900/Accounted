const cloudinary = require("cloudinary").v2;

const cloudinaryUpload = async (file, folder, height, quality) => {
	try {
		// Set up options for Cloudinary upload
		const options = {
			folder,
			resource_type: "auto", // Automatically detects the resource type (image, video, etc.)
			...(height && { height }), // Add height if provided
			...(quality && { quality }), // Add quality if provided
		};

		// Perform the upload and return the result
		const result = await cloudinary.uploader.upload(
			file.tempFilePath,
			options
		);
		return result;
	} catch (error) {
		// Log the error and rethrow it for further handling
		console.error("Cloudinary upload error:", error);
		throw new Error("Error uploading file to Cloudinary");
	}
};

module.exports = cloudinaryUpload;
