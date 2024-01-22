// authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  authenticateToken: async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  },
  // Add other authentication middleware methods as needed
};
