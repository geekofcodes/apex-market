const User = require('../models/User');

module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },
    getUserById: async (userId) => {
        return await User.findById(userId);
    }
};
