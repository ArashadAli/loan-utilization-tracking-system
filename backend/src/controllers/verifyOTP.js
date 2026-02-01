import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        error: "Mobile number and OTP are required",
      });
    }

    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ error: "OTP not generated" });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};