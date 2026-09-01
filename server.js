const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// HEALTH CHECK
// =========================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    message: "EventIQ backend is working",
  });
});

// =========================
// EVENTS
// =========================
let events = [];

app.get("/api/events", (req, res) => {
  res.json({
    success: true,
    events: events,
  });
});

app.post("/api/events", (req, res) => {
  const event = {
    id: Date.now(),
    ...req.body,
  };

  events.push(event);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});

// =========================
// ANALYTICS
// =========================
app.get("/api/analytics", (req, res) => {
  res.json({
    success: true,
    totalEvents: events.length,
    expectedEngagement: 0,
    totalRegistrations: 0,
  });
});

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Synapsix / EventIQ API is running",
  });
});

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EventIQ backend running on port ${PORT}`);
});