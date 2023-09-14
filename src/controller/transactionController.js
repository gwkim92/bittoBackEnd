const getContractData =
  require("../blockChain/eth/contractInfo").getContractData;
const {
  sendMintTransactionTest,
} = require("../blockChain/eth/transactionMethods");

module.exports = {
  mint: async (req, res) => {
    try {
      const { toAddress: to, amountToMint: amount } = req.body;
      console.log("req### : ", to, amount);
      if (!to || !amount) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Load contract info asynchronously
      const contractsInfo = await getContractData();
      // console.log("contractsInfo : ", contractsInfo);
      // Send the mint transaction and wait for the receipt
      const receipt = await sendMintTransactionTest(contractsInfo, to, amount);

      if (receipt && receipt.transactionHash) {
        res.json({
          message: "Successfully minted tokens",
          transactionHash: receipt.transactionHash,
        });
      } else {
        throw new Error("Failed to mint tokens");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
