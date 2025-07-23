import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  category_id: { type: Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image_url: { type: String },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  versionKey: false
});

export const Product = model("Product", productSchema); 