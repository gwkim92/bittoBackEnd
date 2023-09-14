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
  const AdminAddress = Admin.dataValues.address;
  const minterAddress = Minter.dataValues.address;
  const proxyAddress = proxy.dataValues.address;
  const ercV2Address = Erc20V2.dataValues.address;
  const proxyAbi = proxy.dataValues.abi;
  const ercV2Abi = Erc20V2.dataValues.abi;

  console.log(
    "revert data Test : ",
    AdminAddress,
    minterAddress,
    proxyAddress,
    ercV2Address
  );
  // console.log(proxyAbi);
  const parse3proxyABI = JSON.parse(JSON.parse(JSON.parse(proxyAbi)));
  const parse2erc2Ov2ABI = JSON.parse(JSON.parse(ercV2Abi));
  const proxyABIstringfy = JSON.stringify(parse3proxyABI);
  const erc20V2Abistringfy = JSON.stringify(parse2erc2Ov2ABI);
  // const erc2Ov2ABI = JSON.stringify(ERC20V2Artifact.abi);
  console.log("call database erc20V2 Abi : ", erc20V2Abistringfy);

  //test

  return {
    AdminAddress,
    minterAddress,
    proxyAddress,
    ercV2Address,
    proxyAbi,
    ercV2Abi,
    proxyABIstringfy,
    erc20V2Abistringfy,
    // erc2Ov2ABI,
  };
}

//not database ...
const adminPrivateKey = process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY;
const minterPrivateKey = process.env.SEPOLIA_MINTER_PRIVATE_KEY;

function getContractInstance(abi, address) {
  return new web3.eth.Contract(JSON.parse(abi), address);
}

async function getContractData() {
  const data = await getData();
  return {
    // erc20v2: getContractInstance(data.erc20V2Abistringfy, data.ercV2Address),
    erc20v2: getContractInstance(data.erc20V2Abistringfy, data.ercV2Address),
    proxy: getContractInstance(data.proxyABIstringfy, data.proxyAddress),
    proxyAddress: data.proxyAddress,
    adminAddress: data.AdminAddress,
    minterAddress: data.minterAddress,
    adminPrivateKey,
    minterPrivateKey,
  };
}

module.exports = { getContractData };
