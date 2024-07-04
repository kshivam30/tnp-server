const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Define routes
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
