// 트랜잭션을 날리기 위한 정보값들, 데이터베이스에서 가져오기.
const dotenv = require("dotenv");
dotenv.config();
const { web3 } = require("../connection");

// //dataBase connection....
const contractDB = require("../../controller/contractController");
const addressDB = require("../../controller/addressController");
const ERC20V2Artifact = require("./artifacts/ERC20ImplV2.json");

async function getData() {
  //database Connection
  const Admin = await addressDB.addresss.getAddressInfo("admin");
  const Minter = await addressDB.addresss.getAddressInfo("minter");
  //Minter.address
  //proxy.address
  const proxy = await contractDB.contracts.getContractInfo("Erc20Proxy");
  //proxy.address
  const Erc20V2 = await contractDB.contracts.getContractInfo("Erc20V2");
  //Erc20V2.abi
  const AdminAddress = await Admin.dataValues.address;
  const minterAddress = await Minter.dataValues.address;
  const proxyAddress = await proxy.dataValues.address;
  const ercV2Address = await Erc20V2.dataValues.address;
  const proxyAbi = await proxy.dataValues.abi;
  const ercV2Abi = await Erc20V2.dataValues.abi;

  console.log("###################Address#################");
  console.log("proxy :", proxyAddress);
  console.log("ERC20V2 :", ercV2Address);
  console.log("admin :", AdminAddress);
  console.log("minter :", minterAddress);

  //test

  return {
    AdminAddress,
    minterAddress,
    proxyAddress,
    ercV2Address,
    proxyAbi,
    ercV2Abi,
  };
}

//not database ...
const adminPrivateKey = process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY;
const minterPrivateKey = process.env.SEPOLIA_MINTER_PRIVATE_KEY;

function getContractInstance(abi, address) {
  return new web3.eth.Contract(abi, address);
}

async function getContractData() {
  const data = await getData();
  return {
    erc20v2: getContractInstance(data.ercV2Abi, data.ercV2Address),
    erc20v2Address: data.ercV2Address,
    proxy: getContractInstance(data.proxyAbi, data.proxyAddress),
    proxyAddress: data.proxyAddress,
    adminAddress: data.AdminAddress,
    minterAddress: data.minterAddress,
    adminPrivateKey,
    minterPrivateKey,
  };
}

module.exports = { getContractData };
