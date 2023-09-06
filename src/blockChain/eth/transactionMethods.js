require("dotenv").config();
const contracts = require("./contractInfo");
const { web3 } = require("../connection");
const {
  createEIP1559Tx,
  encodeFunctionCall,
  signTransaction,
  sendSignedTransaction,
} = require("./txModuels");
// const erc20v1Contract = contracts.erc20v1;
const erc20v2Contract = contracts.erc20v2;
const proxyContract = contracts.proxy;
const proxyAddress = contracts.proxyAddress;
const adminAddress = contracts.adminAddress;
const minterAddress = contracts.minterAddress;
const adminPrivateKey = contracts.adminPrivateKey;
const minterPrivateKey = contracts.minterPrivateKey;

// 컨트랙트 함수 구현
// module.exports = {
//   mint: async (req, res) => {},
// };
async function sendMintTransaction(to, amount) {
  const toWeiAmount = web3.utils.toWei(amount, "gwei");

  const data = erc20v2Contract.methods.mint(to, toWeiAmount).encodeABI();

  const txObject = await createEIP1559Tx(minterAddress, proxyAddress, 0, data);

  const signedTxObject = await web3.eth.accounts.signTransaction(
    txObject,
    minterPrivateKey
  );
  // const signedTxObject = await sendTransaction(txObject, minterPrivateKey);
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTxObject.rawTransaction
    );
    console.log("receipt : ", receipt);
    return receipt;
  } catch (error) {
    console.error(`Failed to send mint transaction: ${error}`);
  }
}

async function sendMintTransactionTest(to, amount) {
  const toWeiAmount = web3.utils.toWei(amount, "gwei");

  // const data = encodeFunctionCall(erc20v2Contract, "mint", [to, toWeiAmount]);
  const data = erc20v2Contract.methods.mint(to, toWeiAmount).encodeABI();
  console.log(data);
  const txObject = await createEIP1559Tx(minterAddress, proxyAddress, 0, data);
  console.log(txObject);

  const signedTxObject = await signTransaction(txObject, minterPrivateKey);

  try {
    const receipt = await sendSignedTransaction(signedTxObject);
    console.log("receipt : ", receipt);
    return receipt;
  } catch (error) {
    console.error(`Failed to send mint transaction: ${error}`);
  }
}

// Test the function
(async () => {
  try {
    const toAddress = adminAddress;
    const amountToMint = 1; // Replace with the desired mint amount in Wei

    const receipt = await sendMintTransactionTest(toAddress, amountToMint);

    if (receipt && receipt.transactionHash) {
      console.log(
        "Mint transaction successful. Transaction hash:",
        receipt.transactionHash
      );
    } else {
      console.error("Failed to get transaction receipt:", receipt);
    }
  } catch (error) {
    console.error(`Failed to mint tokens: ${error}`);
  }
})();
