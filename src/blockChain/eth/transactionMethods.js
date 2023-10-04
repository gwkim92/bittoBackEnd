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
    erc20v2Address,
    proxy,
    adminAddress,
    minterAddress,
    proxyAddress,
    minterPrivateKey,
  } = contracts;

  erc20v2.options.address = proxyAddress;

  const MINTER_ROLE = web3.utils.keccak256(
    web3.utils.asciiToHex("MINTER_ROLE")
  );
  console.log(MINTER_ROLE);
  // Check if the given address has minter role
  let hasMinterRole = await erc20v2.methods
    .hasRole(MINTER_ROLE, minterAddress)
    .call();
  console.log(typeof minterAddress);
  console.log(`Does ${minterAddress} have minter role? ${hasMinterRole}`);

  // Check balance using 'balanceOf' method
  const balance = await erc20v2.methods.balanceOf(adminAddress).call();
  console.log("minter address : ", minterAddress, minterPrivateKey);
  console.log(`Balance of minter: ${balance}`);

  const toWeiAmount = web3.utils.toWei(amount, "gwei");
  const data = erc20v2.methods.mint(to, toWeiAmount).encodeABI();

  const method = "mint";
  const params = [to, toWeiAmount];
  const dataToCheckAgainst = erc20v2.methods[method](...params).encodeABI();
  console.log("data validate check : ", data);
  console.log("data validate check : ", dataToCheckAgainst);

  // Compare original data with newly generated one
  if (data !== dataToCheckAgainst) {
    throw new Error("Invalid transaction data");
  }

  ///rlp start///
  const txObject = await createEIP1559Tx(minterAddress, proxyAddress, 0, data);
  console.log("txObject : ", txObject);
  const signedTxObject = await signTransaction(txObject, minterPrivateKey);
  console.log("==signEnd==", signedTxObject.rawTransaction);

  try {
    const receipt = await sendSignedTransaction(signedTxObject.rawTransaction);
    console.log("receipt : ", receipt);
    return receipt;
  } catch (error) {
    console.error(`Failed to send mint transaction: ${error}`);
    throw error; // Ensure the error is propagated
  }
}

module.exports = { sendMintTransactionTest };
