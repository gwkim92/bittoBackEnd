// 트랜잭션을 날리기 위한 정보값들, 데이터베이스에서 가져오기.
const dotenv = require("dotenv");
dotenv.config();
const { web3 } = require("../connection");

// //dataBase connection....
// const contractDB = require("../../controller/contractController");
// const addressDB = require("../../controller/contractController");

///database Connection
// const Minter = await addressDB.addresss.getAddressInfo("minter");
// //Minter.address
// const Erc20V1 = await contractDB.contracts.getContractInfo("Erc20V1");
// //proxy.address
// const proxy = await contractDB.contracts.getContractInfo("proxy");
// //proxy.address
// const Erc20V2 = await contractDB.contracts.getContractInfo("Erc20V2");
// //Erc20V2.abi

//not database ...
const adminPrivateKey = process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY;
const minterPrivateKey = process.env.SEPOLIA_MINTER_PRIVATE_KEY;
const ERC20V1Artifact = require("./artifacts/ERC20Impl.json");
const ERC20V2Artifact = require("./artifacts/ERC20ImplV2.json");
const proxyArtifact = require("./artifacts/ERC20Proxy.json");
const V1_Proxy_Address = require("./artifacts/deployedAddresses.json");
const v2Address = require("./artifacts/deployedAddressesV2.json");

const erc2Ov1ABI = JSON.stringify(ERC20V1Artifact.abi);
const erc2Ov2ABI = JSON.stringify(ERC20V2Artifact.abi);
const proxyABI = JSON.stringify(proxyArtifact.abi);
const V1Address = V1_Proxy_Address.erc2Ov1;
const V2Address = v2Address.erc2Ov2;
const proxyAddress = V1_Proxy_Address.proxy;
//계정
const adminAddress = V1_Proxy_Address.admin;
const minterAddress = V1_Proxy_Address.minter;

function getContractInstance(abi, address) {
  return new web3.eth.Contract(JSON.parse(abi), address);
}
// // database 연결 되면 수정 필요
// const erc20V1Contract = new web3.eth.Contract(erc2Ov1ABI, V1Address);
// const erc20V2Contract = new web3.eth.Contract(erc2Ov2ABI, V2Address);
// const proxyContract = new web3.eth.Contract(proxyABI, proxyAddress);

module.exports = {
  erc20v1: getContractInstance(erc2Ov1ABI, V1Address),
  erc20v2: getContractInstance(erc2Ov2ABI, V2Address), // You need to define these variables if you're going to use this.
  proxy: getContractInstance(proxyABI, proxyAddress),
  proxyAddress,
  adminAddress,
  minterAddress,
  adminPrivateKey,
  minterPrivateKey,
};
