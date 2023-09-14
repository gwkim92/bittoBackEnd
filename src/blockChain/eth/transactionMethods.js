require("dotenv").config();

const { web3 } = require("../connection");
const {
  createEIP1559Tx,
  signTransaction,
  sendSignedTransaction,
} = require("./txModuels");

async function sendMintTransactionTest(contracts, to, amount) {
  const {
    erc20v2,
    adminAddress,
    minterAddress,
    proxyAddress,
    minterPrivateKey,
  } = contracts;

  console.log("Minter Address : ", erc20v2);
  const toWeiAmount = web3.utils.toWei(amount, "gwei");
  const data = erc20v2.methods.mint(to, toWeiAmount).encodeABI();
  console.log("packing : ", web3.utils.hexToString(data));
  const txObject = await createEIP1559Tx(minterAddress, proxyAddress, 0, data);
  const signedTxObject = await signTransaction(txObject, minterPrivateKey);
  console.log("==signEnd==", signedTxObject);

  try {
    const receipt = await sendSignedTransaction(signedTxObject);
    console.log("receipt : ", receipt);
    return receipt;
  } catch (error) {
    console.error(`Failed to send mint transaction: ${error}`);
    throw error; // Ensure the error is propagated
  }
}

module.exports = { sendMintTransactionTest };
