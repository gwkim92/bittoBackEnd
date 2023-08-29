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

// 더미 데이터 추가
async function createUserInfo() {
	user.create({
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: 'password123',
		role: 1,
		walletPassword: 'walletpass',
		walletAddress: 'walletaddress123',
		image: 'profile.jpg',
		createdAt: new Date(),
		updatedAt: new Date(),
	});
}

// user.js, userDB.js 에 있는 함수 옮기기

module.exports = {
	getUserInfo,
	createUserInfo,
};
