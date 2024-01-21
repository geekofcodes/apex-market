// userController.js
const User = require('../models/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    // Add other controller methods as needed
};
