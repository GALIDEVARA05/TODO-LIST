
const User = require('../models/user');
const bcrypt = require("bcrypt");

async function createUser(userData) {
    const { name, email, password } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
        name,
        email,
        password: hashedPassword, 
        role: "customer"
    });

    const savedUser = await createUser.save();
    return savedUser;
}

module.exports = { createUser };
