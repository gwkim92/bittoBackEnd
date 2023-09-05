require("dotenv").config();
const contracts = require("./contractInfo");
const { web3 } = require("../connection");
const { createEIP1559Tx } = require("./txModuels");
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
  const data = erc20v2Contract.methods.mint(to, amount).encodeABI();

  const txObject = await createEIP1559Tx(
    minterAddress,
    proxyAddress,
    "0",
    data
  );

  const signedTxObject = await web3.eth.accounts.signTransaction(
    txObject,
    minterPrivateKey
  );

  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTxObject.rawTransaction
    );
    return receipt;
  } catch (error) {
    console.error(`Failed to send mint transaction: ${error}`);
  }
}

// Test the function
(async () => {
  try {
    const toAddress = minterAddress;
    const amountToMint = web3.utils.toWei("10", "ether"); // Replace with the desired mint amount in Wei

    const receipt = await sendMintTransaction(toAddress, amountToMint);

    console.log(
      "Mint transaction successful. Transaction hash:",
      receipt.transactionHash
    );
  } catch (error) {
    console.error(`Failed to mint tokens: ${error}`);
  }
})();
