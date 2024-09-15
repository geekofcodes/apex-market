const UserService = require('../services/userService');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getUserById: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await UserService.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};
