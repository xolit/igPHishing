import { Timestamp } from "mongodb";
import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
