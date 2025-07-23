import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  status: { type: String, enum: ["active", "suspended", "blocked"], default: "active" },
  last_login: { type: Date }
}, {
  timestamps: true,
  versionKey: false
});

export const User = model("User", userSchema); 