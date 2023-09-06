const jwt = require('jsonwebtoken');
const userDB = require('../models/accountDB');

let auth = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) return res.sendStatus(401);

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const userInfo = await userDB.getUserInfoByUuid(decode.userId);
		if (!userInfo || userInfo === null || userInfo === undefined) {
			return res.status(400).send('없는 유저입니다.');
		}

		req.user = user;
		next();
	} catch (err) {
		next(error);
	}
};

module.exports = auth;
