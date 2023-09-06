//ToDo
// 트랜잭션에 필요한 함수들 모듈화
//checkNonce, gasEstimate, 1559, etc..
require("dotenv").config();
const { web3 } = require("../connection");

async function getBaseFeePerGas() {
  const latestBlock = await web3.eth.getBlock("latest");
  console.log(latestBlock.baseFeePerGas);
  return latestBlock.baseFeePerGas;
}

async function getNonce(address) {
  return await web3.eth.getTransactionCount(address, "latest");
}

function encodeFunctionCall(contractInstance, methodName, args) {
  return contractInstance.methods[methodName](...args).encodeABI();
}

// Create a transaction object
async function createTransaction(from, to, value, data) {
  const Nonce = await getNonce(from);
  return {
    to: to,
    // value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")),
    value: value === "0" ? "0x0" : web3.utils.toWei(value.toString(), "ether"),
    data: data,
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
  console.log("gasLimit : ", gasLimit);
  return {
    to: to,
    gasLimit: gasLimit,
    chainId: "11155111", // Ethereum Mainnet
    nonce: Nonce,
    maxPriorityFeePerGas: web3.utils.toWei("1", "gwei"), //1 Gwei
    maxFeePerGas: baseFeePerGas + web3.utils.toWei("2", "gwei"),
    value: value === "0" ? "0x0" : web3.utils.toWei(value, "ether"),
    data: data,
    type: "0x2",
  };
}

async function sendTransaction(txObject, privateKey) {
  const signedTxObject = await web3.eth.accounts.signTransaction(
    txObject,
    privateKey
  );

  return await web3.eth.sendSignedTransaction(signedTxObject.rawTransaction);
}

module.exports = {
  createEIP1559Tx,
  encodeFunctionCall,
  sendTransaction,
};
