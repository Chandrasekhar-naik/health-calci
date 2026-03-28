import express from "express";
import axios from "axios";
import { verifyToken } from "../middleware/auth.js";
import FoodLog from "../models/FoodLog.js";

const router = express.Router();

// ✅ Protected: Log food entry
router.post("/log", verifyToken, async (req, res) => {
  try {
    const { userId, foodName, vitamins, organs } = req.body;

    // Prevent logging for another user
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const newFood = new FoodLog({
      userId,
      foodName,
      vitamins,
      organs,
      date: new Date(),
    });
    await newFood.save();

    res.json({ message: "Food logged successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging food" });
  }
});

// ✅ Public: Search foods (fetch from USDA)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query required" });

    // Example of USDA API call (simplified)
    const usdaRes = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${process.env.USDA_API_KEY}`
    );

    // Simplify and map result to vitamin-organ data
    const vitamins = ["Vitamin A", "Vitamin C"]; // Example
    const organs = ["Heart", "Liver"]; // Example
    const foodName = usdaRes.data.foods?.[0]?.description || query;

    res.json({ foodName, vitamins, organs });
  } catch (err) {
    res.status(500).json({ message: "USDA API error" });
  }
});

export default router;
