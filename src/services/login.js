const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils"); // Corrected curly braces

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email }); // Fixed missing = in await

    if (!existingUser) { // Corrected condition
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password); // Added await

    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(existingUser); // Generate token
    return {
      token,
      email: existingUser.email, // Return user's email
      name: existingUser.name // Return user's name (if you have this field)
    };
  } catch (error) {
    console.log("Login Error :",error.message);
    throw new Error("Invalid credentials"); // Error handling
  }
}

module.exports = {
  login,
};