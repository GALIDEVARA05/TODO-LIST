const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticate(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;  // Ensure userId is part of the JWT payload
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports = authenticate;
