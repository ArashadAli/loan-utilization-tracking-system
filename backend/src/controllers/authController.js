import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, mobileNumber, role, password } = req.body;

    if (!name || !mobileNumber || !role || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["BENEFICIARY", "OFFICER"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Only allow creating BENEFICIARY accounts
    if (role !== "BENEFICIARY") {
      return res.status(403).json({
        error: "Officers can only register BENEFICIARY accounts",
      });
    }

    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ error: "Mobile number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobileNumber,
      role: "BENEFICIARY",
      password: hashedPassword,
      isActive: false,
      registeredBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Beneficiary account created. Awaiting approval.",
      user: {
        id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        isActive: user.isActive,
        registeredBy: user.registeredBy,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      error: "Server error during registration",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    });
  }
};

export const login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
      return res.status(400).json({ error: "Mobile number and password required" });
    }

    // Important: select password explicitly
    const user = await User.findOne({ mobileNumber }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: "Account is not active (awaiting approval)",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Server error during login",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

