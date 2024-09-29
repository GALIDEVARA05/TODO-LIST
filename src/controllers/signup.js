// Ensure this file is correctly named and placed in the appropriate directory
const userService = require("../services/signup");

// Define the createUser function as an async function
async function createUser(req, res) {
    try {
        // Extract user data from the request body
        const userData = req.body;

        // Call the userService to create a new user
        const user = await userService.createUser(userData);

        // Send a successful response
        res.status(201).json({ user: user, message: "User created successfully" });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Handle different types of errors
        if (error.message === "User with this email already exists") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Export the createUser function for use in other modules
module.exports = { createUser };
