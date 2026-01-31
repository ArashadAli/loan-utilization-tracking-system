import express from "express";
import { register, login, getCurrentUser } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected: officer creates beneficiary
router.post("/register", protect, authorize("OFFICER"), register);

// One-time bootstrap (remove after first officer created)
router.post("/bootstrap-first-officer", async (req, res) => {
  try {
    const officerCount = await User.countDocuments({ role: "OFFICER" });
    if (officerCount > 0) {
      return res.status(403).json({
        error: "First officer already exists. Use normal /login now.",
      });
    }

    const { name, mobileNumber, password } = req.body;

    if (!name || !mobileNumber || !password) {
      return res.status(400).json({ error: "Name, mobileNumber, password required" });
    }

    const existing = await User.findOne({ mobileNumber });
    if (existing) {
      return res.status(400).json({ error: "Mobile number already used" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const officer = await User.create({
      name,
      mobileNumber,
      role: "OFFICER",
      password: hashed,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "First officer created! Use /login now.",
      mobileNumber: officer.mobileNumber,
    });
  } catch (err) {
    console.error("Bootstrap error:", err);
    res.status(500).json({
      error: "Server error during bootstrap",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    });
  }
});

router.get("/me", protect, getCurrentUser);

export default router;