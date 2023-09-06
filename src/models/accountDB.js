const db = require('../../models');
const user = db.account_infos;
const bcrypt = require('bcryptjs');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');

async function getUserInfo() {
	try {
		const users = await user.findAll({});
		return users;
	} catch (err) {
		console.log('error :', err);
		return [];
	}
}

async function createUserInfo(data) {
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(data.password, salt);
	const randomUuid = uuidv4();
	const uuid = uuidv5(data.email, randomUuid);

	try {
		const userInfo = await user.create({
			uuid: uuid,
			name: data.name,
			email: data.email,
			password: passwordHash,
			role: data.role,
			walletPassword: data.walletPassword,
			walletAddress: data.walletAddress,
			image: data.image,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		// TODO DB insert success log 수정 -> 컨트롤러로 수정
		console.log(
			'create user info sucess ::',
			'createUserInfo',
			'email',
			userInfo.email,
			'address',
			userInfo.walletAddress
		);
		return null;
	} catch (err) {
		console.error('user info error ::', err);
		return err;
	}
}

async function getUserInfoByEmail(email) {
	try {
		const userInfo = await user.findOne({ where: { email: email } });
		//TODO log 수정
		// console.log('user : ', userInfo);
		if (userInfo === null) {
			return null;
		} else {
			return userInfo;
		}
	} catch (err) {
		// TODO error log 수정
		console.log('error :', err);
		return err;
	}
}

async function getUserInfoByUuid(uuid) {
	try {
		const userInfo = await user.findOne({ where: { uuid: uuid } });
		if (userInfo === null) {
			return null;
		} else {
			return userInfo;
		}
	} catch (err) {
		return err;
	}
}

async function comparePassWord(reqPassword, userPassword) {
	const match = bcrypt.compare(reqPassword, userPassword);
	return match;
}

// 더미 데이터 추가
// async function createUserInfo() {
// 	user.create({
// 		name: 'John Doe',
// 		email: 'john.doe@example.com',
// 		password: 'password123',
// 		role: 1,
// 		walletPassword: 'walletpass',
// 		walletAddress: 'walletaddress123',
// 		image: 'profile.jpg',
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	});
// }

// user.js, userDB.js 에 있는 함수 옮기기

module.exports = {
	getUserInfo,
	createUserInfo,
	getUserInfoByEmail,
	getUserInfoByUuid,
	comparePassWord,
};
