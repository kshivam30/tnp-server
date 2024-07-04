const User = require('../models/user');

const getAllUsers = async () => {
    return await User.find();
};

// Other service methods for createUser, getUserById, updateUser, deleteUser...

module.exports = {
    getAllUsers,
    // Other exported service methods...
};
