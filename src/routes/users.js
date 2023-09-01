const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/usersController');
// const async = require("async");

// //    routes/items.js
// const router = require('express').Router();
// const controller = require('./../controllers');

// router.get('/', controller.items.get); // API 경로에 해당하는 컨트롤러를 연결

// module.exports = router;

// api, db 연결 테스트
router.get('/test', controller.users.getUsersInfo);

router.get('/auth', auth, controller.users.getUserInfo);
router.post('/register', controller.users.register);
router.post('/login', controller.users.login);
router.post('/logout', auth, controller.users.logout);

module.exports = router;
