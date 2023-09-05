// 체인 연결
require("dotenv").config();
const { Web3 } = require("web3");

const network = process.env.ETHEREUM_NETWORK;
console.log(process.env.ETHEREUM_NETWORK);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);
web3.eth.net
  .isListening()
  .then(() => console.log("is connected"))
  .catch((e) => console.log("Wow. Something went wrong"));
module.exports = {
  web3,
};
