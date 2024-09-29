const User = require('../models/user');
const bcrypt = require('bcrypt');

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: "galidevaravenkatalokeshj@gmail.com" });
        if (!existingAdmin) {
            const newAdmin = new User({
                email: "galidevaravenkatalokeshj@gmail.com",
                name: "Venkataaaa",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.error("Error creating admin account:", error.message);
    }
}

module.exports = createAdminAccount;
