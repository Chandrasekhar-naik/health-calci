import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const userId = "USER_ID_HERE"; // replace with actual logged-in userId

  useEffect(() => {
    async function fetchDashboard() {
      const res = await axios.get(`/api/dashboard/${userId}`);
      setData(res.data);
    }
    fetchDashboard();
  }, [userId]);

  if (!data) return <p>Loading...</p>;

  const chartData = [];
  Object.entries(data.vitaminOrgansCount).forEach(([vit, organs]) => {
    chartData.push({ vitamin: vit, ...organs });
  });

  return (
    <div className="container">
      <h1>Health Dashboard</h1>

      {/* Search & Log Food */}
      <SearchAndLog
        userId={userId}
        onFoodLogged={() => {
          axios
            .get(`/api/dashboard/${userId}`)
            .then((res) => setData(res.data));
        }}
      />

      {/* Vitamins per Organ */}
      <h2>Vitamins per Organ</h2>
      <div className="grid-2">
        {Object.entries(data.vitaminOrgansCount).map(([vit, organs]) => (
          <div key={vit} className="card">
            <h3>{vit}</h3>
            {Object.entries(organs).map(([org, count]) => (
              <p key={org}>
                {org}: {count}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Missing Vitamins / Organs */}
      <div className="grid-2">
        <div className="card" style={{ background: "#f8d7da" }}>
          <h3>Missing Vitamins</h3>
          {data.missingVitamins.length === 0 ? (
            "All covered"
          ) : (
            <ul>
              {data.missingVitamins.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="card" style={{ background: "#fff3cd" }}>
          <h3>Missing Organs</h3>
          {data.missingOrgans.length === 0 ? (
            "All covered"
          ) : (
            <ul>
              {data.missingOrgans.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Daily Logs */}
      <h2>Daily History</h2>
      {Object.keys(data.dailyLogs)
        .sort((a, b) => b.localeCompare(a))
        .map((date) => (
          <div
            key={date}
            className="daily-log"
            onClick={() => setSelectedDate(selectedDate === date ? null : date)}
          >
            <h3>{date}</h3>
            {selectedDate === date && (
              <div className="details">
                <h4>Foods:</h4>
                {data.dailyLogs[date].map((food) => (
                  <p key={food._id}>
                    {food.foodName} - Vitamins: {food.vitamins.join(", ")} -
                    Organs: {food.organs.join(", ")}
                  </p>
                ))}
                <h4>Missing:</h4>
                <p>
                  Vitamins:{" "}
                  {data.dailyMissing[date].missingVitamins.join(", ") || "None"}
                </p>
                <p>
                  Organs:{" "}
                  {data.dailyMissing[date].missingOrgans.join(", ") || "None"}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
