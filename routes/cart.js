import express from "express";
const router = express.Router();
import  Cart from "../models/Cart.js";
import {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} from "./verify.js";


 
router.post("/", verify, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const saved = await newCart.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.put("/:id", verifyAndAuth, async (req, res) => {
  try {
    const updated= await Cart.findByIdAndUpdate(req.params.id,{$set: req.body,},{ new: true });
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.delete("/:id", verifyAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.get("/find/:userId", verifyAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get("/", verifyAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

export const cartRoute = router;
