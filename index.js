import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRoute } from "./routes/user.js";
import { authRoute } from "./routes/auth.js";
import { productRoute } from "./routes/product.js";
import { cartRoute } from "./routes/cart.js";
import { orderRoute } from "./routes/order.js";
import { stripeRoute } from "./routes/stripe.js";
import cors from "cors";
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected"));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Connected");
});
