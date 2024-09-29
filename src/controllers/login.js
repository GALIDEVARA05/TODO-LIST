const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).send({
      message: 'Login successful!',
      token,       // Send token to client
      email: user.email, // Send user's email
      name: user.name,   // Send user's name (if you have this field)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'An internal server error occurred.' });
  }
};

module.exports = { login };
