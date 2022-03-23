const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users_controller');

router.post('/', userController.createUser);

module.exports = router;
