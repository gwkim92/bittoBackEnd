//ToDo
// 트랜잭션에 필요한 함수들 모듈화
//checkNonce, gasEstimate, 1559, etc..
require("dotenv").config();
const { web3 } = require("../connection");
const { calculateFees } = require("./gasFeeCalculate");

async function getNonce(address) {
  return await web3.eth.getTransactionCount(address, "latest");
}

// Create a transaction object
async function createTransaction(to, value, data) {
  return {
    to: to,
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
  const gasFee = await calculateFees();
  const Nonce = await getNonce(from);
  console.log(Nonce);
  const tx = createTransaction(to, value, data);
  console.log("createTransaction :", tx);
  const gasLimit = await estimateGas(tx);
  console.log("gasLimit : ", gasLimit);
  return {
    to: to,
    gasLimit: gasLimit,
    chainId: "11155111",
    nonce: Nonce,
    maxPriorityFeePerGas: gasFee.medianPriorityFeePerGas,
    maxFeePerGas: gasFee.medianFeePerGas,
    value: value === "0" ? "0x0" : web3.utils.toWei(value, "ether"),
    data: data,
    type: "0x2",
  };
}

async function signTransaction(txObject, privateKey) {
  return await web3.eth.accounts.signTransaction(txObject, privateKey);
}

////////////////////////proxy//////////////////////
async function sendSignedTransaction(signedTxObject) {
  return await web3.eth.sendSignedTransaction(signedTxObject.rawTransaction);
}

module.exports = {
  createEIP1559Tx,
  signTransaction,
  sendSignedTransaction,
};
