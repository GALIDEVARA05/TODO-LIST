const express = require("express");
const cors = require("cors"); // Fixed syntax
const { login } = require("../controllers/login"); // Fixed destructuring

const router = express.Router();

router.use(cors()); // Use CORS middleware correctly

router.post("/login", login); // POST route for login

module.exports = router;