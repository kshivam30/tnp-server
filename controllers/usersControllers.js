const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Other controller methods for createUser, getUserById, updateUser, deleteUser...

module.exports = {
    getAllUsers,
    // Other exported controller methods...
};
