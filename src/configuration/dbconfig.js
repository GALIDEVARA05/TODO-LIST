const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jwt_db")
.then(() => {
    console.log("Connected to MongoDB database");
})
.catch((err) => {
    console.error(`Not connected to MongoDB database: ${err}`);
});

module.exports = mongoose;
