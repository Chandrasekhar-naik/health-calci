import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import foodRoutes from "./routes/foodRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  ))
  .catch(err => console.log(err));
