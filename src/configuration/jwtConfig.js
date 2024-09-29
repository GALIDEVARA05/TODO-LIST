const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString('hex'); // Use a static key in production
module.exports = {
    secretKey: secretKey
};
