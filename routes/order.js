import express from "express";
const router = express.Router();
import Order from"../models/Order.js";
import {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} from"./verify.js";

 
router.post("/", verify, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const saved = await newOrder.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.put("/:id", verifyAndAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

 router.delete("/:id", verifyAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

 router.get("/find/:userId", verifyAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get("/", verifyAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const productId = req.query.pid;
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       {$match: {createdAt: { $gte: previousMonth },...(productId && {products: { $elemMatch: { productId } },
//           }),
//         },
//       },{
//         $project: {month: { $month: "$createdAt" },sales: "$amount",},
//       },
//       {$group: {_id: "$month",total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).send(income);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

export const orderRoute = router;
