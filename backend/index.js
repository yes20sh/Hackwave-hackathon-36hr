// index.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ Debug log to check if key is loaded
console.log("SerpApi Key:", process.env.SERPAPI_KEY ? "✅ Loaded" : "❌ Not loaded");

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Shopping Search API route
app.get("/api/shopping", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_shopping",
        q: q || "iPhone",
        location: "Austin, Texas, United States",
        google_domain: "google.com",
        hl: "en",
        gl: "us",
        api_key: process.env.SERPAPI_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching shopping results:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
