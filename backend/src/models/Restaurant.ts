import { Schema, model, Types } from "mongoose";

const restaurantSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", unique: true, required: true },
  business_name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo_url: { type: String },
  location: { type: String },
  contact: { type: String },
  qr_url: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, {
  timestamps: true,
  versionKey: false
});

export const Restaurant = model("Restaurant", restaurantSchema); 