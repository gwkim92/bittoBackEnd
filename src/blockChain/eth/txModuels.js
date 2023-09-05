//ToDo
// 트랜잭션에 필요한 함수들 모듈화
//checkNonce, gasEstimate, 1559, etc..
require("dotenv").config();
const { web3 } = require("../connection");
async function getBaseFeePerGas() {
  const latestBlock = await web3.eth.getBlock("latest");
  return latestBlock.baseFeePerGas;
}

async function getNonce(address) {
  return await web3.eth.getTransactionCount(address, "pending");
}

// Create a transaction object
async function createTransaction(from, to, value, data) {
  const Nonce = await getNonce(from);
  return {
    from: from,
    nonce: Nonce,
    gasPrice: null,
    gasLimit: null,
    to: to,
    value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")),
    data: web3.utils.toHex(data),
  };
}

// Estimate gas for a transaction
async function estimateGas(tx) {
  try {
    return await web3.eth.estimateGas(tx);
  } catch (error) {
    console.error(`Failed to estimate gas: ${error}`);
  }
}

// Create an EIP-1559 transaction object
async function createEIP1559Tx(from, to, value, data) {
  const baseFeePerGas = await getBaseFeePerGas();
  const Nonce = await getNonce(from);
  const tx = createTransaction(from, to, value, data);
  const gasLimit = await estimateGas(tx);
  return {
    to: to,
    gasLimit: gasLimit,
    chainId: "0x1", // Ethereum Mainnet
    nonce: Nonce,
    maxPriorityFeePerGas: "0x9502F9000", //1 Gwei
    maxFeePergas: web3.utils.toHex(
      baseFeePerGas + web3.utils.toWei("2", "gwei")
    ),
    value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")),
    data: web3.utils.toHex(data),
    accessList: [],
    type: "0x02",
  };
}

module.exports = {
  createEIP1559Tx,
};
