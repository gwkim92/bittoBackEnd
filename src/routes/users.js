const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/usersController');

router.get('/users', controller.users.getUsersInfo);

router.get('/auth', auth, controller.users.getUserInfo);
router.post('/register', controller.users.register);
router.post('/login', controller.users.login);
router.post('/logout', auth, controller.users.logout);

module.exports = router;
