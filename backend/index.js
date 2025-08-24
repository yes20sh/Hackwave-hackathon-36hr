const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Debug environment variables
console.log("Environment Variables:", process.env);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/shopping", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    const params = {
      engine: "google_shopping",
      q: encodeURIComponent(q),
      location: "Austin, Texas, United States",
      google_domain: "google.com",
      hl: "en",
      gl: "us",
      api_key: process.env.SERPAPI_KEY,
    };
    
    const response = await axios.get("https://serpapi.com/search.json", { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});