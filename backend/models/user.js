import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    googleId: String,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // ✅ WHITELIST CONTROL
    isWhitelisted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
