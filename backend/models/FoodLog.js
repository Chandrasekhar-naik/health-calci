import mongoose from "mongoose";

const FoodLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodName: { type: String, required: true },
  vitamins: { type: [String], default: [] },
  organs: { type: [String], default: [] },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("FoodLog", FoodLogSchema);
