import express from "express";
const router = express.Router();
import Product from "../models/Product.js";
import {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} from "./verify.js";

 
router.post("/", verifyAndAdmin,  async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const saved = await newProduct.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.put("/:id", verifyAndAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id,{$set: req.body,},{ new: true });
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.delete("/:id", verifyAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

export const productRoute = router;
