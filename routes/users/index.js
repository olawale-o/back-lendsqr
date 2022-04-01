const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../../controllers/users_controller');

router.post('/register', userController.createUser);
router.post('/login', userController.authenticateUser);
router.post('/:id/deposit', passport.authenticate('jwt', {session: false}), userController.deposit);

module.exports = router;
