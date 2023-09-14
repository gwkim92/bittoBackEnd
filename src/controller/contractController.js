const saveContractDB = require("../models/contractDB");
const getContractDB = require("../models/contractDB");

const { sequelize } = require("../../models");

module.exports = {
  contracts: {
    saveContractInfo: async (chain, name, version, address, abi) => {
      console.log("saveContractInfo", chain, name, version, address, abi);
      try {
        const result = await saveContractDB.saveContractInfo(
          chain,
          name,
          version,
          address,
          abi
        );
        // console.log("result : ", result);

        return result;
      } catch (error) {
        console.log("error : ", error);
      }
    },

    getContractInfo: async (name) => {
      console.log("getContractInfo : ", name);
      try {
        const result = await getContractDB.getContractInfo(name);
        // console.log("result : ", result);
        return result;
      } catch (error) {
        console.log("error : ", error);
      }
    },
  },
};
