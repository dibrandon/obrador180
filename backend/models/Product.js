import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    image: { type: String, default: "" }, // URL (Cloudinary más adelante)
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
export default Product;