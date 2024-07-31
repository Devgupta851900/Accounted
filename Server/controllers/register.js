const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			designation,
			address,
			phone,
			country,
		} = req.body;

		// Log user details for debugging (remove in production)
		// console.log(
		// 	firstName,
		// 	lastName,
		// 	email,
		// 	password,
		// 	confirmPassword,
		// 	designation,
		// 	address,
		// 	phone,
		// 	country
		// );

		// Check if all required fields are provided
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!designation ||
			!address ||
			!phone
		) {
			return res.status(400).json({
				success: false,
				message: "All fields are required.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User already registered.",
			});
		}

		// Verify that passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords do not match.",
			});
		}

		// Hash the password before saving to the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const user = await User.create({
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
			designation,
			address,
			phone,
			country,
			bio: "",
			image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
		});

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

		// Send success response
		return res.status(201).json({
			success: true,
			message: "User registered successfully.",
			user: userResponse,
		});
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({
			success: false,
			message: "Registration failed, please try again.",
		});
	}
};
