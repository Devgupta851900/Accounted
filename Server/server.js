// Import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressFileupload = require("express-fileupload");
require("dotenv").config();

// Import configurations and routes
const connect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4100;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(
	expressFileupload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);

// Connect to database and Cloudinary
connect();
cloudinaryConnect();

// Define routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
	res.send("Your server is running");
});

// Error-handling middleware (optional but recommended)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "An internal server error occurred",
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`App is running at http://localhost:${PORT}`);
});
