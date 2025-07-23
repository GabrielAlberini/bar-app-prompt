import { Schema, model, Types } from "mongoose";

const categorySchema = new Schema({
  restaurant_id: { type: Types.ObjectId, ref: "Restaurant", required: true },
  name: { type: String, required: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  versionKey: false
});

export const Category = model("Category", categorySchema); 