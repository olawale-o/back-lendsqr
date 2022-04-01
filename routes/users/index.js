const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users_controller');

router.post('/register', userController.createUser);
router.post('/login', userController.authenticateUser);
router.post('/:id/deposit', userController.deposit);

module.exports = router;
