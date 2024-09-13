const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');


dotenv.config();
// const JWT = process.env.JWT_SECRET
// const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
// Generate access token
const generateAccessToken = (user) => {
  console.log('Generating access token for user:', user);
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION }); // Expires in 15 minutes
};

// Generate refresh token
const generateRefreshToken = (user) => {
  console.log('Generating refresh token for user:', user);
  console.log(process.env.JWT_REFRESH_SECRET)
  return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION }); // Expires in 1 hour
};

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found with email:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      console.log(accessToken)
      console.log(refreshToken)

      res.status(200).json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  refreshToken: (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh token expired or invalid, please log in again' });
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  },
};
