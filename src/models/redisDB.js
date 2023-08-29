const redis = require('redis');

var redisClient = redis.createClient({ legacyMode: true });
redisClient
	.connect(process.env.REDIS_HOST)
	.then(() => {
		console.log('Redis Connect Success!!');
	})
	.catch((err) => {
		console.log('Redis Error : ' + err);
		return;
	});

function HSet(key, value) {
	redisClient.hSet(key, String, value);
}

function HGet(key) {
	const result = redisClient.hGet(key, String);
	return result;
}

module.exports = {
	redisClient,
	HSet,
	HGet,
};
