import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
import FoodLog from "../models/FoodLog.js";

const router = express.Router();

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    // ✅ Ensure user can only access their own data
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // ... existing logic to calculate vitamins, organs, missing nutrients, etc.
    const logs = await FoodLog.find({ userId: req.params.userId });
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
