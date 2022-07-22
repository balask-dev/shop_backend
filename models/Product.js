import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  { title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    size: { type: Array },
    color: { type: Array },
    pattern:{type:String},
    price: { type: Number, required: true },
    categories: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
