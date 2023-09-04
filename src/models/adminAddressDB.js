const db = require("../models");
const contract = db.address_infos;

async function saveAddressInfo(chain, name, address) {
  try {
    // Update the address information if it exists or create a new one
    const [result, created] = await contract.upsert(
      {
        chain: chain,
        name: name,
        address: address,
      },
      { returning: true }
    );

    if (created) {
      console.log("Address created successfully.");
    } else {
      console.log("Address updated successfully.");
    }

    return result;
  } catch (err) {
    console.error("Failed to save or update Address:", err);
  }
}
async function getAddressInfo(name) {
  const addressInfo = await contract.findOne({ where: { name: name } });
  return addressInfo;
}
module.exports = {
  saveAddressInfo,
  getAddressInfo,
};
