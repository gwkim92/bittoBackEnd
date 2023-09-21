const jwt = require('jsonwebtoken');
const userDB = require('../models/accountDB');
const { sequelize } = require('../../models');

module.exports = {
	users: {
		getUsersInfo: async (req, res) => {
			try {
				const result = await userDB.getUserInfo();
				// TODO log 삭제
				console.log('result : ', result);
				return res.json({
					result: result,
				});
			} catch (error) {
				console.log('error : ', error);
				//TODO json 400,500 error 추가
			}
		},

		getUserInfo: async (req, res) => {
			return res.json({
				id: req.user._id,
				email: req.user.email,
				name: req.user.name,
				role: req.user.role,
				image: req.user.image,
			});
		},

		register: async (req, res, next) => {
			try {
				// TODO request data 유효성 체크 추가

				const user = await userDB.createUserInfo(req.body);
				// TODO response success code 상수로 수정 및 정리
				if (user === undefined || user === null) {
					return res.sendStatus(200);
				} else {
					return res.sendStatus(404);
				}
			} catch (error) {
				// TODO response error code 상수로 수정 및 정리
				next(error);
			}
		},

		login: async (req, res, next) => {
			try {
				const user = await userDB.getUserInfoByEmail(req.body.email);
				// TODO 유효성 체크
				if (user === null) {
					return res
						.sendStatus(400)
						.send('Auth failed, email not found');
				}

				const isMatch = await userDB.comparePassWord(
					req.body.password,
					user.password
				);
				if (!isMatch) {
					return res.status(400).sned('Wrong Password');
				}

				const payload = {
					userId: user.uuid,
				};

				const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: '1h',
				});

				console.log(
					'payload : ',
					payload,
					'user : ',
					user,
					'accessToken: ',
					accessToken
				);
				return res.json({ user, accessToken });

				// TODO accessToken 후 response 추가
			} catch (err) {
				next(err);
			}
		},

		logout: async (req, res, next) => {
			try {
				return res.sendStatus(200);
			} catch (error) {
				next(error);
			}
		},
	},
};
