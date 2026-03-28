import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getFoodVitamins(foodName) {
  // Query USDA FoodData Central API
  const searchRes = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${process.env.USDA_API_KEY}`
  );
  const food = searchRes.data.foods[0];

  // Example mapping: vitamins + organs (simplified)
  const vitamins = [];
  const organs = [];
  if(food.description.toLowerCase().includes("carrot")) vitamins.push("Vitamin A");
  if(food.description.toLowerCase().includes("spinach")) vitamins.push("Vitamin K");
  // Map vitamins to organs (simplified)
  vitamins.forEach(v => {
    if(v==="Vitamin A") organs.push("Heart","Liver","Kidney");
    if(v==="Vitamin K") organs.push("Liver");
  });

  return { foodName: food.description, vitamins, organs };
}
