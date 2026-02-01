import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: [true, "Mobile number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number (10 digits starting with 6-9)"],
    },
    role: {
      type: String,
      enum: ["BENEFICIARY", "OFFICER"],
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,           // important: hide by default
      minlength: [8, "Password must be at least 8 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otp:{
      type:String,
      default:null
    },
    otpExpiresAt:{
      type:Date,
    },
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;