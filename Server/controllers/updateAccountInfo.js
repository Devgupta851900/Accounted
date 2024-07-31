const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateAccountInfo = async (req, res) => {
	try {
		const {
			email,
			name,
			oldPassword,
			newPassword,
			confirmNewPassword,
			designation,
			address,
			phone,
			country,
			bio,
		} = req.body;

		console.log("Updating account info for:", email);

		// Ensure the user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found.",
			});
		}

		// Verify old password if provided
		if (oldPassword) {
			const isOldPasswordCorrect = await bcrypt.compare(
				oldPassword,
				user.password
			);
			if (!isOldPasswordCorrect) {
				return res.status(401).json({
					success: false,
					message: "Incorrect old password.",
				});
			}
		}

		// Update user fields if provided
		if (name) user.name = name;
		if (designation) user.designation = designation;
		if (address) user.address = address;
		if (phone) user.phone = phone;
		if (country) user.country = country;
		if (bio) user.bio = bio;

		// Handle password change if new password is provided
		if (newPassword) {
			if (newPassword !== confirmNewPassword) {
				return res.status(400).json({
					success: false,
					message: "New passwords do not match.",
				});
			}
			// Hash and update the new password
			user.password = await bcrypt.hash(newPassword, 10);
		}

		// Save the updated user
		const updatedUser = await user.save();

		return res.status(200).json({
			success: true,
			message: "Account information updated successfully.",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Update account error:", error);
		return res.status(500).json({
			success: false,
			message: "Error updating account information.",
			error: error.message,
		});
	}
};
