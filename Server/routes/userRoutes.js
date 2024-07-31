const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { updateAccountInfo } = require("../controllers/updateAccountInfo");

// Route for user registration
router.post("/register", register);

// Route for updating user account information
router.put("/update", updateAccountInfo);

// Route for user login
router.post("/login", login);

module.exports = router;
