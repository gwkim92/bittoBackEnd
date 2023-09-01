const NodeCache = require("node-cache");
const cache = new NodeCache();

function setCache(key, userId, value, ttl = 60 * 60 * 24) {
  const uniqueKey = `${userId}_${key}`;
  cache.set(uniqueKey, value, ttl);
}

function getCache(key, userId) {
  const uniqueKey = `${userId}_${key}`;
  return cache.get(uniqueKey);
}

// router.get("/getEthMnemonic/:userId", (req, res) => {
//   const { userId } = req.params;
//   const mnemonic = getCache("EthMnemonic", userId);
//   if (mnemonic) {
//     res.status(200).json({ mnemonic });
//   } else {
//     res.status(404).json({ message: "저장된 니모닉 코드를 찾을 수 없습니다." });
//   }
// });

// router.get("/getEthPrivateKey/:userId", (req, res) => {
//   const { userId } = req.params;
//   const privateKey = getCache("EthPrivateKey", userId);
//   if (privateKey) {
//     res.status(200).json({ privateKey });
//   } else {
//     res.status(404).json({ message: "저장된 프라이빗 키를 찾을 수 없습니다." });
//   }
// });

module.exports = { setCache, getCache };
