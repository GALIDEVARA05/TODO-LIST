const mongoose = require("../configuration/dbconfig");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },  // Added required field
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
});

module.exports = mongoose.model("User", userSchema);
