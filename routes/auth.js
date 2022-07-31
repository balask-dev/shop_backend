 import express from "express";
 const router = express.Router();
 import User  from "../models/User.js";
 import  CryptoJS from "crypto-js";
 import  jwt from "jsonwebtoken";
 import bcrypt from "bcrypt";

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    res.send(err);
  }});
 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).send("Invalid Credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).send("Invalid Credentials");

    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(500).send(error);
  }
});

export const authRoute = router;
