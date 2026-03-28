import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css";

const SearchAndLog = ({ userId, onFoodLogged }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  // 🔍 Search food and fetch vitamins/organs
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    setMessage("");

    try {
      // This calls your backend route which fetches data from USDA API
      const { data } = await axios.get(
        `http://localhost:5000/api/food/search?query=${query}`
      );

      // Example response:
      // { foodName: "Spinach", vitamins: ["Vitamin A", "Vitamin C"], organs: ["Heart", "Liver"] }
      setResult(data);
    } catch (err) {
      setMessage("Food not found or API error");
    } finally {
      setLoading(false);
    }
  };

  // 🥗 Log food entry to user's history
  const handleLog = async () => {
    if (!result) return;

    try {
      await axios.post("http://localhost:5000/api/food/log", {
        userId,
        foodName: result.foodName,
        vitamins: result.vitamins,
        organs: result.organs,
      });

      setMessage(`✅ ${result.foodName} logged successfully!`);
      setResult(null);
      setQuery("");

      // Refresh dashboard after logging
      if (onFoodLogged) onFoodLogged();
    } catch (err) {
      setMessage("Failed to log food");
    }
  };

  return (
    <div className="card">
      <h2>Search & Log Food</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a food, fruit, or vegetable"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-blue" onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {message && (
        <p
          style={{
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      {result && (
        <div className="card" style={{ background: "#f9f9f9" }}>
          <p>
            <b>Food:</b> {result.foodName}
          </p>
          <p>
            <b>Vitamins:</b> {result.vitamins.join(", ")}
          </p>
          <p>
            <b>Organs:</b> {result.organs.join(", ")}
          </p>
          <button className="btn btn-green" onClick={handleLog}>
            Log Food
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndLog;
