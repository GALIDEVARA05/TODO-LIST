// app.js
const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("./configuration/dbconfig");  // MongoDB connection

// Initialize the express app
const app = express();
const createAdminAccount = require("./scripts/admin");

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// Ensure MongoDB connection is established
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Create admin account on startup
createAdminAccount();

// Use routes
app.use("/user", signupRoute);
app.use("/auth", loginRoute);

// Health check route
app.get("/", (req, res) => {
    res.status(200).send("API is running");
});

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server is Running On Port ${PORT}`);
});
