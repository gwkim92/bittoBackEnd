const db = require('../../models');
const user = db.account_infos;

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
	try {
		const userInfo = await user.create({
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role,
			walletPassword: data.walletPassword,
			walletAddress: data.walletAddress,
			image: data.image,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		// TODO DB insert success log 수정
		console.log('create user info sucess ::', userInfo);
	} catch (err) {
		console.error('user info error ::', err);
		return err;
	}
	// try {
	// 	const user = await user.create(data);
	// 	return user;
	// } catch (err) {
	// 	console.error('err : ', err);
	// 	throw err;
	// }
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
};
