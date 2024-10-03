const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const {secretKey} = require("../configuration/jwtConfig");/*1234*/
=======
const {secretKey} = require("../configuration/jwtConfig");
>>>>>>> d116f7b (intial-commit)
function generateToken(user){
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey,{expiresIn:"1h"});
};
module.exports ={
    generateToken
};