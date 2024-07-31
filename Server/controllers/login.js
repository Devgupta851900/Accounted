const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if email and password are provided
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required.",
			});
		}

		// Find user by email
		const user = await User.findOne({ email });

		// If user is not found, return an error
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User does not exist.",
			});
		}

		// Compare provided password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Incorrect password.",
			});
		}

		// Generate JWT token
		const jwtPayload = {
			id: user._id,
			email: user.email,
		};
		const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		// Prepare user object for response
		const userResponse = {
			...user.toObject(),
			token,
		};
		delete userResponse.password; // Remove password from response

		// Set cookie and send response
		return res
			.cookie("token", token, {
				expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Cookie expires in 2 days
				httpOnly: true, // Cookie is accessible only by the web server
			})
			.status(200)
			.json({
				success: true,
				user: userResponse,
				message: "Login successful.",
			});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({
			success: false,
			message: "Login failed, please try again.",
		});
	}
};
