const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// const async = require("async");

router.get("/auth", auth, async (req, res, next) => {
  console.log("auth router test", res);
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", async (req, res, next) => {
  try {
    // console.log("1", req.body);
    const user = User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //존재하는 유저인지 확인
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }
    //비밀번호 체크
    console.log("test");
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong Password");
    }

    const payload = {
      userId: user._id.toHexString(),
    };

    //token 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(
      "payload : ",
      payload,
      "user : ",
      user,
      "accessToken: ",
      accessToken
    );
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
