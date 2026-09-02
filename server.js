const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ==============================
// TEMPORARY EVENT STORAGE
// ==============================

// Note:
// This is temporary memory storage.
// Later we will connect PostgreSQL.
let events = [];

// ==============================
// HEALTH CHECK
// ==============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    message: "EventIQ backend is working",
  });
});

// ==============================
// CREATE EVENT
// ==============================

app.post("/api/events", (req, res) => {
  try {
    const {
      eventName,
      eventType,
      date,
      venue,
      capacity,
      description,
    } = req.body;

    if (!eventName) {
      return res.status(400).json({
        success: false,
        message: "Event name is required",
      });
    }

    const newEvent = {
      id: Date.now(),
      eventName,
      eventType,
      date,
      venue,
      capacity,
      description,
    };

    events.push(newEvent);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create event",
    });
  }
});

// ==============================
// GET ALL EVENTS
// ==============================

app.get("/api/events", (req, res) => {
  res.json({
    success: true,
    events,
  });
});

// ==============================
// AI CHATBOT
// ==============================

app.post("/api/chat", async (req, res) => {
  try {
    const { message, event } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const eventName = event?.eventName || "your event";
    const eventType = event?.eventType || "event";
    const venue = event?.venue || "not specified";
    const capacity = event?.capacity || "not specified";
    const date = event?.date || "not specified";

    const reply = `EventIQ AI received your question about "${eventName}".

Event Details:
Event: ${eventName}
Type: ${eventType}
Venue: ${venue}
Capacity: ${capacity}
Date: ${date}

Your Question:
${message}

I can help you with:
• Promotion strategies
• Target student identification
• Event description improvement
• Budget planning
• Engagement prediction`;

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Chat request failed",
    });
  }
});

// ==============================
// ROOT
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Synapsix / EventIQ API is running",
  });
});

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EventIQ backend running on port ${PORT}`);
});