const express = require("express");
const router = express.Router();
const bip39 = require("bip39");
const hdkey = require("ethereumjs-wallet");
const { web3 } = require("../index");

function generateMnemonic() {
  return bip39.generateMnemonic();
}

function generateAddressFromMnemonic(mnemonic, password) {
  const hdwallet = hdkey.hdkey.fromMasterSeed(
    bip39.mnemonicToSeedSync(mnemonic, password)
  );
  console.log("hdWallet : ", hdwallet);
  const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  console.log("wallet : ", wallet);
  console.log("getAddressString:", wallet.getAddressString());
  const address = wallet.getChecksumAddressString();
  const privateKey = wallet.getPrivateKey().toString("hex");
  console.log(address, privateKey);
  return { address, privateKey };
}

// router.get("/generateMnemonic", async (req, res, next) => {
//   console.log("Router Test generateMnemonic");
//   try {
//     const mnemonic = generateMnemonic();
//     res.status(200).json({ mnemonic });
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/generateWallet", async (req, res) => {
  try {
    const { password } = req.body;
    const mnemonic = generateMnemonic();
    const { address, privateKey } = generateAddressFromMnemonic(
      mnemonic,
      password
    );

    res.status(200).json({ mnemonic, address, privateKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/saveWalletData", async (req, res) => {
  try {
    const { userId, password, address } = req.body;
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 사용자가 없습니다." });
    }
    existingUser.walletAddress = address;
    existingUser.walletPassword = password;
    await user.save();
    res.status(200).json({ message: "지갑 정보가 성공적으로 추가되었습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "지갑 정보 추가 도중 오류가 발생했습니다.", error });
  }
});

// router.post("/generateAddress", async (req, res, next) => {
//   console.log("Router Test generateAddress", req.body);
//   try {
//     const mnemonic = generateMnemonic();
//     res.status(200).json({ mnemonic });
//     const { pwd } = req.body;
//     console.log("mnemonic : ", mnemonic);
//     console.log("pwd : ", pwd);
//     try {
//       const address = generateAddressFromMnemonic(mnemonic, pwd);
//       console.log("address :", address);
//       res.status(200).json({ address });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/recoveryPrivateKey", async (req, res, next) => {
  try {
    const { mnemonic, password } = req.body;
    const hdwallet = hdkey.hdkey.fromMasterSeed(
      bip39.mnemonicToSeedSync(mnemonic, password)
    );
    const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const privateKey = wallet.getPrivateKey().toString("hex");
    console.log(privateKey);
    res.status(200).json({ privateKey });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
