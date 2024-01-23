// authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    register: async (req, res) => {
      const { name, email, password } = req.body;
  
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already registered' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = await User.create({ name, email, password: hashedPassword });
  
        // Exclude password from the response
        const { password: omit, ...userWithoutPassword } = newUser.toObject();
  
        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            // If the user is not found, return an error
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            // If passwords don't match, return an error
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Exclude password from the response
            const { password: omit, ...userWithoutPassword } = user.toObject();

            // Send a success response with the user data (excluding password)
            res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    // Add other authentication controller methods as needed
  };
  